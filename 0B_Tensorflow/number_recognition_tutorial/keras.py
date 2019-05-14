# Tutorial: https://pythonprogramming.net/introduction-deep-learning-python-tensorflow-keras/

import tensorflow as tf
from tensorflow.keras import layers
from tensorflow.keras.datasets import mnist

# Dataset of 60,000 28x28 grayscale images of the 10 digits, along with a test set of 10,000 images
# https://keras.io/datasets/
(x_train, y_train), (x_test, y_test) = mnist.load_data()

# Normalize data
x_train = tf.keras.utils.normalize(x_train, axis=1)
x_test = tf.keras.utils.normalize(x_train, axis=1)

model = tf.keras.models.Sequential()
model.add(tf.keras.layers.Flatten())
model.add(tf.keras.layers.Dense(128, activation=tf.nn.relu))
model.add(tf.keras.layers.Dense(128, activation=tf.nn.relu))
model.add(tf.keras.layers.Dense(10, activation=tf.nn.softmax))

model.compile(
        optimizer = 'adam',
        loss = 'sparse_categorical_crossentropy',
        metrics=['accuracy']
        )

model.fit(x_train, y_train, epochs=3)

#val_loss, val_acc = model.evaluate(x_test, y_test)
#print(val_loss, val_acc)

model.save('epic_num_reader.model')
new_model = tf.keras.models.load_model('epic_num_reader.model')

predictions = new_model.predict(x_test)

import numpy as np

print(np.argmax(predictions[1]))

import matplotlib.pyplot as plt
#
plt.imshow(x_test[1], cmap = plt.cm.binary)
plt.show()
