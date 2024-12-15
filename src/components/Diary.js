import React, { useState } from "react";
import { Box, TextField, IconButton, Typography, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import stickyNote from "../images/stickyNote.png";

const Diary = () => {
  const [text, setText] = useState("");
  const [sentText, setSentText] = useState([]); 

  const handleTextChange = (e) => {
    setText(e.target.value);
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
        padding: 2,
        margin: "auto",
        borderRadius: "20px",
        backgroundImage: `url(${stickyNote})`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundRepeat: "no-repeat",
        boxShadow: "0px 0px 30px rgba(0, 255, 255, 0.7)",
      }}
    >
      {/* Display Area (Chat-like Display) */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          padding: 1,
          marginBottom: 2,
          maxHeight: "400px", // Makes the area scrollable
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
          placeholder="Write/Drag and drop a emoji..."
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

      {/* Emoji List to drag */}
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
    </Paper>
    </div>
  );
};

export default Diary;
