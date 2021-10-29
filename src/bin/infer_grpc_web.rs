use async_trait::async_trait;

use tonic::transport::Server;
use tonic::{Request, Response, Status};

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

        let app = tonic_web::config()
            .allow_origins(vec!["0.0.0.0"])
            .enable(server);

        Server::builder()
            .accept_http1(true)
            .add_service(app)
            .serve(addr)
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
