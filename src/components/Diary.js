import React, { useState } from "react";
import { Box, TextField, IconButton, Typography, Paper, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import stickyNote from "../images/stickyNote.png";
import axios from "axios"; 

const Diary = () => {
  const [text, setText] = useState("");
  const [sentText, setSentText] = useState([]); 

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  let userName = localStorage.getItem('userName')

  const handleSubmit = async () => {
    const recipientEmail = prompt(`Please enter the email id`);

    if (!recipientEmail || !validateEmail(recipientEmail)) {
      alert("Please enter a valid email address");
      return;
    }

    const stickyNoteText = sentText.join("\n");

    const formData = new FormData();
    formData.append("to", recipientEmail);
    formData.append("subject", "Scheduled Email");
    formData.append("text", stickyNoteText); 
    try {
      const response = await axios.post("http://localhost:5000/send-email", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(response.data.message); 
    } catch (error) {
      alert("Error sending email"); 
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSend = () => {
    if (text) {
      setSentText((prevMessages) => [...prevMessages, text]); 
      setText(""); 
    }
  };

  const handleDragStart = (e, emoji) => {
    e.dataTransfer.setData("text", emoji); 
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const emoji = e.dataTransfer.getData("text"); 
    setText((prevText) => prevText + emoji); 
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="chat-card">
      <Paper
        elevation={3}
        sx={{
          width: "400px",
          height: "600px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          textAlign:"center",
          padding: 2,
          margin: "auto",
          borderRadius: "20px",
          backgroundImage: `url(${stickyNote})`,
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
          boxShadow: "0px 0px 30px rgba(0, 255, 255, 0.7)",
          color:"#000",
        }}
      >
        {userName}'s Sticky Note
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            padding: 1,
            marginBottom: 2,
            maxHeight: "400px", 
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            borderRadius: "8px",
            border: "1px solid gray",
          }}
        >
          {sentText.map((message, index) => (
            <Box key={index} sx={{ marginBottom: 1 }}>
              <Typography variant="body1">{message}</Typography>
            </Box>
          ))}
        </Box>

        {/* Input Area */}
        <Box sx={{ display: "flex", alignItems: "center", padding: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Write/Drag and drop an emoji..."
            value={text}
            onChange={handleTextChange}
            sx={{
              marginRight: 1,
              borderRadius: "15px",
            }}
          />
          <IconButton onClick={handleSend}>
            <SendIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
          {["😀", "😁", "😎", "❤️", "👍", "🎉"].map((emojiChar) => (
            <span
              key={emojiChar}
              draggable
              onDragStart={(e) => handleDragStart(e, emojiChar)}
              style={{
                fontSize: "30px",
                cursor: "pointer",
              }}
            >
              {emojiChar}
            </span>
          ))}
        </Box>

        <Button onClick={handleSubmit} sx={{ backgroundColor:"#3498db", color:"#fff" }}>
          Send to Mail
        </Button>
      </Paper>
    </div>
  );
};

export default Diary;
