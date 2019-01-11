import numpy as py
import matplotlib.pyplot as plt
import pandas as pd
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import LabelEncoder, Normalizer, OneHotEncoder
from sklearn.compose import ColumnTransformer

"""
Import missing data
"""
dataset = pd.read_csv("Data.csv")
X = dataset.iloc[:, :-1].values

# How do we show variable without DataFrame
xdf = pd.DataFrame(data=X, columns=["Country","Age","Salary"])

Y = dataset.iloc[:, 3].values
ydf = pd.DataFrame(data=Y, columns=["Purchased"])

"""
Impute missing data
"""
# mean = sum of all values divided by number of elements
imputer = SimpleImputer(missing_values=py.nan, strategy="mean")
imputer = imputer.fit(X[:, 1:3])

X[:, 1:3] = imputer.transform(X[:, 1:3])

"""
Categorize data i.e. convert categories to numerical values
"""
ct_X = ColumnTransformer(
    transformers=[
        ("onehot", OneHotEncoder(sparse=False), [0])
    ], 
    remainder="passthrough" )
X = ct_X.fit_transform(X)

labelencoder = LabelEncoder()
Y = labelencoder.fit_transform(Y)