import React, { useEffect, useState } from 'react';
import '../css/styles.css'; 

const Title: React.FC = () => {
    const [title, setTitle] = useState<string>("< "); // Initial state with the opening bracket
    const fullTitle: string = "         AI-in-Classics Sentiment Analysis Tool"; // The complete title text
                              // ^^^^ fixme, spaces needed to not scramble the words "welcome"
    useEffect(() => {
        let index = 0; 
        setTitle("< ");
        const typingEffect = setInterval(() => {
            if (index < fullTitle.length) {
                setTitle((prev) => prev + fullTitle.charAt(index));
                index++; 
            } else {
                clearInterval(typingEffect);
            }
        }, 40); // Adjust typing speed here

        return () => clearInterval(typingEffect);
    }, [fullTitle]);

    return (
        <h1 className="title">{title} {}
            {}
            {title.endsWith(' >') ? '' : ' >'} 
        </h1>
    );
};

export default Title;
