import numpy as np
import tensorflow as tf
from tensorflow.keras.applications.resnet50 import (ResNet50,
                                                    decode_predictions,
                                                    preprocess_input)
from tensorflow.keras.preprocessing import image
from tensorflow.python.tools.import_pb_to_tensorboard import \
    import_to_tensorboard

model = ResNet50(weights='imagenet')


# 保存模型
model.save('pys/resnet50')


# 输出模型结构
# import_to_tensorboard('pys/resnet50', 'logdir', 'serve')
