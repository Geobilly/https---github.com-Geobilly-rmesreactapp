import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70, editable: false },
  { field: "name", headerName: "Name of Student", width: 200, editable: false },
  { field: "class", headerName: "Class", width: 130, editable: false },
  { field: "section", headerName: "Section", width: 130, editable: false },
  {
    field: "advanceBus",
    headerName: "Advance Bus",
    type: "number",
    width: 120,
    editable: true,
  },
  {
    field: "advanceCanteen",
    headerName: "Advance Canteen",
    type: "number",
    width: 150,
    editable: true,
  },
  {
    field: "underpayment",
    headerName: "Underpayment",
    type: "number",
    width: 150,
    editable: true,
  },
];

const rows = [
  {
    id: 1,
    name: "Jon Snow",
    class: "5th",
    section: "A",
    advanceBus: 50,
    advanceCanteen: 20,
    underpayment: 0,
  },
  {
    id: 2,
    name: "Cersei Lannister",
    class: "8th",
    section: "B",
    advanceBus: 30,
    advanceCanteen: 10,
    underpayment: 5,
  },
  // Add more rows as needed...
];

export default function DataTable() {
  const [editRowsModel, setEditRowsModel] = React.useState({});

  const handleEditRowsModelChange = React.useCallback((model) => {
    setEditRowsModel(model);
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        editRowsModel={editRowsModel}
        onEditRowsModelChange={handleEditRowsModelChange}
      />
    </div>
  );
}
