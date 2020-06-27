from flask import Flask
import tensorflow as tf
from keras.models import Sequential, load_model
import pandas as pd
import numpy as np
from flask_cors import CORS, cross_origin
from flask import request
import gc
import json

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app)


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
    print (user_profile)

    user_prediction = {
        'statuses_count': user_profile['statuses_count'],
        'followers_count': user_profile['followers_count'],
        'friends_count': user_profile['friends_count'],
        'favourites_count': user_profile['favourites_count'],
        'listed_count': user_profile['listed_count'],
        'url': user_profile['url'],
        'time_zone': user_profile['time_zone']
    }

    df_user_prediction = pd.DataFrame(user_prediction, columns=['statuses_count', 'followers_count', 'friends_count',
                                                                'favourites_count', 'listed_count', 'url', 'time_zone'],
                                      index=[0])

    print (df_user_prediction)

    df_user_prediction = df_user_prediction.astype(np.float64)

    model = load_model('../machine_learning/Dataset/model_twitter.hdf5')
    model.summary()
    prediction = model.predict(df_user_prediction)
    print ('Prediction:' + str(prediction))
    print ('---' * 10)
    print (prediction.item(0))

    prediction_value = prediction.item(0)
    fake = False
    if prediction_value == -1.0:
        print ('it is -1.0')
        fake = False
    if prediction_value != -1.0:
        print ('is not -1.0')
        fake = True

    del model
    tf.keras.backend.clear_session()

    count = 0
    for key in user_prediction:
        if (user_prediction[key] == 0):
            count = count + 1
    if count > 5:
        fake = True
    print ('count:' + str(count))
    del user_prediction
    del df_user_prediction
    data_response = {
        'fake': fake
    }
    print(data_response)

    return data_response


@app.route('/send_feedback', methods=['GET', 'POST'])
def send_feedback():
    req_data = request.get_json()
    profile = req_data['profile']
    profile_data = profile['profile_data']
    username = profile_data['screen_name']
    data_response = {
        'message': 'Your feedback was recorded!',
    }
    filename = username + '.json'
    with open('user_feedback/' + filename, 'w') as outfile:
        json.dump(req_data, outfile)
    return data_response
