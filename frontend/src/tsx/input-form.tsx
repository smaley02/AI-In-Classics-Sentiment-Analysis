import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/styles.css';

export default function InputForm() {
    const [word, setWord] = useState('');
    const [startYear, setStartYear] = useState('');
    const [endYear, setEndYear] = useState('');
    const navigate = useNavigate();

    const handleGenerate = async () => {
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
                console.log(result); // Handle the response as needed

                // Navigate to the analysis page (pass data if needed)
                navigate('/analysis');
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
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

            <button className="generate-button" onClick={handleGenerate}>Submit</button>
        </div>
    );
}
