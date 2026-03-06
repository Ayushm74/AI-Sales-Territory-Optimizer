"""
ML Service API
Flask API for revenue prediction and model training
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Import ML functions
import sys
from pathlib import Path
sys.path.append(str(Path(__file__).parent.parent))

from training.train_model import train_revenue_model
from prediction.predict_revenue import predict_revenue
from utils.helpers import get_model_path

load_dotenv()

app = Flask(__name__)
CORS(app)

# Get model path
MODEL_PATH = get_model_path()


@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'ok',
        'service': 'ML Service',
        'model_exists': os.path.exists(MODEL_PATH)
    })


@app.route('/predict', methods=['POST'])
def predict():
    """
    Predict revenue for territories
    POST /predict
    Body: {
        "territories": [
            {
                "region": "California",
                "market_size": 500000,
                "past_revenue": 120000,
                "deals": 8,
                "customers": 15
            },
            ...
        ]
    }
    """
    try:
        data = request.get_json()
        
        if not data or 'territories' not in data:
            return jsonify({
                'success': False,
                'message': 'Missing territories in request body'
            }), 400
        
        territories = data['territories']
        
        if not isinstance(territories, list) or len(territories) == 0:
            return jsonify({
                'success': False,
                'message': 'Territories must be a non-empty list'
            }), 400
        
        # Make predictions
        predictions = predict_revenue(territories, MODEL_PATH)
        
        return jsonify({
            'success': True,
            'predictions': predictions,
            'count': len(predictions)
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500


@app.route('/train', methods=['POST'])
def train():
    """
    Train the revenue prediction model
    POST /train
    Body: {
        "data": [
            {
                "sales_rep": "John",
                "region": "California",
                "revenue": 120000,
                "deals": 8,
                "customers": 15
            },
            ...
        ],
        "territory_data": [
            {
                "region": "California",
                "market_size": 500000
            },
            ...
        ]
    }
    """
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                'success': False,
                'message': 'Missing data in request body'
            }), 400
        
        sales_data = data.get('data', [])
        territory_data = data.get('territory_data', [])
        
        if len(sales_data) == 0 or len(territory_data) == 0:
            return jsonify({
                'success': False,
                'message': 'Both sales_data and territory_data are required'
            }), 400
        
        # Train model
        result = train_revenue_model(sales_data, territory_data, MODEL_PATH)
        
        return jsonify(result)
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500


if __name__ == '__main__':
    port = int(os.getenv('PORT', 5001))
    debug = os.getenv('FLASK_ENV') == 'development'
    
    print(f'🚀 ML Service starting on port {port}')
    print(f'📊 Model path: {MODEL_PATH}')
    
    app.run(host='0.0.0.0', port=port, debug=debug)

