from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/recommendation', methods=['GET'])
def get_recommendation():
    recommendations = [
        {
            'id': 1,
            'title': 'Action 1',
            'description': 'This is action 1',
            'isGood': True
        },
        {
            'id': 2,
            'title': 'Action 2',
            'description': 'This is action 2',
            'isGood': False
        }
    ]
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run()