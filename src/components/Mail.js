import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "../styles/main1.css";
import { TextField, Button, Box, IconButton ,Typography} from "@mui/material"; // Importing MUI components
import FolderIcon from "@mui/icons-material/Folder"; // Import Folder Icon

export default function Mail(props) {
  const [file, setFile] = useState(null); // To store the selected file

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Get the first selected file
    setFile(selectedFile); // Store the file in the state
    console.log("Selected file:", selectedFile);
  };

  const handleFolderClick = () => {
    // Open the file picker dialog
    document.getElementById("fileInput").click();
  };

  return (
    <div className="retro-card">
      {/* Folder Icon Button */}
      <IconButton onClick={handleFolderClick} sx={{ marginRight: "10px" }}>
        <FolderIcon fontSize="large" />
      </IconButton>

      {/* Hidden file input */}
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        onChange={handleFileChange} // Handle file selection
        accept="image/*,video/*" // Accept image and video files
      />

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
          transition: "box-shadow 2s",
          outline: "none",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "transparent",
            },
            "&:hover fieldset": {
              borderColor: "transparent",
            },
            "&.Mui-focused fieldset": {
              borderColor: "transparent",
            },
          },
        }}
      />

      {/* File name or preview */}
      {file && (
        <Box sx={{ marginTop: "10px" }}>
          <Typography variant="body1">Selected File: {file.name}</Typography>
          {/* Display preview for images or videos */}
          {file.type.startsWith("image") && (
            <img src={URL.createObjectURL(file)} alt="preview" width="100px" />
          )}
          {file.type.startsWith("video") && (
            <video width="100px" controls>
              <source src={URL.createObjectURL(file)} />
              Your browser does not support the video tag.
            </video>
          )}
        </Box>
      )}

      <Button
        variant="contained"
        sx={{ boxShadow: props.boxShadow, backgroundColor: "rgba(4, 230, 251, 0.8)" }}
      >
        Send to Future
      </Button>
    </div>
  );
}
