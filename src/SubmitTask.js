import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const SubmitTask = () => {
  const [nameOfStaff, setNameOfStaff] = useState("");
  const [title, setTitle] = useState("");
  const [contentOfTask, setContentOfTask] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [usernames, setUsernames] = useState([]);
  const [loading, setLoading] = useState(false); // State to track loading

  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const response = await axios.get(
          "https://rmes.kempshot.com/fetch-usernames",
        );

        setUsernames(response.data); // Assuming response.data contains the array of usernames
      } catch (error) {
        console.error("Error fetching usernames:", error);
      }
    };

    fetchUsernames();
  }, []);

  const handleSubmit = async () => {
    try {
      // Basic validation
      if (!nameOfStaff || !title || !contentOfTask) {
        setError("Please fill in all fields.");
        return;
      }

      // Set loading state to true
      setLoading(true);

      // Use the correct API endpoint for your Flask server
      const apiUrl = "https://task.kempshot.com/submit-task";

      // Send data to the Flask API
      await axios.post(apiUrl, {
        name_of_staff: nameOfStaff,
        title: title,
        content_of_task: contentOfTask,
      });

      // Reset loading state and form fields, and display success message
      setLoading(false);
      setNameOfStaff("");
      setTitle("");
      setContentOfTask("");
      setError("");
      setSuccessMessage("Task submitted successfully");

      // Clear success message after 6 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 6000);
    } catch (error) {
      console.error("Error submitting task:", error);
      alert("Error submitting task");

      // Reset loading state in case of an error
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Submit Task
      </Typography>
      <form style={{ width: "80%", maxWidth: "300px" }}>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="name-of-staff">Name of Staff</InputLabel>
          <Select
            value={nameOfStaff}
            onChange={(e) => setNameOfStaff(e.target.value)}
            label="Name of Staff"
            id="name-of-staff"
          >
            {usernames.map((username) => (
              <MenuItem key={username} value={username}>
                {username}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Content of Task"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={contentOfTask}
          onChange={(e) => setContentOfTask(e.target.value)}
        />
        {/* Conditionally render the CircularProgress based on the loading state */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          Submit Task
        </Button>
        {loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {error && <Typography color="error">{error}</Typography>}
        {successMessage && (
          <Typography style={{ color: "green" }}>{successMessage}</Typography>
        )}
      </form>
    </div>
  );
};

export default SubmitTask;
