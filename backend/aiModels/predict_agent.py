# Fetch AI agents imports
from uagents import Agent, Context, Model
from uagents.setup import fund_agent_if_low
import numpy as np
import tensorflow as tf
from tensorflow import keras
from sklearn.preprocessing import StandardScaler
import joblib
from dotenv import load_dotenv

load_dotenv()

# Load the machine learning model
model = keras.models.load_model('water.keras')

# Load the saved StandardScaler
scaler = joblib.load('models/scaler.pkl')

def standardize(features):
    """Standardize the input features using the loaded scaler."""
    return scaler.transform(features)

def classify_quality(prediction):
    """Classify the water quality based on the prediction value."""
    if prediction >= 0.8:
        return 'Good'
    elif 0.4 <= prediction < 0.8:
        return 'Moderate'
    else:
        return 'Poor'
    
# Store for chat history
store = {}

# Define request and response models
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
    
class Response(Model):
    prediction_percentage: float
    quality_label: str

# Define the agent
SimpleAgent = Agent(
    name="Water Quality Prediction Agent",
    port=8001,  # Change port to avoid conflict
    seed="Water Quality Predictor",
    endpoint=["http://127.0.0.1:8001/submit"],
)

fund_agent_if_low(SimpleAgent.wallet.address())

@SimpleAgent.on_event('startup')
async def agent_details(ctx: Context):
    ctx.logger.info(f'Simple Agent Address is {SimpleAgent.address}')

@SimpleAgent.on_query(model=PredictRequest, replies={Response})
async def query_handler(ctx: Context, sender: str, msg: PredictRequest):
    try:
        ctx.logger.info(f'Received message: {msg}')
        # Prepare the data for the prediction
        features = np.array([[msg.ph, msg.Hardness, msg.Solids, msg.Chloramines,
                              msg.Sulfate, msg.Conductivity, msg.Organic_carbon, 
                              msg.Trihalomethanes, msg.Turbidity]])

        standardized_features = standardize(features)

        # Make a prediction using the loaded model
        prediction = model.predict(standardized_features)[0][0]
        
        # Calculate prediction percentage and classify quality
        prediction_percentage = round(prediction * 100, 2)
        quality_label = classify_quality(prediction)

        # Prepare the response data
        prediction_data = {
            'prediction_percentage': prediction_percentage,
            'quality_label': quality_label
        }
        
        # Log the response from the prediction API
        ctx.logger.info(f'Prediction Response: {prediction_data}')
        
        # Send the response back to the sender
        await ctx.send(sender, Response(
            prediction_percentage=prediction_data['prediction_percentage'],
            quality_label=prediction_data['quality_label']
        ))
        
    except Exception as ex:
        ctx.logger.warning(f'Error in prediction: {ex}')
        await ctx.send(sender, Response(
            prediction_percentage=0.0,
            quality_label='Error'
        ))


if __name__ == "__main__":
    SimpleAgent.run()