import os
from flask import Flask, jsonify, request  # librairie framework web
from flask_cors import CORS, cross_origin
import json
import pandas as pd

app = Flask(__name__)  # on crée une instance de l'application flask
CORS(app, support_credentials=True)


def getOccurenceFREQ(departement, option):
    df = pd.read_csv("data/2020_12_31_Extract.csv", sep=";", low_memory=False,
                     usecols=["CD_DPT", "ID_INTERV_FREQ", "ID_SYSTEME"]
                     )
    if option == 0:
        df = df.loc[df['ID_SYSTEME'] == 0]  # HorsTelMobile
    else:
        df = df.loc[df['ID_SYSTEME'] == 1]  # TelMobile
    df = df.drop(df[(df["CD_DPT"] != departement)].index)

    y = json.loads(df['ID_INTERV_FREQ'].value_counts().sort_index().to_json())
    array = [{'ID_INTERV_FREQ': i, 'Number': y[i]} for i in y]

    with open("data" + str(option) + ".json", "w") as outfile:
        json.dump(array, outfile)

    return array


def NombreParMois(frequence):
    array = []
    path = "./data/"
    for filename in os.listdir(path):
        f = os.path.join(path, filename)
        if filename[0].isdigit() and os.path.isfile(f):
            df = pd.read_csv(path + filename, sep=";", low_memory=False)
            df = df.loc[(df['ID_INTERV_FREQ']) == frequence]
            df = df[['ID_INTERV_FREQ']].count()
            df = df.item()
            array.append({'Date': filename[0:10], 'Number': df})
    with open("data.json", "w") as outfile:
        json.dump(array, outfile)

    return array


@app.route('/main/<param>', methods=['GET'])
@cross_origin(supports_credentials=True)
def mainFunc(param):
    try:
        text = "test"
        return param
    except RuntimeError:
        return 'Error'


@app.route('/api/departement/<number>', methods=['GET'])
@cross_origin(supports_credentials=True)
def getRegion(number):
    # number_region = request.args.get('num', default=0, type=str)
    number_region = number
    print(number)
    dictionnary = getOccurenceFREQ(number_region, 0)
    # getOccurenceFREQ("02A",1)
    return dictionnary


@app.route('/api/bande/<number>', methods=['GET'])
@cross_origin(supports_credentials=True)
def getBande(number):
    # number_band = request.args.get('bande', default=0, type=int)
    number_band = number
    dictionnary = NombreParMois(number_band)
    return dictionnary


if __name__ == "__main__":
    app.run(host="0.0.0.0")
