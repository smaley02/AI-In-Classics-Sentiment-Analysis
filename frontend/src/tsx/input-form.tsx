import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/styles.css';

export default function InputForm() {
    const [word, setWord] = useState('');
    const [startYear, setStartYear] = useState('');
    const [endYear, setEndYear] = useState('');
    const [error, setError] = useState('');  // To hold error message
    const navigate = useNavigate();

    const handleGenerate = async () => {
        // Clear any previous error message
        setError('');

        // Validate if all fields are filled
        if (!word || !startYear || !endYear) {
            setError('All fields are required!');
            return; 
        }

        try {
            const response = await fetch('http://127.0.0.1:5000/api/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ word, startYear, endYear }),
            });
    
            if (response.ok) {
                const result = await response.json();
                console.log("Input-Form - Backend response:", result); 
                // Navigate to the analysis page with the data
                navigate('/analysis', { state: result });
            } else {
                console.error('Error:', response.statusText);
                setError('Failed to get analysis from backend');  // Set error message if response fails
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Error connecting to the server');  // Set error message if there is a connection issue
        }
    };

    return (
        <div className="form-container">
            <label className="form-label" htmlFor="word-input">Word to Analyze</label>
            <input
                id="word-input"
                type="text"
                className="form-input-field"
                placeholder="Latin or Ancient Greek"
                value={word}
                onChange={(e) => setWord(e.target.value)}
            />

            <label className="form-label" htmlFor="time-period">Time Period <span className="info-text">+ for CE | - for BCE</span></label>
            <div className="time-period-container">
                <input
                    type="text"
                    className="year-input-left"
                    placeholder="+/- yyyy"
                    value={startYear}
                    onChange={(e) => setStartYear(e.target.value)}
                />
                <span className="to-text">to</span>
                <input
                    type="text"
                    className="year-input-right"
                    placeholder="+/- yyyy"
                    value={endYear}
                    onChange={(e) => setEndYear(e.target.value)}
                />
            </div>

            {/* Error message display */}
            {error && <div className="error-message">{error}</div>}

            <button className="generate-button" onClick={handleGenerate}>Submit</button>
        </div>
    );
}
