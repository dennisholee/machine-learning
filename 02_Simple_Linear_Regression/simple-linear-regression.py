import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

"""
Load data set
"""
dataset = pd.read_csv("Salary_Data.csv")
X = dataset.iloc[:, :-1].values
Y = dataset.iloc[:, 1].values

"""
Splitting the dataset into training and test set
"""
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size = 1/3, random_state = 0)

"""
Fitting simple linear regression to the training set
"""
regressor = LinearRegression()
regressor.fit(X=X_train, y=Y_train)

"""
Predicting the Test set result
"""
# Why the reshape???
y_pred = regressor.predict(X_test.reshape(-1,1))

"""
Visualizing the training set results
"""
plt.scatter(X_train, Y_train, color="red")
plt.plot(X_train, regressor.predict(X_train.reshape(-1,1)), color="blue")
plt.title("Salary vs Experience (Training set")
plt.xlabel("Years of Experience")
plt.ylabel("Salary")
plt.show()
