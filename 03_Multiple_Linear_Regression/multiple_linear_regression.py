import numpy as np
import pandas as pd

from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

"""
Import dataset
"""
dataset = pd.read_csv("50_Startups.csv")
X = dataset.iloc[:, :-1].values
Y = dataset.iloc[:, 4].values

"""
Categorize independent variables
"""
ct = ColumnTransformer([
        ("onehot", OneHotEncoder(), [3])
    ], remainder="passthrough")

X = ct.fit_transform(X)

"""
Split dataset to training and test sets
"""
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=0)

"""
Fit mutliple linear reegrssion to training set
"""
regressor = LinearRegression()
regressor.fit(X_train, Y_train)

"""
Predicting the test set results
"""
y_pred = regressor.predict(X_test)
