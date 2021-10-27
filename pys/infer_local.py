from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.resnet50 import preprocess_input, decode_predictions
import tensorflow as tf
import numpy as np

loaded = tf.saved_model.load('pys/resnet50')

infer = loaded.signatures["serving_default"]

img_path = 'pys/elephant.jpeg'
img = image.load_img(img_path, target_size=(224, 224))
x = image.img_to_array(img)
x = np.expand_dims(x, axis=0)
x = preprocess_input(x) 


preds = infer(tf.constant(x))['predictions'].numpy()
print('Predicted:', decode_predictions(preds, top=3)[0])

# 输出请求维度信息
print('Info: ', x.shape, x.dtye)
# 保存请求
with open('pys/request', 'wb') as f:
    f.write(x.tobytes())