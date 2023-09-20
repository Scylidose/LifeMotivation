from flask import Flask, jsonify
from flask_cors import CORS

from recommendation import RecommendationSystem

app = Flask(__name__)
CORS(app, resources={r"/recommendation": {"origins": "http://localhost:3000"}})

db_path = '../database/abitmotivation.db'

@app.route('/recommendation', methods=['GET'])
def get_recommendation():
    try:
        recommendation_system = RecommendationSystem(db_path)
        input_document_index = 0
        recommendations = recommendation_system.run_recommendation(input_document_index)
        recommendations = [int(item) for item in recommendations]

        return jsonify(recommendations)

    except Exception as e:
        return jsonify(e)

if __name__ == '__main__':
    app.run(port=8000)