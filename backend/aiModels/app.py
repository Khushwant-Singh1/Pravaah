from flask import Flask, jsonify, request
from flask_cors import CORS
from uagents.query import query
from uagents import Model
import asyncio
import json
# import pickle

app = Flask(__name__)
CORS(app)

vendorAgent = 'agent1qvsnflrrg4jgsc0uzy5snn08puvshmd4dpkpruaa0zhj3th6n4d6s63w7w2'
# model = pickle.load(open("./best_model.pkl", 'rb'))

class Request(Model):
    data: str

async def venderAgent(prompt):
    req = Request(data=prompt)
    response = await query(destination=vendorAgent, message=req, timeout=15.0)
    data = json.loads(response.decode_payload())
    return data

@app.route('/search', methods=['POST'])
def post():
    new_entry = request.json
    print(new_entry)
    input_data = new_entry.get('data')
    response = asyncio.run(venderAgent(input_data))
    print(response)
    return jsonify(response['message'])


@app.route('/index', methods=['POST'])
def index():
    return "Index route is working!"

# @app.route('/predict', methods=['POST'])
# def predict():
#     try:
#         data = request.get_json()

#         input_data = data.get('features')  
        
#         # prediction = model.predict([input_data])

#         return jsonify({
#             'success': True,
#             'prediction': prediction[0]  
#         })
#     except Exception as e:
#         return jsonify({
#             'success': False,
#             'error': str(e)
#         }), 400

if __name__ == "__main__":
    app.run(debug=True, port=8080)