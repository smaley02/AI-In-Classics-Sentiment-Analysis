import React from "react";
import { useNavigate } from "react-router-dom";
import Title from "../tsx/title.tsx";
import "../css/styles.css";

export default function HomePage() {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/input-form");
    };

    return (
        <div className="app-container">
            <div style={{ textAlign: 'center' }}>
                <Title />
            </div>
            <button className="homepage-button" onClick={handleNavigate}>
                Continue to Analysis Tool
            </button>
        </div>
    );
}
