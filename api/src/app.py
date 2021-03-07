import os
import sys
from models.minizinc_model import MinizincModel
from services.services import ModelService
from error_handler import MinizincException
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app, support_credentials=True)
app.config["CORS_HEADERS"] = "Content-Type"

@app.route("/dzn_file", methods=["POST"])
@cross_origin(supports_credentials=True)
def test_dzn_file():
    content = request.get_json()
    try:
        mz = MinizincModel("./plate-design.mzn", "gecode")
        mz.populate_instance(dzn_str=content["data"])
        result = mz.solve_instance()
        print(result)
        j_res = ModelService.output_to_json(result)
        return j_res
    except Exception as e:
        raise MinizincException(str(e))


@app.route("/", methods=["POST", "GET"])
@cross_origin(supports_credentials=True)
def test_plaid():
    data = request.get_json()
    try:
        mz = MinizincModel("./plate-design.mzn", "gecode")
        mz.populate_instance(args_json=data)
        result = mz.solve_instance()
        j_res = ModelService.output_to_json(result)
        return j_res
    except Exception as e:
        raise MinizincException(str(e))


@app.errorhandler(MinizincException)
def minizinc_error(e):
    return e.error_msg(), e.status_code


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=os.getenv("PORT"), debug=True)
