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
    try:
        data = request.json
        word = data.get('word')
        start_year = data.get('startYear')
        end_year = data.get('endYear')

        # Validate inputs
        if not word or not start_year or not end_year:
            return jsonify({"error": "All fields are required"}), 400

        # Process data here
        print(f"Processing analysis for {word} ({start_year}-{end_year})")

        # Repackage data
        response_data = {
            "word": word,
            "startYear": start_year,
            "endYear": end_year,
            "message": "Analysis completed!" 
        }
        
        return jsonify(response_data)
    except Exception as e:
        print("Error during processing:", e)
        return jsonify({"error": "An internal error occurred"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)  # Run Flask on port 5000
