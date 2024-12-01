#Take in a csv form: Year, frequency
# From this, create a polynomial line of best fit using 
import numpy
import matplotlib.pyplot as plt 
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import Lasso
from sklearn.model_selection import GridSearchCV
from sklearn.pipeline import Pipeline
import pandas as pd

import matplotlib
matplotlib.use('agg')

# Load the CSV file
def charts_from_word(word, start_date, end_date):
    df = pd.read_csv('greek_word_usage_frequencies/' + word + '_usage_frequencies.csv')

    # Drop all columns except 'word' and 'year'
    df = df[['year', 'word_usage_at_year']]
    # Convert to numpy array
    word1 = df.to_numpy()
    line_best_fit(word1, start_date, end_date, word, "frequency")

    #now for sentiment
    df2 = pd.read_csv('greek_word_sentiment/' + word + '_sentiment_data.csv')
    df2 = df2[['year', 'mean_weighted_sentiment']]
    word2 = df2.to_numpy()
    line_best_fit(word2, start_date, end_date, word, "sentiment")
def line_best_fit(input, start_date, end_date, word, mode = "freqency"):
    # Extracting the data
    X = input[:, 0].reshape(-1, 1)
    y = input[:, 1]

    # Defining the range for polynomial degrees and regularization parameter
    degrees = [1, 2, 3, 4, 5, 6]
    alphas = [0.1, 1, 5, 10, 100]

    # Creating a pipeline to streamline the process

    pipeline = Pipeline([
        ('poly', PolynomialFeatures()),
        ('lasso', Lasso())
    ])

    # Defining the parameter grid
    param_grid = {
        'poly__degree': degrees,
        'lasso__alpha': alphas
    }

    # Performing grid search with cross-validation
    grid_search = GridSearchCV(pipeline, param_grid, cv=5)
    grid_search.fit(X, y)

    # Extracting the best parameters
    best_degree = grid_search.best_params_['poly__degree']
    best_alpha = grid_search.best_params_['lasso__alpha']

    # Fitting the model with the best parameters
    best_model = grid_search.best_estimator_

    # Plotting the results - names depend on "mode"
    plt.scatter(X, y, color='blue', label='Data')
    X_plot = numpy.linspace(max(X.min(), start_date), min(X.max(), end_date), 100).reshape(-1, 1)
    y_plot = best_model.predict(X_plot)
    plt.xlabel('Year')
    plt.ylabel(mode)
    plt.xlim(max(X.min(), start_date), min(X.max(), end_date))
    plt.plot(X_plot, y_plot, color='red', label=f'Best fit: degree={best_degree}, alpha={best_alpha}')
    #events
    if(max(X.min(), start_date) < -146 and min(X.max(), end_date) > -146):
        plt.axvline(x=-500, color='green', linestyle='--', label='Achaean War')
    if(max(X.min(), start_date) < -27 and min(X.max(), end_date) > -27):
        plt.axvline(x=-27, color='green', linestyle='--', label='Fall of Roman Republic')
    if(max(X.min(), start_date) < 330 and min(X.max(), end_date) > 330):
        plt.axvline(x=330, color='green', linestyle='--', label='Capital Moved to Constantinople')
    #title
    plt.title(f'{mode} of {word} over time')
    plt.legend()
    plt.gcf().set_size_inches(8, 5)
    plt.savefig(f'temp/current_' + mode, dpi=100)
    plt.clf()
if __name__ == '__main__':
    charts_from_word('α', -100, 600)