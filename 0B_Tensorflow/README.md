#Setup

https://www.tensorflow.org/install/pip

1. Prerequisite packages
```bash
pip install virtualenv
pip install tensorflow
```

2. Setup environment
```bash
cd ~
mkdir envs
virtualenv ~/envs/tensorflow

source ~/envs/tensorflow/bin/activate

(tensorflow)$ deactivate
```


# Load data

** https://towardsdatascience.com/how-to-use-dataset-in-tensorflow-c758ef9e4428

In order to use a Dataset we need three steps:

1. Importing Data. Create a Dataset instance from some data
2. Create an Iterator. By using the created dataset to make an Iterator instance to iterate through the dataset
3. Consuming Data. By using the created iterator we can get the elements from the dataset to feed the model

# Numpy

```python
x = np.arange(0, 10)
dx = tf.data.Dataset.from_tensor_slices(x)
```

# Google Cloud Platform - AI Platform

## Commands

### Job management

```bash
# List jobs
gcloud ai-platform jobs list
```

# Miscellaneous

## Vim setup

```
# Map 'python $file' to shortcut 'R'
Command> :map R :!python <C-R>=expand('%:p') <CR>
Example> :!python /Users/dennislee/Devs/MachineLearning/machine-learning/0B_Tensorflow/test.py
```

# Useful Link

* https://androidkt.com/train-keras-model-with-tensorflow-estimators-and-datasets-api/
