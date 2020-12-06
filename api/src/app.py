import os
from models.minizinc_model import MinizincModel
from utils.utils import output_to_json
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors= CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/test_result")
def test_result_to_json():
    mz = MinizincModel("src/models/plate-design.mzn", "gecode")
    mz.populate_instance(dzn_file_path="src/plate_design/dzn_examples/pl-example01.dzn")
    result = mz.solve_instance()
    j_res = output_to_json(result)
    return j_res
    
@app.route("/", methods=['POST', 'GET'])
def test_plaid():

    if request.method  == 'GET':
        return 'Hello!'
    if request.method == 'POST':
        data = request.get_json()
        print(data, file=sys.stderr)
    return data

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=os.getenv("PORT"))
