import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import InputFormPage from "./pages/InputFormPage";
import AnalysisPage from "./pages/AnalysisPage";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/input-form" element={<InputFormPage />} />
                <Route path="/analysis" element={<AnalysisPage />} />
            </Routes>
        </Router>
    );
}