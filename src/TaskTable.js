import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import SubmitTask from "./SubmitTask";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

const TaskTable = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertSeverity, setAlertSeverity] = useState(null);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setSelectedRow(null);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleViewClick = (row) => {
    setSelectedRow(row);
    setIsDialogOpen(true);
  };

  const handleUpdateStatusClick = async () => {
    try {
      // Find the selected radio button by name
      const selectedRadioButton = document.querySelector(
        'input[name="radio-buttons-group"]:checked',
      );

      // Check if a radio button is selected
      if (selectedRadioButton) {
        const newStatus = selectedRadioButton.value;

        const response = await fetch(
          `https://rmes.kempshot.com/update-status/${selectedRow.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              new_status: newStatus,
            }),
          },
        );

        if (response.ok) {
          // The status was updated successfully, you can handle the response as needed
          console.log("Status updated successfully");

          // Reload tasks after the update
          loadTasksFromApi();

          // Set success message
          setAlertMessage("Status updated successfully");
          setAlertSeverity("success");
        } else {
          // Handle error cases
          console.error("Failed to update status");

          // Set error message
          setAlertMessage("Failed to update status");
          setAlertSeverity("error");
        }
      } else {
        console.error("No radio button selected");

        // Set error message
        setAlertMessage("No radio button selected");
        setAlertSeverity("error");
      }
    } catch (error) {
      console.error("Error updating status:", error);

      // Set error message
      setAlertMessage("Error updating status");
      setAlertSeverity("error");
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name_of_staff", headerName: "Name of Staff", width: 200 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "content_of_task", headerName: "Content of Task", width: 300 },
    { field: "date", headerName: "Date", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => (
        <strong>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleViewClick(params.row)}
          >
            View
          </Button>
        </strong>
      ),
    },
    { field: "status", headerName: "Status", width: 120 },
  ];

  useEffect(() => {
    // Load tasks from API when the component mounts
    loadTasksFromApi();
  }, []);

  const loadTasksFromApi = async () => {
    try {
      // Fetch the username from local storage
      const username = localStorage.getItem("loggedInUsername");

      // Redirect to login if username is not available
      if (!username) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        `https://rmes.kempshot.com/fetch-tasks/${username}`,
      );
      if (response.ok) {
        const data = await response.json();

        // Remove duplicates based on task ID and submission date
        const uniqueTasks = data.reduce((unique, task) => {
          return unique.some(
            (t) =>
              t.id === task.id && t.submission_date === task.submission_date,
          )
            ? unique
            : [...unique, task];
        }, []);

        // Sort unique tasks by date in descending order
        const sortedTasks = uniqueTasks
          .slice()
          .sort((a, b) => new Date(b.date) - new Date(a.date));

        setTasks(sortedTasks);
      } else {
        console.error("Failed to fetch tasks");

        // Set error message
        setAlertMessage("Failed to fetch tasks");
        setAlertSeverity("error");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);

      // Set error message
      setAlertMessage("Error fetching tasks");
      setAlertSeverity("error");
    }
  };

  // Get the username from local storage
  const username = localStorage.getItem("loggedInUsername");

  return (
    <div style={{ width: "100%", padding: "16px" }}>
      <h2
        style={{
          textAlign: "center",
          fontSize: "24px",
          color: "#1976D2",
          margin: "16px 0",
        }}
      >
        Task Table
      </h2>

      {/* Display alert message */}
      {alertMessage && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity={alertSeverity}>{alertMessage}</Alert>
        </Stack>
      )}

      <div style={{ height: 550, width: "100%" }}>
        <DataGrid
          rows={tasks}
          columns={columns}
          pageSize={10}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>

      {/* Render the "Add Task" button only for the username "Maclean" */}
      {username === "Maclean" && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "16px",
          }}
        >
          <Button variant="contained" onClick={handleButtonClick}>
            Add Task
          </Button>
        </Box>
      )}

      <Dialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="md" // Adjust the width as needed
        PaperProps={{
          style: {
            borderRadius: "12px",
          },
        }}
      >
        <DialogTitle style={{ textAlign: "center" }}>
          {selectedRow ? "View Task Details" : "Add Task"}
        </DialogTitle>
        <DialogContent>
          {selectedRow ? (
            <div>
              <p>ID: {selectedRow.id}</p>
              <p>Name of Staff: {selectedRow.name_of_staff}</p>
              <p>Title: {selectedRow.title}</p>

              {/* Style the Content of Task for better visibility */}
              <div
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  borderRadius: "5px",
                  marginBottom: "10px",
                }}
              >
                <strong>Content of Task:</strong>
                <pre style={{ whiteSpace: "pre-wrap" }}>
                  {selectedRow.content_of_task}
                </pre>
              </div>

              <p>Date: {selectedRow.date}</p>
              <p>Status: {selectedRow.status}</p>

              {/* Add your radio buttons here */}
              <FormControl component="fieldset" style={{ marginTop: "16px" }}>
                <FormLabel component="legend">Status</FormLabel>
                <RadioGroup aria-label="status" name="radio-buttons-group">
                  <FormControlLabel
                    value="Ongoing"
                    control={<Radio />}
                    label="Ongoing"
                  />
                  <FormControlLabel
                    value="Done"
                    control={<Radio />}
                    label="Done"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          ) : (
            <SubmitTask onClose={handleDialogClose} />
          )}
        </DialogContent>

        <DialogActions>
          {selectedRow && (
            <Button
              variant="contained"
              onClick={(event) => handleUpdateStatusClick(event)}
            >
              Update Status
            </Button>
          )}
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TaskTable;
