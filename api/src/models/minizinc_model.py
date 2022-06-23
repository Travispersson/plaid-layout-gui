import minizinc
from error_handler import NoSolutionException
import re
import os,sys
from datetime import timedelta


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
            inst = self.instance
            for key,val in args_json.items():
                inst[key] = val
            
        else:
            raise Exception("No data provided!")


        self.populated = True

    def solve_instance(self, rand:int):
        """
        ...
        """
        if self.populated:
            result = self.instance.solve( timeout = timedelta(days=1), random_seed = rand, processes = 6)
            if(not result):
               raise NoSolutionException("The input data could not be used to find a solution by the model. Try changing your input.")
            result = re.split("[\n]", str(result).strip("[\n]"))
            return result
        else:
            raise Exception("Instance is not populated with data!")

