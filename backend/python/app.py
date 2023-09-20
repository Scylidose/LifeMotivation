from flask import Flask, jsonify
from recommendation_system import RecommendationSystem

app = Flask(__name__)
db_path = '../database/abitmotivation.db'

@app.route('/recommendation', methods=['GET'])
def get_recommendation():
    try:
        recommendation_system = RecommendationSystem(db_path)
        input_document_index = 0
        recommendations = recommendation_system.run_recommendation(input_document_index)

        return jsonify(recommendations)

    except Exception as e:
        return jsonify({})

if __name__ == '__main__':
    app.run()