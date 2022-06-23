

class MinizincException(Exception):
    status_code = 400

    def __init__(self, message, payload=None):
        Exception.__init__(self)
        self.payload = payload
        self.message = message

    def error_msg(self):
        error = dict(self.payload or ())
        error['message'] = self.message 

        return error


class NoSolutionException(Exception):
    status_code = 1
    def __init__(self, message, payload=None):
        Exception.__init__(self)
        self.payload = payload
        self.message = message

    def error_msg(self):
        error = dict(self.payload or ())
        error['message'] = self.message 

        return error

class UnsatException(Exception):
    status_code = 2
    def __init__(self, message, payload=None):
        Exception.__init__(self)
        self.payload = payload
        self.message = message

    def error_msg(self):
        error = dict(self.payload or ())
        error['message'] = self.message 

        return error
