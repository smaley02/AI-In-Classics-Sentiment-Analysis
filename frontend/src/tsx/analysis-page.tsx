import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom"; 
import "../css/styles.css";

export default function Analysis() {
    const location = useLocation();
    const initialData = location.state || { word: "", startYear: "", endYear: "" };
    const navigate = useNavigate();

    const [word, setWord] = useState(initialData.word); // Default values passed from location.state
    const [startYear, setStartYear] = useState(initialData.startYear);
    const [endYear, setEndYear] = useState(initialData.endYear);

    const [updatedWord, setUpdatedWord] = useState(word);
    const [updatedStartYear, setUpdatedStartYear] = useState(startYear);
    const [updatedEndYear, setUpdatedEndYear] = useState(endYear);

    const [error, setError] = useState(""); // To hold error message

    const handleUpdate = async () => {
        // Clear any previous error message
        setError('');

        // Validate if all fields are filled
        if (!updatedWord || !updatedStartYear || !updatedEndYear) {
            setError('All fields are required!');
            return; 
        }

        // On submit, update the state values to reflect the current input values
        setWord(updatedWord);
        setStartYear(updatedStartYear);
        setEndYear(updatedEndYear);

        console.log("Submitting updated data:", { updatedWord, updatedStartYear, updatedEndYear });

        try {
            const response = await fetch('http://127.0.0.1:5000/api/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ word: updatedWord, startYear: updatedStartYear, endYear: updatedEndYear }),
            });
    
            if (response.ok) {
                const result = await response.json();
                console.log("Analysis Page - Backend response:", result);
                // Navigate to the updated analysis page with the data
                // Not sure if this is required
                navigate('/analysis', { state: result });
            } else {
                console.error('Error:', response.statusText);
                setError('Failed to get analysis from backend');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Error connecting to the server');
        }
    };

    return (
        <div className="analysis-page-layout">
            {/* Left: Input Form Container */}
            <div className="analysis-form">
                <h2 className="analysis-form-title">Edit Analysis Parameters</h2>
                <label className="form-label" htmlFor="word-input"></label>
                <input
                    id="word-input"
                    type="text"
                    className="analysis-word-input"
                    placeholder="Latin or Ancient Greek"
                    value={updatedWord}  // Use the updated state for value
                    onChange={(e) => setUpdatedWord(e.target.value)}
                />

                <label className="form-label" htmlFor="time-period">
                    <span className="info-text"></span>
                </label>
                <div className="analysis-time-period-container">
                    <input
                        type="text"
                        className="analysis-year-input-left"
                        placeholder="+/- yyyy"
                        value={updatedStartYear}  // Use the updated state for value
                        onChange={(e) => setUpdatedStartYear(e.target.value)} 
                    />
                    <span className="to-text">to</span>
                    <input
                        type="text"
                        className="analysis-year-input-right"
                        placeholder="+/- yyyy"
                        value={updatedEndYear}  // Use the updated state for value
                        onChange={(e) => setUpdatedEndYear(e.target.value)} 
                    />
                </div>

                {error && <div className="error-message">{error}</div>}

                <button className="update-button" onClick={handleUpdate}>
                    Update Parameters
                </button>
            </div>

            {/* Right: Results and Graphs Container */}
            <div className="results-container">
                <h2 className="results-title">Analysis Results</h2>
                    <div className="current-data">
                        <p><strong>Word:</strong> {word || "Not provided"}</p>
                        <p><strong>Start Year:</strong> {startYear || "Not provided"}</p>
                        <p><strong>End Year:</strong> {endYear || "Not provided"}</p>
                    </div>
                <div className="results-placeholder">
                    <p>The analysis results will appear here.</p>
                </div>
            </div>
        </div>
    );
}
