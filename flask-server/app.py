from flask import Flask
from keras.models import Sequential, load_model
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix

app = Flask(__name__)

real_test = {
    'statuses_count':[1063],
    'followers_count':[88],
    'friends_count':[228],
    'favourites_count':[35],
    'listed_count':[1],
    'url':[1],
    'time_zone':[1]

}

df_real_test = pd.DataFrame(real_test, columns = ['statuses_count', 'followers_count', 'friends_count',
                                                  'favourites_count', 'listed_count', 'url', 'time_zone'])

df_real_test = df_real_test.astype(np.float64)


@app.route('/')
def index():
    return 'Server Works!'

@app.route('/analyze_profile', methods=['GET','POST'])
def say_hello():
    model = load_model('../machine_learning/Dataset/model_twitter.hdf5')
    model.summary()
    logits = model.predict(df_real_test).T[0]
    print (logits)
    return 'Hello from Server AI!' + str(logits)