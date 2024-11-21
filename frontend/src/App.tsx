import { useState } from "react";
import Title from "./tsx/title";
import './css/styles.css';
import InputForm from "./tsx/input-form";

export default function App() {
    const [titleOpacity] = useState(1); // Control title opacity
    return (
        <div className="app-container">
            <div style={{ opacity: titleOpacity, transition: 'opacity 0.5s ease-in-out', textAlign: 'center' }}>
                <Title />
            </div>

            <div>
                {<InputForm />}
            </div>
        </div>
    );
}
