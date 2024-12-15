import React, { useEffect, useState } from "react";
import futuristicVid from "../videos/futuristic.mp4"; 
import "../styles/main1.css";
import retroImg from "../images/retroCard.jpg";

export default function Main() {
    const [content, setContent] = useState("Dear future, Harsith!"); 
    const [isDateAppended, setIsDateAppended] = useState(false); 

    function getDateTime() {
        const currentDate = new Date();
        return currentDate.toLocaleString(); 
    }

    useEffect(() => {
        if (!isDateAppended) {
            setContent(prevContent => prevContent + `\n${getDateTime()}`); 
            setIsDateAppended(true); 
        }
    }, [isDateAppended]); 

    const handleChange = (e) => {
        setContent(e.target.value); 
    };

    return (
        <div className="outer-container">
            <div className="sparkle"></div>
            <div className="sparkle"></div>
            <div className="sparkle"></div>
            <div className="sparkle"></div>
            <div className="sparkle"></div>
            <div className="sparkle"></div>
            <div className="options-container">
                
                <video src={futuristicVid} autoPlay loop muted>
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="retro-card">
                <textarea
                    name="retro"
                    id="retro"
                    value={content} 
                    onChange={handleChange} 
                />
                <button>Send to Future</button>
            </div>
        </div>
    );
}
