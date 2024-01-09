import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function AddressForm() {
  const [notPaidSelection, setNotPaidSelection] = React.useState([]);
  const [boardersSelection, setBoardersSelection] = React.useState([]);
  const [sponsoredSelection, setSponsoredSelection] = React.useState([]);
  const [billedSelection, setBilledSelection] = React.useState([]);
  const [busSelection, setBusSelection] = React.useState([]);
  const [busAdvanceSelection, setBusAdvanceSelection] = React.useState([]);
  const [feedingAdvanceSelection, setFeedingAdvanceSelection] = React.useState(
    [],
  );
  const [underpaymentSelection, setUnderpaymentSelection] = React.useState([]);

  const handleChange = (event, setSelection) => {
    setSelection(event.target.value);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Select
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="standard">
            <InputLabel id="not-paid-label">Select Not Paid</InputLabel>
            <Select
              labelId="not-paid-label"
              id="notPaid"
              name="notPaid"
              multiple
              value={notPaidSelection}
              onChange={(event) => handleChange(event, setNotPaidSelection)}
              autoComplete="given-name"
              renderValue={(selected) => selected.join(", ")}
            >
              <MenuItem value="John">John</MenuItem>
              <MenuItem value="Jane">Jane</MenuItem>
              <MenuItem value="Doe">Doe</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="standard">
            <InputLabel id="sponsored-label">Select Sponsored</InputLabel>
            <Select
              labelId="sponsored-label"
              id="sponsored"
              name="sponsored"
              multiple
              value={sponsoredSelection}
              onChange={(event) => handleChange(event, setSponsoredSelection)}
              autoComplete="family-name"
              renderValue={(selected) => selected.join(", ")}
            >
              <MenuItem value="Smith">Smith</MenuItem>
              <MenuItem value="Johnson">Johnson</MenuItem>
              <MenuItem value="Williams">Williams</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="standard">
            <InputLabel id="boarders-label">Select Boarders</InputLabel>
            <Select
              labelId="boarders-label"
              id="boarders"
              name="boarders"
              multiple
              value={boardersSelection}
              onChange={(event) => handleChange(event, setBoardersSelection)}
              autoComplete="given-name"
              renderValue={(selected) => selected.join(", ")}
            >
              <MenuItem value="John">John</MenuItem>
              <MenuItem value="Jane">Jane</MenuItem>
              <MenuItem value="Doe">Doe</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="standard">
            <InputLabel id="billed-label">Select Billed</InputLabel>
            <Select
              labelId="billed-label"
              id="billed"
              name="billed"
              multiple
              value={billedSelection}
              onChange={(event) => handleChange(event, setBilledSelection)}
              autoComplete="given-name"
              renderValue={(selected) => selected.join(", ")}
            >
              <MenuItem value="Option1">Option1</MenuItem>
              <MenuItem value="Option2">Option2</MenuItem>
              <MenuItem value="Option3">Option3</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="standard">
            <InputLabel id="bus-label">Select Bus</InputLabel>
            <Select
              labelId="bus-label"
              id="bus"
              name="bus"
              multiple
              value={busSelection}
              onChange={(event) => handleChange(event, setBusSelection)}
              autoComplete="given-name"
              renderValue={(selected) => selected.join(", ")}
            >
              <MenuItem value="Option1">Option1</MenuItem>
              <MenuItem value="Option2">Option2</MenuItem>
              <MenuItem value="Option3">Option3</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="standard">
            <InputLabel id="bus-advance-label">Select Bus Advance</InputLabel>
            <Select
              labelId="bus-advance-label"
              id="busAdvance"
              name="busAdvance"
              multiple
              value={busAdvanceSelection}
              onChange={(event) => handleChange(event, setBusAdvanceSelection)}
              autoComplete="given-name"
              renderValue={(selected) => selected.join(", ")}
            >
              <MenuItem value="Option1">Option1</MenuItem>
              <MenuItem value="Option2">Option2</MenuItem>
              <MenuItem value="Option3">Option3</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="standard">
            <InputLabel id="feeding-advance-label">
              Select Feeding Advance
            </InputLabel>
            <Select
              labelId="feeding-advance-label"
              id="feedingAdvance"
              name="feedingAdvance"
              multiple
              value={feedingAdvanceSelection}
              onChange={(event) =>
                handleChange(event, setFeedingAdvanceSelection)
              }
              autoComplete="given-name"
              renderValue={(selected) => selected.join(", ")}
            >
              <MenuItem value="Option1">Option1</MenuItem>
              <MenuItem value="Option2">Option2</MenuItem>
              <MenuItem value="Option3">Option3</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="standard">
            <InputLabel id="underpayment-label">Select Underpayment</InputLabel>
            <Select
              labelId="underpayment-label"
              id="underpaymentDropdown"
              name="underpaymentDropdown"
              multiple
              value={underpaymentSelection}
              onChange={(event) =>
                handleChange(event, setUnderpaymentSelection)
              }
              autoComplete="given-name"
              renderValue={(selected) => selected.join(", ")}
            >
              <MenuItem value="Option1">Option1</MenuItem>
              <MenuItem value="Option2">Option2</MenuItem>
              <MenuItem value="Option3">Option3</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}></Grid>
        <Grid item xs={12}>
          {/* <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="Use this address for payment details"
          /> */}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
