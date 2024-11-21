// src/InputForm.tsx
import React, { useState } from 'react';
import '../css/styles.css';

export default function InputForm() {
    const [word, setWord] = useState('');
    const [startYear, setStartYear] = useState('');
    const [endYear, setEndYear] = useState('');

    const handleGenerate = async () => {
        const response = await fetch('http://localhost:5000/api/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ word, startYear, endYear }),
        });

        if (response.ok) {
            const result = await response.json();
            console.log(result); // Handle the response as needed
        } else {
            console.error('Error:', response.statusText);
        }
    };

    return (
        <div className="form-container">
            <label className="form-label" htmlFor="word-input">Word to Analyze</label>
            <input
                id="word-input"
                type="text"
                className="input-field"
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

            <button className="generate-button" onClick={handleGenerate}>Generate!</button>
        </div>
    );
}
