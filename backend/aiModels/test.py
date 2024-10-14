from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import tensorflow as tf
from tensorflow import keras
from sklearn.preprocessing import StandardScaler
import joblib

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

model = keras.models.load_model('water.keras')

# Load the saved StandardScaler
scaler = joblib.load('models/scaler.pkl')

def standardize(features):
    return scaler.transform(features)

def classify_quality(prediction):
    if prediction >= 0.8:
        return 'Good'
    elif 0.4 <= prediction < 0.8:
        return 'Moderate'
    else:
        return 'Poor'

@app.route('/')
def index():
    return "Water Quality Prediction API"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    features = np.array([[data['ph'], data['Hardness'], data['Solids'], data['Chloramines'],
                          data['Sulfate'], data['Conductivity'], data['Organic_carbon'], 
                          data['Trihalomethanes'], data['Turbidity']]])
    
    standardized_features = standardize(features)
    
    prediction = model.predict(standardized_features)[0][0]
    
    prediction_percentage = round(prediction * 100, 2)
    
    quality_label = classify_quality(prediction)
    
    return jsonify({
        'prediction_percentage': prediction_percentage,
        'quality_label': quality_label
    })

if __name__ == "__main__":
    app.run(debug=True, port=8080)