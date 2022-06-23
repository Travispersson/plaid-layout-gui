import os, sys
from models.minizinc_model import MinizincModel
from services.services import ModelService
from error_handler import MinizincException, NoSolutionException, UnsatException
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from random import seed
from random import randint
from datetime import datetime
app = Flask(__name__)
cors = CORS(app, support_credentials=True)
app.config["CORS_HEADERS"] = "Content-Type"

@app.route("/dzn_file", methods=["POST"])
@cross_origin(supports_credentials=True)
def test_dzn_file():
    content = request.get_json()
    try:
        mz = MinizincModel("./src/plate-design.mzn", "gecode")
        mz.populate_instance(dzn_str=content["data"])
        result = mz.solve_instance(rand = randint(1,10000))
        j_res = ModelService.output_to_json(result)
        return j_res
    except Exception as e:
        raise MinizincException(str(e))


@app.route("/", methods=["POST", "GET"])
@cross_origin(supports_credentials=True)
def test_plaid():
    data = request.get_json()
    try:
        mz = MinizincModel("./src/plate-design.mzn", "gecode")
        mz.populate_instance(args_json=data)
        result = mz.solve_instance(rand = randint(1,10000))
        j_res = ModelService.output_to_json(result)
        return j_res
    except NoSolutionException as e:
        raise UnsatException((e.error_msg()['message']))
    except Exception as e:
        raise MinizincException(str(e))


@app.errorhandler(MinizincException)
def minizinc_error(e):
    return e.error_msg(), e.status_code

@app.errorhandler(UnsatException)
def unsat_error(e):
    print(e.error_msg(), file=sys.stderr)
    return e.error_msg(), e.status_code

if __name__ == "__main__":
    seed(datetime.now())
    app.run(host="0.0.0.0", port=os.getenv("PORT"), debug=True)
