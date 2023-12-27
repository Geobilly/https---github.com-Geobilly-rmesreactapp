import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "title", headerName: "Title", width: 130 },
  { field: "recipients", headerName: "Recipients", width: 130 },
  { field: "message", headerName: "Message", width: 300 },
  { field: "author", headerName: "Author", width: 130 },
  { field: "status", headerName: "Status", width: 130 },
];

const rows = [
  {
    id: 1,
    title: "Meeting",
    recipients: "John, Jane",
    message: "Discuss project updates.",
    author: "Alice",
    status: "Sent",
  },
  {
    id: 2,
    title: "Reminder",
    recipients: "Bob",
    message: "Don't forget the deadline!",
    author: "Charlie",
    status: "Pending",
  },
  {
    id: 3,
    title: "Greetings",
    recipients: "All",
    message: "Season's greetings!",
    author: "Eve",
    status: "Sent",
  },
  {
    id: 4,
    title: "Task Assignment",
    recipients: "Team",
    message: "Assigning tasks for the week.",
    author: "Bob",
    status: "Sent",
  },
  {
    id: 5,
    title: "Urgent Notice",
    recipients: "All Employees",
    message: "Emergency evacuation drill tomorrow.",
    author: "HR Department",
    status: "Draft",
  },
];

const Message = () => {
  return (
    <div style={{ height: 400, width: "100%", marginTop: 70 }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
};

export default Message;
