use std::pin::Pin;
use std::task::Context;
use std::task::Poll;

use async_trait::async_trait;

use futures::future::{self, Either, TryFutureExt};
use hyper::{service::make_service_fn, Server};
use std::convert::Infallible;

use tonic::{Request, Response, Status};
use tower::Service;
use warp::Filter;

use hello_tf::ImagePreds;
use hello_tf::InferRequest;
use hello_tf::InferResponse;
use hello_tf::PostProcessRequest;
use hello_tf::PostProcessResponse;
use hello_tf::PreProcessRequest;
use hello_tf::PreProcessResponse;
use hello_tf::Pred;
use tokio::runtime::Builder;

use hello_tf::web_server::Web;
use hello_tf::web_server::WebServer;
use hello_tf::WebRequest;
use hello_tf::WebResponse;

use hello_tf::infer_client::InferClient;
use hello_tf::process_client::ProcessClient;
use tonic::transport::Channel;

fn main() {
    let rt = Builder::new_current_thread().enable_all().build().unwrap();

    rt.block_on(async {
        let addr = "0.0.0.0:3001";
        println!("Listen on: {}", addr);

        let addr = addr.parse().unwrap();
        let server = WebServer::new(WebImpl {
            icli: InferClient::connect("http://localhost:5000").await.unwrap(),
            pcli: ProcessClient::connect("http://localhost:5001")
                .await
                .unwrap(),
        });

        let tonic = tonic_web::config()
            .allow_origins(vec!["0.0.0.0"])
            .enable(server);

        let web = warp::service(warp::path("public").and(warp::fs::dir("public")));

        Server::bind(&addr)
            .serve(make_service_fn(move |_| {
                let mut tonic = tonic.clone();
                let mut web = web.clone();
                future::ok::<_, Infallible>(tower::service_fn(
                    move |req: hyper::Request<hyper::Body>| {
                        if req.uri().path().starts_with("/public") {
                            Either::Left(
                                web.call(req)
                                    .map_ok(|res| res.map(EitherBody::Left))
                                    .map_err(Error::from),
                            )
                        } else {
                            Either::Right(
                                tonic
                                    .call(req)
                                    .map_ok(|res| res.map(EitherBody::Right))
                                    .map_err(Error::from),
                            )
                        }
                    },
                ))
            }))
            .await
            .unwrap();
    });
}

struct WebImpl {
    icli: InferClient<Channel>,
    pcli: ProcessClient<Channel>,
}

#[async_trait]
impl Web for WebImpl {
    async fn process(&self, req: Request<WebRequest>) -> Result<Response<WebResponse>, Status> {
        let mut results = vec![];
        let mut icli = self.icli.clone();
        let mut pcli = self.pcli.clone();
        for img in req.into_inner().images {
            let PreProcessResponse { shape, data } = pre_process(&mut pcli, &img.body).await;
            let InferResponse { shape, data } = infer(&mut icli, shape, data).await;
            let PostProcessResponse { preds } = post_process(&mut pcli, shape, data).await;
            let preds: Vec<_> = preds
                .into_iter()
                .map(|p| Pred {
                    name: p.name,
                    probability: p.probability,
                })
                .collect();
            results.push(ImagePreds {
                image: img.filename,
                preds,
            })
        }

        Ok(Response::new(WebResponse { results }))
    }
}

async fn pre_process(cli: &mut ProcessClient<Channel>, data: &[u8]) -> PreProcessResponse {
    let req = PreProcessRequest { image: data.into() };
    cli.pre_process(req).await.unwrap().into_inner()
}

async fn infer(cli: &mut InferClient<Channel>, shape: Vec<u64>, data: Vec<f32>) -> InferResponse {
    let req = InferRequest { shape, data };
    cli.infer(req).await.unwrap().into_inner()
}

async fn post_process(
    cli: &mut ProcessClient<Channel>,
    shape: Vec<u64>,
    data: Vec<f32>,
) -> PostProcessResponse {
    let req = PostProcessRequest { shape, data };
    cli.post_process(req).await.unwrap().into_inner()
}

type Error = Box<dyn std::error::Error + Send + Sync + 'static>;

enum EitherBody<A, B> {
    Left(A),
    Right(B),
}

impl<A, B> http_body::Body for EitherBody<A, B>
where
    A: http_body::Body + Send + Unpin,
    B: http_body::Body<Data = A::Data> + Send + Unpin,
    A::Error: Into<Error>,
    B::Error: Into<Error>,
{
    type Data = A::Data;
    type Error = Box<dyn std::error::Error + Send + Sync + 'static>;

    fn is_end_stream(&self) -> bool {
        match self {
            EitherBody::Left(b) => b.is_end_stream(),
            EitherBody::Right(b) => b.is_end_stream(),
        }
    }

    fn poll_data(
        self: Pin<&mut Self>,
        cx: &mut Context<'_>,
    ) -> Poll<Option<Result<Self::Data, Self::Error>>> {
        match self.get_mut() {
            EitherBody::Left(b) => Pin::new(b).poll_data(cx).map(map_option_err),
            EitherBody::Right(b) => Pin::new(b).poll_data(cx).map(map_option_err),
        }
    }

    fn poll_trailers(
        self: Pin<&mut Self>,
        cx: &mut Context<'_>,
    ) -> Poll<Result<Option<http::HeaderMap>, Self::Error>> {
        match self.get_mut() {
            EitherBody::Left(b) => Pin::new(b).poll_trailers(cx).map_err(Into::into),
            EitherBody::Right(b) => Pin::new(b).poll_trailers(cx).map_err(Into::into),
        }
    }
}

fn map_option_err<T, U: Into<Error>>(err: Option<Result<T, U>>) -> Option<Result<T, Error>> {
    err.map(|e| e.map_err(Into::into))
}
