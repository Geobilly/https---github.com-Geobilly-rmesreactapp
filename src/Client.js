import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First Name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last Name",
    width: 150,
    editable: true,
  },
  {
    field: "class",
    headerName: "Class",
    width: 110,
    editable: true,
  },
  {
    field: "section",
    headerName: "Section",
    width: 110,
    editable: true,
  },
  {
    field: "bus",
    headerName: "Bus",
    width: 110,
    editable: true,
  },
  {
    field: "fatherName",
    headerName: "Father Name",
    width: 150,
    editable: true,
  },
  {
    field: "fatherPhone",
    headerName: "Father Phone",
    width: 150,
    editable: true,
  },
  {
    field: "motherName",
    headerName: "Mother Name",
    width: 150,
    editable: true,
  },
  {
    field: "motherPhone",
    headerName: "Mother Phone",
    width: 150,
    editable: true,
  },
];

const rows = [
  {
    id: 1,
    lastName: "Snow",
    firstName: "Jon",
    class: "10th",
    section: "A",
    bus: "Yes",
    fatherName: "Eddard",
    fatherPhone: "123-456-7890",
    motherName: "Catelyn",
    motherPhone: "987-654-3210",
  },
  {
    id: 2,
    lastName: "Lannister",
    firstName: "Cersei",
    class: "12th",
    section: "B",
    bus: "No",
    fatherName: "Tywin",
    fatherPhone: "111-222-3333",
    motherName: "Joanna",
    motherPhone: "444-555-6666",
  },
  // ... (other rows)
];

export default function Client() {
  const [open, setOpen] = React.useState(false);
  const [messageBody, setMessageBody] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ height: 500, width: "100%", marginTop: 10 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableRowSelectionOnClick
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 2,
        }}
      >
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Write Message
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Write Message</DialogTitle>
        <DialogContent>
          <TextField
            label="Message Title"
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Recipient"
            fullWidth
            margin="normal"
            variant="outlined"
            value="Auto-filled recipient"
            readOnly
          />
          <TextField
            label="Author"
            fullWidth
            margin="normal"
            variant="outlined"
            value="Auto-filled author"
            readOnly
          />
          <ReactQuill
            value={messageBody}
            onChange={(value) => setMessageBody(value)}
            theme="snow" // Use the snow theme for a cleaner interface
            style={{ height: "300px", marginBottom: "16px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
