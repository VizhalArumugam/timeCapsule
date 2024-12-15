import React from "react";
import futuristicVid from "../videos/futuristic.mp4"; // Import video properly
import "../styles/main1.css";

export default function Main() {
    return (
        <div className="outer-container">
            <div className="options-container">
                <video src={futuristicVid} autoPlay loop muted>
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="container">
                <textarea name="text" id="text" className="area"></textarea>
                <button>Send to Future</button>
            </div>
            
        </div>
    );
}
