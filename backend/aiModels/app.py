from flask import Flask, jsonify, request
from flask_cors import CORS
from uagents.query import query
from uagents import Model
import asyncio
import json

app = Flask(__name__)
CORS(app)

vendorAgent = 'agent1qvsnflrrg4jgsc0uzy5snn08puvshmd4dpkpruaa0zhj3th6n4d6s63w7w2'
predictAgent = 'agent1q07hlfwvu6neuh2u7e6g53syjewckjq44skm6er6p6yjfrw33d70varlqzn'

class Request(Model):
    data: str

class PredictRequest(Model):
    ph: float
    Hardness: float
    Solids: float
    Chloramines: float
    Sulfate: float
    Conductivity: float
    Organic_carbon: float
    Trihalomethanes: float
    Turbidity: float

async def predickAgent(data):
    # Ensure you unpack data when initializing PredictRequest
    req = PredictRequest(**data)
    
    response = await query(destination=predictAgent, message=req, timeout=20.0)
    data = json.loads(response.decode_payload())
    return data

async def venderAgent(prompt):
    req = Request(data=prompt)
    response = await query(destination=vendorAgent, message=req, timeout=15.0)
    data = json.loads(response.decode_payload())
    return data

@app.route('/search', methods=['POST'])
def post():
    new_entry = request.json
    print(new_entry)
    
    # Extract the prompt from the incoming JSON
    input_data = new_entry.get('data')
    if not input_data:
        return jsonify({"error": "No input data provided"}), 400
    
    # Call the vendor agent asynchronously
    response = asyncio.run(venderAgent(input_data))
    print(response)
    return jsonify(response['message'])

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    print(data)
    
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    try:
        # Ensure you're sending a dictionary with the right structure
        response = asyncio.run(predickAgent(data))
        print(response)
        return jsonify(response)
    except Exception as e:
        print(f"Error during prediction: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=8080)