from flask import Flask
from keras.models import Sequential, load_model
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix
from flask_cors import CORS, cross_origin
from flask import request

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app)

real_test = {
    'statuses_count': [1063],
    'followers_count': [88],
    'friends_count': [228],
    'favourites_count': [35],
    'listed_count': [1],
    'url': [1],
    'time_zone': [1]

}

df_real_test = pd.DataFrame(real_test, columns=['statuses_count', 'followers_count', 'friends_count',
                                                'favourites_count', 'listed_count', 'url', 'time_zone'])

df_real_test = df_real_test.astype(np.float64)


@app.route('/test')
def index():
    data_response = {
        'data': 'Hello from Server AI!'
    }
    return data_response


@app.route('/analyze_profile', methods=['GET', 'POST'])
def analyze_profile():
    req_data = request.get_json()
    user_profile = req_data['userProfile']

    user_prediction = {
        'statuses_count': user_profile['statuses_count'],
        'followers_count': user_profile['followers_count'],
        'friends_count': user_profile['friends_count'],
        'favourites_count': user_profile['favourites_count'],
        'listed_count': user_profile['listed_count'],
        'url': user_profile['url'],
        'time_zone': user_profile['time_zone']
    }

    df_user_prediction = pd.DataFrame(user_prediction, columns = ['statuses_count', 'followers_count', 'friends_count',
                                                         'favourites_count', 'listed_count', 'url', 'time_zone'], index=[0])

    print (df_user_prediction)

    df_user_prediction = df_user_prediction.astype(np.float64)



    model = load_model('../machine_learning/Dataset/model_twitter.hdf5')
    model.summary()
    prediction = model.predict(df_user_prediction).T[0]
    print (prediction)
    fake = True
    print(prediction.item(0))
    if prediction.item(0) == -1.0:
        fake = False
    data_response = {
        'data': prediction.item(0),
        'fake': fake
    }
    return data_response
