import os
from flask import Flask, jsonify, request
from flask_cors import CORS  # To handle CORS issues

app = Flask(__name__)
CORS(app)  # Allow requests from React frontend

@app.route('/')
def index():
    return jsonify({"message": "Welcome!"})

@app.route('/api/analyze', methods=['POST'])
def analyze_word():
    # Get the JSON data from the request
    data = request.json
    word = data.get('word')
    start_year = data.get('startYear')
    end_year = data.get('endYear')

    # Process the data (this is just an example)
    response_data = {
        "word": word,
        "startYear": start_year,
        "endYear": end_year,
        "message": "Analysis completed!"  # You can customize this message
    }

    # Return the processed data as JSON
    print(response_data)
    return jsonify(response_data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)  # Run Flask on port 5000
