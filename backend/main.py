from flask import Flask, jsonify, request  # librairie framework web
from flask_cors import CORS, cross_origin

app = Flask(__name__)  # on crée une instance de l'application flask
CORS(app, support_credentials=True)


@app.route('/main', methods=['GET'])
@cross_origin(supports_credentials=True)
def mainFunc():
    try:
        text = "test"
        return text
    except RuntimeError:
        return 'Error'


@app.route('/region', methods=['GET'])
@cross_origin(supports_credentials=True)
def getRegion():
    number_region = request.args.get('num', default=0, type=int)
    return jsonify(numero_region=number_region)


@app.route('/bande', methods=['GET'])
@cross_origin(supports_credentials=True)
def getBande():
    number_band = request.args.get('bande', default=0, type=int)
    return jsonify(numero_bande=number_band)


if __name__ == "__main__":
    app.run(host="0.0.0.0")