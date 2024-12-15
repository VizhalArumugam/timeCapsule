import React, { useEffect, useState } from "react";
import futuristicVid from "../videos/futuristic.mp4";
import "../styles/main1.css";
import retroImg from "../images/retroCard.jpg"; 
import { TextField, Button, Box } from "@mui/material"; // Importing MUI components
import icon from "../icons/mail.svg"
import icon1 from "../icons/chat.svg"
import icon2 from "../icons/diary.svg"
import Mail from "./Mail";
import Chat from "./Chat";
import Diary from "./Diary";

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
                ? "0 0 30px rgba(255, 255, 255,1)" 
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

            <video className="vid" src={futuristicVid} autoPlay loop muted>
                Your browser does not support the video tag.
            </video>

            <div className="options-container">
                <div>
                    <Box className="option" sx={{ 
                        boxShadow: boxShadow

                        }}>
                        <img src={icon} alt="" />
                    </Box>
                    <Box className="option" sx={{ 
                        boxShadow: boxShadow

                        }}>
                        <img src={icon1} alt="" />
                    </Box>
                </div>
                <div>
                <Box className="option" sx={{ 
                        boxShadow: boxShadow

                        }}>
                        <img src={icon2} alt="" />
                    </Box>
                    <Box className="option" sx={{ boxShadow: boxShadow }} />
                </div>
            </div>

            {<Mail handleChange={handleChange} content={content} boxShadow={boxShadow}/>}
            {/*<Chat />*/}
            {/*<Diary />*/}
        </div>
    );
}
