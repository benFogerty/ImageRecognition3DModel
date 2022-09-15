import os

import cv2
import matplotlib.pyplot as plt
import numpy as np
import tensorflow as tf
from PIL import Image, ImageFilter
import tensorflowjs as tfjs


mnist = tf.keras.datasets.mnist


(x_train, y_train) ,(x_test, y_test) = mnist.load_data()




x_train = tf.keras.utils.normalize(x_train, axis=1)
x_test = tf.keras.utils.normalize(x_test, axis=1)


model = tf.keras.models.Sequential()
model.add(tf.keras.layers.Flatten(input_shape=(28,28)))
model.add(tf.keras.layers.Dense(units=256, activation=tf.nn.relu))
model.add(tf.keras.layers.Dense(units=256, activation=tf.nn.relu))
model.add(tf.keras.layers.Dense(units=10, activation=tf.nn.softmax))

model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
model.fit(x_train, y_train, epochs=5)




model.save('BackEnd\handwritten.h5')


tfjs.converters.save_keras_model(model, 'tfjs')


#new_model = tf.keras.models.load_model('handwritten.h5')




