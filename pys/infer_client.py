import grpc
import numpy as np
from tensorflow.keras.applications.resnet50 import preprocess_input
from tensorflow.keras.preprocessing import image
from tensorflow.python.keras.applications.resnet import decode_predictions
from tensorflow.python.ops.gen_array_ops import shape
from tensorflow.python.ops.math_ops import to_int64

import infer_pb2
import infer_pb2_grpc


def request():
    img_path = 'pys/elephant.jpeg'
    img = image.load_img(img_path, target_size=(224, 224))
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x = preprocess_input(x)
    return x


def main():
    with grpc.insecure_channel('localhost:5000') as channel:
        stub = infer_pb2_grpc.InferStub(channel)
        req = request()
        res = stub.Infer(
            infer_pb2.InferRequest(shape=req.shape,
                                   data=req.reshape(-1)))

        preds = np.array(res.data).reshape(res.shape)
        print('Predicted:', decode_predictions(preds, top=3)[0])


main()