import React from "react";
import ReactDOM from "react-dom/client";
import "../styles/main1.css"
import { TextField, Button, Box } from "@mui/material"; // Importing MUI components
export default function Mail(props){
    
  return(
            <div className="chat-card">
                <TextField 
                        multiline
                        rows={10}
                        variant="outlined"
                        value={props.content}
                        onChange={props.handleChange}
                        fullWidth
                        sx={{
                            marginBottom: "20px",
                            backgroundColor: "transparent", 
                            height: "500px", 
                            width: "500px",  
                            resize: "none",
                            padding: "25px", 
                            fontFamily: "'Courier New', Courier, monospace", 
                            whiteSpace: "pre-wrap", 
                            overflowY: "auto", 
                            transition:"box-shadow 2s",
                            outline:"none",
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: "transparent",
                                },
                                "&:hover fieldset": {
                                    borderColor: "transparent", 
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "transparent", 
                                }
                            }
                        }}
                    />


                <Button
                    variant="contained"
                    sx={{ boxShadow: props.boxShadow, backgroundColor: "rgba(4, 230, 251, 0.8)" }}
                >
                    Send to Future
                </Button>
            </div>);
}