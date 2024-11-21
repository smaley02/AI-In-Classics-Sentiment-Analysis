import React, { useState } from "react";
import "../css/styles.css";

export default function Analysis() {
    const [word, setWord] = useState(""); // Default values can be passed if needed
    const [startYear, setStartYear] = useState("");
    const [endYear, setEndYear] = useState("");

    const handleSubmit = () => {
        console.log("Submitting updated data:", { word, startYear, endYear });
        // Add logic to send updated data to the backend
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
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                />

                <label className="form-label" htmlFor="time-period">
                    <span className="info-text"></span>
                </label>
                <div className="analysis-time-period-container">
                    <input
                        type="text"
                        className="analysis-year-input-left"
                        placeholder="+/- yyyy"
                        value={startYear}
                        onChange={(e) => setStartYear(e.target.value)}
                    />
                    <span className="to-text">to</span>
                    <input
                        type="text"
                        className="analysis-year-input-right"
                        placeholder="+/- yyyy"
                        value={endYear}
                        onChange={(e) => setEndYear(e.target.value)}
                    />
                </div>

                <button className="update-button" onClick={handleSubmit}>
                    Update Parameters
                </button>
            </div>

            {/* Right: Results and Graphs Container */}
            <div className="results-container">
                <h2 className="results-title">Analysis Results</h2>
                <div className="results-placeholder">
                    {/* Placeholder for graphs and analysis */}
                    <p>The analysis results will appear here.</p>
                </div>
            </div>
        </div>
    );
}
