# openZFD API with Auth0 + Python + Flask API Seed

openZFD door opening server api thing using Python + Flask API.
## usage

1. Install the needed dependencies with `pip install -r requirements.txt`
2. Start the server with `python server.py`
3. Try calling [http://localhost:3010/api/public](http://localhost:3010/api/public)

# Testing the API

You can then try to do a GET to [http://localhost:3010/api/private](http://localhost:3010/api/private) which will
throw an error if you don't send an access token signed with RS256 with the appropriate issuer and audience in the
Authorization header. 

