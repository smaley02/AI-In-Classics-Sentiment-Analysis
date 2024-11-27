import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom"; 
import "../css/styles.css";
import current_frequency from "../../../backend/temp/current_frequency.png";
import copy_1 from "../../../backend/temp/copy_1.png"; // change as needed
import copy_2 from  "../../../backend/temp/copy_2.png"; // change as needed

const imagePaths = [
    current_frequency,
    copy_1,
    copy_2,
];

export default function Analysis() {
    const location = useLocation();
    const initialData = location.state || { word: "", startYear: "", endYear: "" };
    const navigate = useNavigate();

    const [word, setWord] = useState(initialData.word);
    const [startYear, setStartYear] = useState(initialData.startYear);
    const [endYear, setEndYear] = useState(initialData.endYear);

    const [updatedWord, setUpdatedWord] = useState(word);
    const [updatedStartYear, setUpdatedStartYear] = useState(startYear);
    const [updatedEndYear, setUpdatedEndYear] = useState(endYear);

    const [error, setError] = useState(""); // To hold error message
    const [imageKey, setImageKey] = useState(Date.now()); // To force image refresh
    const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track the current image index

    const handleUpdate = async () => {
        setError('');

        if (!updatedWord || !updatedStartYear || !updatedEndYear) {
            setError('All fields are required!');
            return; 
        }

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
        // Refresh the image by updating the image key
        setImageKey(Date.now());
    };

    const handlePreviousImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? imagePaths.length - 1 : prevIndex - 1
        );
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === imagePaths.length - 1 ? 0 : prevIndex + 1
        );
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
                    value={updatedWord}
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
                        value={updatedStartYear}
                        onChange={(e) => setUpdatedStartYear(e.target.value)}
                    />
                    <span className="to-text">to</span>
                    <input
                        type="text"
                        className="analysis-year-input-right"
                        placeholder="+/- yyyy"
                        value={updatedEndYear}
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
                    <img
                        src={`${imagePaths[currentImageIndex]}?key=${imageKey}`}
                        alt={`Analysis Result ${currentImageIndex + 1}`}
                        className="result-image"
                    />
                </div>
                <div className="navigation-arrows">
                        <button onClick={handlePreviousImage}>&lt; Previous</button>
                        <button onClick={handleNextImage}>Next &gt;</button>
                </div>
            </div>
        </div>
    );
}
