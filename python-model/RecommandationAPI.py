import numpy as np
import pandas as pd
import os
from RecommandationSystem import RecommandationSystem
from SearchSystem import SearchSystem
from flask import Flask
from flask import request
import json

path = 'data/main_dataset_new.csv'
drop_columns = ['Unnamed: 0', 'image', 'format', 'price', 'currency', 'old_price', 'Happy', 'Angry', 'Surprise', 'Sad', 'Fear', 'isbn']

api = Flask(__name__)
model = RecommandationSystem()
model.init(path, drop_columns)

search = SearchSystem()
search.init(path, 'name', drop_columns)

def run():
    api.run()

@api.route("/recommandations")
def get_recommandations():
    id = request.args.get('id', type=int)

    happy = request.args.get('happy', type=float, default=0)
    angry = request.args.get('angry', type=float, default=0)
    surprise = request.args.get('surprise', type=float, default=0)
    sad = request.args.get('sad', type=float, default=0)
    fear = request.args.get('fear', type=float, default=0)

    return model.get_recommandations(id, happy, angry, surprise, sad, fear).to_json(orient="records")

@api.route("/search")
def search_by_substring():
    query = request.args.get('query', type=str)
    results = "{ \"search\": " 
    search_result = search.search(query)
    #happy = 1, only that the mood of the book is considerd 
    recommand_result = model.get_recommandations(search_result.index[0], happy=1)
    results = results + search_result.to_json(orient='records')
    results = results + ", \"recommand\": "
    results = results + recommand_result.to_json(orient='records')
    results = results + "}"
    return results

if __name__ == '__main__':
    os.system('cls')
    run()