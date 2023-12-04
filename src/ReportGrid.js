// ReportGrid.js

import React, { useState, useEffect, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import ReportForm from "./ReportForm";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { getStoredUsername } from "./authUtils";

const ReportGrid = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [reports, setReports] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertSeverity, setAlertSeverity] = useState(null);

  const sortedReports = useMemo(() => {
    // Sort the reports array by submission_date in descending order
    return reports
      .slice()
      .sort(
        (a, b) => new Date(b.submission_date) - new Date(a.submission_date),
      );
  }, [reports]);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleViewClick = (row) => {
    setSelectedRow(row);
    setIsDialogOpen(true);
  };

  const handleAddReportClick = () => {
    // Clear the selected row to ensure the ReportForm is shown
    setSelectedRow(null);
    setIsDialogOpen(true);
  };

  const columns = [
    { field: "report_id", headerName: "Report ID", width: 100 },
    { field: "report_title", headerName: "Report Title", width: 200 },
    { field: "author_name", headerName: "Author Name", width: 200 },
    { field: "report_content", headerName: "Report Content", width: 300 },
    { field: "submission_date", headerName: "Submission Date", width: 150 },
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
  ];

  columns.forEach((column) => {
    column.headerClassName = "blue-header";
  });

  useEffect(() => {
    const username = getStoredUsername();

    if (username) {
      fetchReportsFromApi(username);
    } else {
      setAlertMessage("No logged-in username found");
      setAlertSeverity("error");
    }
  }, []);

  const fetchReportsFromApi = async (username) => {
    try {
      const response = await fetch(
        `https://rmes.kempshot.com/fetch-reports/${username}`,
      );
      if (response.ok) {
        const data = await response.json();
        const reportsWithId = data.map((report, index) => ({
          ...report,
          id: index + 1,
        }));

        setReports(reportsWithId);
      } else {
        console.error("Failed to fetch reports");

        setAlertMessage("Failed to fetch reports");
        setAlertSeverity("error");
      }
    } catch (error) {
      console.error("Error fetching reports:", error);

      setAlertMessage("Error fetching reports");
      setAlertSeverity("error");
    }
  };

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
        Report Grid
      </h2>

      {alertMessage && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity={alertSeverity}>{alertMessage}</Alert>
        </Stack>
      )}

      <div style={{ height: 550, width: "100%" }}>
        <DataGrid
          rows={sortedReports}
          columns={columns}
          pageSize={10}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "16px",
        }}
      >
        <Button variant="contained" onClick={handleAddReportClick}>
          Add Report
        </Button>
      </Box>

      <Dialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          style: {
            borderRadius: "12px",
          },
        }}
      >
        <DialogTitle style={{ textAlign: "center" }}>
          {selectedRow ? "View Report Details" : "Submit Report"}
        </DialogTitle>
        <DialogContent>
          {selectedRow ? (
            <div>
              <p>ID: {selectedRow.id}</p>
              <p>Report ID: {selectedRow.report_id}</p>
              <p>Report Title: {selectedRow.report_title}</p>
              <p>Author Name: {selectedRow.author_name}</p>

              <div
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  borderRadius: "5px",
                  marginBottom: "10px",
                }}
              >
                <strong>Report Content:</strong>
                <pre style={{ whiteSpace: "pre-wrap" }}>
                  {selectedRow.report_content}
                </pre>
              </div>

              <p>Submission Date: {selectedRow.submission_date}</p>
            </div>
          ) : (
            <ReportForm />
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ReportGrid;
