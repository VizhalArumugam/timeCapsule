import React, { useEffect, useState } from "react";
import futuristicVid from "../videos/futuristic.mp4";
import "../styles/main1.css";
import retroImg from "../images/retroCard.jpg"; 
import { TextField, Button, Box } from "@mui/material"; // Importing MUI components

export default function Main() {
    const [content, setContent] = useState("Dear future, Harsith!");
    const [isDateAppended, setIsDateAppended] = useState(false);
    const [boxShadow, setBoxShadow] = useState("0 0 80px rgba(4,230,251,1)");

    function getDateTime() {
        const currentDate = new Date();
        return currentDate.toLocaleString(); 
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setBoxShadow(prevBoxShadow => 
                prevBoxShadow === "0 0 80px rgba(4,230,251,1)" 
                ? "0 0 30px rgb(255, 255, 255)" 
                : "0 0 80px rgba(4,230,251,1)"
            );
        }, 1000);

        return () => clearInterval(intervalId);
    }, []); 

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

            <video src={futuristicVid} autoPlay loop muted>
                Your browser does not support the video tag.
            </video>

            <div className="options-container">
                <div>
                    <Box className="option" sx={{ boxShadow: boxShadow }} />
                    <Box className="option" sx={{ boxShadow: boxShadow }} />
                </div>
                <div>
                    <Box className="option" sx={{ boxShadow: boxShadow }} />
                    <Box className="option" sx={{ boxShadow: boxShadow }} />
                </div>
            </div>

            <div className="retro-card">
                <TextField
                    label="Write to your future self"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={content}
                    onChange={handleChange}
                    fullWidth
                    sx={{ boxShadow: boxShadow, marginBottom: "20px" }}
                />
                <Button
                    variant="contained"
                    sx={{ boxShadow: boxShadow, backgroundColor: "rgba(4, 230, 251, 0.8)" }}
                >
                    Send to Future
                </Button>
            </div>
        </div>
    );
}
