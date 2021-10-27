
* 生成模型
* 用python测试模型
* 用rust测试模型
  * 加载模型
  * 运行推理
* 用rust实现grpc服务
* 用python调用grpc服务
  * 生成客户端：`python -m grpc_tools.protoc -I../proto --python_out=. --grpc_python_out=. ../proto/infer.proto`
  * 用客户端调用grpc服务
* 校验调用结果和本地推理结果