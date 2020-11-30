import minizinc
import re
import pandas as pd
from flask import Flask, jsonify

class MinizincModel:
    """
    Creates a MiniZinc model that can run a valid minizinc program.
    """

    instance = None
    populated = False

    def __init__(self, prg_path: str, solver: str):
        """
        prg_path: str (must be path to valid mzn file)
        solver: str
        """
        model = minizinc.Model()
        model.add_file(prg_path)
        self.instance = minizinc.Instance(minizinc.Solver.lookup(solver), model)

    def populate_instance(self, dzn_file_path=None, dzn_str=None, args_json=None):
        """
        dzn_file_path: Union[pathlib.Path, str] | None
        dzn_str: str | None
        args_json: json file with arguments | None
        """
        if self.instance is None:
            raise Exception("Instance is not initialized!")
        elif dzn_file_path is not None:
            self.instance.add_file(dzn_file_path)
        elif dzn_str is not None:
            self.instance.add_string(dzn_str)
        elif args_json is not None:
            "TODO need to parse the json.."
        else:
            raise Exception("No data provided!")
        self.populated = True

    def solve_instance(self):
        """
        ...
        """
        if self.populated:
            result = self.instance.solve()
            result = re.split("[\n]", str(result).strip('[\n]'))
            return result
        else:
            raise Exception("Instance is not populated with data!")
    
    def output_to_csv(self, results):
        header = results[0]
        df = pd.DataFrame(results[1:])
        df.to_csv('results.csv', index=False, header=[header])

    def output_to_json(self, result):
        d_list = []
        header = result[0].split(",")
        for row in result[1:]:
            pieces = row.split(",")
            d_list.append(dict(zip(header,pieces)))
        return jsonify(d_list)
    
    