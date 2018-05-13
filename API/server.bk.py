import json
from datetime import datetime

import bottle
from bottle_jwt import (JWTProviderPlugin, jwt_auth_required)


app = bottle.Bottle()

server_secret = '*Y*^%JHg7623'
# obfwYOm5bt_wrDvOmf0pfu2C


class AuthBackend(object):
    """Implementing an auth backend class with at least two methods.
    """
    user = {'id': 1237832, 'username': 'pav', 'password': '123', 'data': {'sex': 'male', 'active': True}}

    def authenticate_user(self, username, password):
        """Authenticate User by username and password.

        Returns:
            A dict representing User Record or None.
        """
        if username == self.user['username'] and password == self.user['password']:
            return self.user
        return None

    def get_user(self, user_id):
        """Retrieve User By ID.

        Returns:
            A dict representing User Record or None.
        """
        if user_id == self.user['id']:
            return {k: self.user[k] for k in self.user if k != 'password'}
        return None


provider_plugin = JWTProviderPlugin(
    keyword='jwt',
    auth_endpoint='/auth',
    backend=AuthBackend(),
    fields=('username', 'password'),
    secret=server_secret,
    ttl=30
)

app.install(provider_plugin)

@app.hook('after_request')
def enable_cors():
    """
    You need to add some headers to each request.
    Don't use the wildcard '*' for Access-Control-Allow-Origin in production.
    """
    bottle.response.headers['Access-Control-Allow-Origin'] = '*'
    bottle.response.headers['Access-Control-Allow-Methods'] = 'PUT, GET, POST, DELETE, OPTIONS'
    bottle.response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'

@app.route('/hello')
@jwt_auth_required
def examples():
    time = datetime.now().strftime('%x/%H:%M')
    user = bottle.request.get_user()

    resp = {'function': 'open sesame', 'time': time, "user": user}

    print("%s Just entered the Zone @%s"  %(user,time))
    return json.dumps(resp)


if __name__ == '__main__':
    bottle.run(app, host='localhost', port=1338, debug=True, reloader=True)


# @APP.route("/api/private-scoped")
# @cross_origin(headers=["Content-Type", "Authorization"])
# @cross_origin(headers=["Access-Control-Allow-Origin", "*"])
# @requires_auth
# def private_scoped():
#     """A valid access token and an appropriate scope are required to access this route
#     """
#     if requires_scope("access:modus"):
#         response = "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this."
#         return jsonify(message=response)
#     raise AuthError({
#         "code": "Unauthorized",
#         "description": "You don't have access to this resource"
#     }, 403)

# from bottle import route, run, abort, post, request, HTTPResponse
# import jwt
# import json

# encoded = jwt.encode({'name': 'James'}, 'secret', algorithm='HS256')

# @route('/')
# def index():
# 	return 'go to /hello bro'

# @route('/hello')
# def hello():
#     x = json.dumps({"name": 'james', "status": 'cool'})
#     return HTTPResponse(status=200, body=x)

# @route('/restricted')
# def restricted():
#     abort(401, "Sorry, access denied.")

# @route("/open")
# def open():
# 	global encoded


# 	open_door()
# 	return encoded

# @post('/open')
# def open_post():
# 	name = request.forms.get("name")
# 	token = request.forms.get("access_token")
# 	return jwt.decode(name, 'JIvz4OPk9kqmw4l9RbMXMMiWBh3zhjlh', algorithms=['HS256'])

# def open_door():
# 	pass

# run(host='192.168.12.136', port=1337, debug=True, reloader=True)