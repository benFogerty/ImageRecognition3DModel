from flask import Flask, request, jsonify, redirect, url_for
import json 
from RunModel import * 



app = Flask(__name__) 

@app.route('/imageUrl', methods=['POST', 'GET']) 
def sum_of_array(): 
    data = request.get_json()
    data = RunModel(data['url'])

    pred = data[0].tolist()

    data = {
        'pred' : pred,
        'GreyScaledImage' : data[1],
        'ContourOutlineImage' : data[2],
        'countourBoxImage' : data[3],
        'DigitBoxImage' : data[4],
        'finalImage' : data[5],
        'imgArray' : data[6]
        }

    jsonData = json.dumps(data)

    return(jsonData)
   
if __name__ == "__main__": 
    app.run(port=5000)

