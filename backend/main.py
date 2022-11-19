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
    df1 = pd.read_csv("data/Challenge 1_visu occupation spectrale/2020_12_31_Extract.csv", sep=";", low_memory=False)
    df1 = df1.loc[(df1['ID_INTERV_FREQ']) == frequence]
    df1 = df1[['ID_INTERV_FREQ']].count()
    df1 = df1.item()

    df2 = pd.read_csv("data/Challenge 1_visu occupation spectrale/2021_03_31_Extract.csv", sep=";", low_memory=False)
    df2 = df2.loc[(df2['ID_INTERV_FREQ']) == frequence]
    df2 = df2[['ID_INTERV_FREQ']].count()
    df2 = df2.item()

    df3 = pd.read_csv("data/Challenge 1_visu occupation spectrale/2021_06_30_Extract.csv", sep=";", low_memory=False)
    df3 = df3.loc[(df3['ID_INTERV_FREQ']) == frequence]
    df3 = df3[['ID_INTERV_FREQ']].count()
    df3 = df3.item()

    df4 = pd.read_csv("data/Challenge 1_visu occupation spectrale/2021_09_30_Extract.csv", sep=";", low_memory=False)
    df4 = df4.loc[(df4['ID_INTERV_FREQ']) == frequence]
    df4 = df4[['ID_INTERV_FREQ']].count()
    df4 = df4.item()

    df5 = pd.read_csv("data/Challenge 1_visu occupation spectrale/2021_12_31_Extract.csv", sep=";", low_memory=False)
    df5 = df5.loc[(df5['ID_INTERV_FREQ']) == frequence]
    df5 = df5[['ID_INTERV_FREQ']].count()
    df5 = df5.item()

    df6 = pd.read_csv("data/Challenge 1_visu occupation spectrale/2022_03_31_Extract.csv", sep=";", low_memory=False)
    df6 = df6.loc[(df6['ID_INTERV_FREQ']) == frequence]
    df6 = df6[['ID_INTERV_FREQ']].count()
    df6 = df6.item()

    df7 = pd.read_csv("data/Challenge 1_visu occupation spectrale/2022_06_30_Extract.csv", sep=";", low_memory=False)
    df7 = df7.loc[(df7['ID_INTERV_FREQ']) == frequence]
    df7 = df7[['ID_INTERV_FREQ']].count()
    df7 = df7.item()

    df8 = pd.read_csv("data/Challenge 1_visu occupation spectrale/2022_09_30_Extract.csv", sep=";", low_memory=False)
    df8 = df8.loc[(df8['ID_INTERV_FREQ']) == frequence]
    df8 = df8[['ID_INTERV_FREQ']].count()
    df8 = df8.item()

    resultat = {'20-12-13': df1, '21-03-31': df2, '21-06-30': df3, '21-09-30': df4, '21-12-31': df5, '22-03-31': df6,
                '22-06-30': df7, '22-09-30': df8}

    array = [{'Date': i, 'Number': resultat[i]} for i in resultat]

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
