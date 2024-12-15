import React, { useState } from "react";
import { Box, TextField, IconButton, Typography, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const Chat = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: inputValue.trim() },
      { sender: "bot", text: "This is an automated response." },
    ]);
    setInputValue(""); // Clear input field
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
        borderRadius:"20px",
        backgroundImage: "linear-gradient(45deg, rgb(0, 255, 255), rgb(0, 11, 71), rgb(0, 0, 0));",
        boxShadow:"0px 0px 30px rgba(0, 255, 255,1)"
      }}
    >
      {/* Chat Messages Section */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          padding: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor:
                msg.sender === "user" ? "rgb(1, 159, 159)" : "#e0e0e0",
              color: msg.sender === "user" ? "#fff" : "#000",
              borderRadius: "10px",
              padding: "8px 12px",
              maxWidth: "70%",
            }}
          >
            <Typography variant="body1">{msg.text}</Typography>
          </Box>
        ))}
      </Box>

      {/* Message Input Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: 1,
          gap: 1,
        }}
      >
        <TextField
          variant="outlined"
          size="small"
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          fullWidth
          sx={{ backgroundColor: "#fff",borderRadius:"50px"}}
        />
        <IconButton
          color="primary"
          onClick={handleSendMessage}
          aria-label="send message"
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
    </div>
  );
};

export default Chat;
