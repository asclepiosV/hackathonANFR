import os
import random
from flask import Flask, jsonify, request  # librairie framework web
from flask_cors import CORS, cross_origin
from waitress import serve
import json
import pandas as pd

app = Flask(__name__)  # on crée une instance de l'application flask
CORS(app, support_credentials=True)


# bande de fréquence en fonction du nombre d'enregistrements
def getOccurenceFREQ(departement, option, fast):
    if fast:
        p = 0.01
        df = pd.read_csv("./data/2022_09_30_Extract.csv", sep=";", low_memory=False,
                         usecols=["CD_DPT", "ID_INTERV_FREQ", "ID_SYSTEME"],
                         skiprows=lambda i: i > 0 and random.random() > p
                         )
    else:
        df = pd.read_csv("./data/2022_09_30_Extract.csv", sep=";", low_memory=False,
                         usecols=["CD_DPT", "ID_INTERV_FREQ", "ID_SYSTEME"]
                         )
    if option == 0:
        df = df.loc[df['ID_SYSTEME'] == 0]  # HorsTelMobile
    else:
        df = df.loc[df['ID_SYSTEME'] == 1]  # TelMobile
    df = df.drop(df[(df["CD_DPT"] != departement)].index)

    y = json.loads(df['ID_INTERV_FREQ'].value_counts().sort_index().to_json())
    if fast:
        array = [{'ID_INTERV_FREQ': i, 'Number': y[i] * (1 / p)} for i in y]
    else:
        array = [{'ID_INTERV_FREQ': i, 'Number': y[i]} for i in y]
    with open("data" + str(option) + ".json", "w") as outfile:
        json.dump(array, outfile)

    return array


# Bande en fonction du temps
def NombreParMois(frequence):
    frequence = int(frequence)
    array = []
    path = "../data/"
    for filename in os.listdir(path):
        f = os.path.join(path, filename)
        if os.path.isfile(f):
            df = pd.read_csv(path + filename, sep=";", low_memory=False, encoding='cp1252')
            count = (df['ID_INTERV_FREQ'] == frequence).sum()
            array.append({'Date': filename[0:10], 'Number': count})
    return array

# Coordonnées departement
def plotFrequenceDepartement(dep, id_systeme, fast):
    temp = "0"
    departement = temp + dep

    def to_xy(lat, long, latMax, latMin, longMax, longMin):
        xMax = (longMax - longMin) * 30
        xMin = 0
        yMax = (latMax - latMin) * 20
        yMin = 0

        oldXRange = longMax - longMin
        oldYRange = latMax - latMin
        newXRange = xMax - xMin
        newYRange = yMax - yMin

        x = (((long - longMin) * newXRange / oldXRange)) + xMin
        y = (((lat - latMin) * newYRange / oldYRange)) + yMin
        # y*=-1
        # y+=yMax

        return (x, y)

    if not fast:
        df = pd.read_csv("Challenge 1_visu occupation spectrale/Data_challenge1/2020_12_31_Extract.csv", sep=";",
                         encoding='cp1252', low_memory=False,
                         usecols=["LATITUDE_DD", "LONGITUDE_DD", "AFFECTATAIRE", "ID_SYSTEME", "CD_DPT"])
    else:
        p = 0.01
        df = pd.read_csv("Challenge 1_visu occupation spectrale/Data_challenge1/2020_12_31_Extract.csv", sep=";",
                         encoding='cp1252', low_memory=False,
                         usecols=["LATITUDE_DD", "LONGITUDE_DD", "AFFECTATAIRE", "ID_SYSTEME", "CD_DPT"],
                         skiprows=lambda i: i > 0 and random.random() > p)

    df = df.drop(df[(df["ID_SYSTEME"] != id_systeme)].index)
    df = df.drop(df[(df["CD_DPT"] != departement)].index)

    df = pd.DataFrame(df, columns=["LATITUDE_DD", "LONGITUDE_DD"])
    list = (df.to_records().tolist())

    x = []
    y = []
    points = []

    latMax = max(sublist[1] for sublist in list)
    latMin = min(sublist[1] for sublist in list)
    longMax = max(sublist[2] for sublist in list)
    longMin = min(sublist[2] for sublist in list)

    for i in range(len(list)):
        xy = to_xy(list[i][1], list[i][2], latMax, latMin, longMax, longMin)

        x.append(xy[0])
        y.append(xy[1])
        points.append([xy[0], xy[1]])

    return points


# coordonnées en fonction de l'affectataire
def plotFrequenceFrance(affectataire, id_systeme, fast):

    def to_xy(lat, long):
        latMax = 51.1
        latMin = 42.6
        longMax = 7.9
        longMin = -4.7
        xMax = 200
        xMin = 0
        yMax = 196
        yMin = 0

        oldXRange = longMax - longMin
        oldYRange = latMax - latMin
        newXRange = xMax - xMin
        newYRange = yMax - yMin

        x = ((long - longMin) * newXRange / oldXRange) + xMin
        y = ((lat - latMin) * newYRange / oldYRange) + yMin
        y *= -1
        y += yMax

        return (x, y)

    if not fast:
        df = pd.read_csv("./data/2020_12_31_Extract.csv", sep=";",
                         encoding='cp1252', low_memory=False,
                         usecols=["LATITUDE_DD", "LONGITUDE_DD", "AFFECTATAIRE", "ID_SYSTEME"])
    else:
        p = 0.01
        df = pd.read_csv("./data/2020_12_31_Extract.csv", sep=";",
                         encoding='cp1252', low_memory=False,
                         usecols=["LATITUDE_DD", "LONGITUDE_DD", "AFFECTATAIRE", "ID_SYSTEME"],
                         skiprows=lambda i: i > 0 and random.random() > p)

    df = df.drop(df[(df["AFFECTATAIRE"] != affectataire)].index)
    df = df.drop(df[(df["ID_SYSTEME"] != id_systeme)].index)

    df = pd.DataFrame(df, columns=["LATITUDE_DD", "LONGITUDE_DD"])
    list = (df.to_records().tolist())

    x = []
    y = []
    points = []

    for i in range(len(list)):
        xy = to_xy(list[i][1], list[i][2])

        x.append(xy[0])
        y.append(xy[1])
        points.append([xy[0], xy[1]])
    print(points)
    return points


@app.route('/main', methods=['GET'])
def mainFunc(param):
    try:
        return param
    except RuntimeError:
        return 'Error'


@app.route('/api/departement', methods=['GET'])
def getRegion():
    number = request.args.get('numero')
    tel = request.args.get('tel')
    fast = request.args.get('fast')
    dictionnary = getOccurenceFREQ(number, tel, fast)
    return dictionnary


@app.route('/api/bande', methods=['GET'])
def getBande():
    number_band = request.args.get('num')
    dictionnary = NombreParMois(int(number_band))
    return dictionnary


@app.route('/api/map', methods=['GET'])
def getMap():
    affectataire = request.args.get('affectataire')
    tel = request.args.get('tel')
    fast = request.args.get('fast')
    dictionnary = plotFrequenceFrance(affectataire, tel, fast)
    return dictionnary


if __name__ == "__main__":
    # app.run(host="0.0.0.0")
    serve(app, host="0.0.0.0", port=5000)
