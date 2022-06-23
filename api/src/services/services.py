import pandas as pd
from flask import jsonify


class ModelService():

    @staticmethod
    def output_to_csv(results):
        header = results[0]
        df = pd.DataFrame(results[1:])
        df.to_csv('results.csv', index=False, header=[header])
    
    @staticmethod
    def output_to_json(result):
        d_list = []
        header = result[0].split(",")
        for row in result[1:]:
            pieces = row.split(",")
            d_list.append(dict(zip(header, pieces)))
        return jsonify(d_list)
