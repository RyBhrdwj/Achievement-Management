import React from "react";
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  InputLabel,
  Box,
  Grid,
  Typography,
  TextareaAutosize,
} from "@mui/material";

const Form1 = ({ details, setDetails }) => {
  const options = details.type === 'technical' ? [
    "Select",
    "Hackathon",
    "Workshop",
    "Ideathon",
    "Seminar",
    "Conference",
    "Other"
  ] : [
    "Select",
    "Solo singing",
    "Dancing",
    "Sports",
    "Debate competition",
    "Literary event",
    "Drama",
    "Fashion",
    "Photography",
    "Other"
  ];

  return (
    <Box sx={{ mt: 4, p: 2 }}>
      <Grid container spacing={4} sx={{ my: 1 }}>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <TextField
              label="Event Name"
              name="name"
              value={details.name}
              onChange={(e) => setDetails({ ...details, name: e.target.value })}
              placeholder="Enter the name of the event"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <TextField
              label="Event Date"
              type="date"
              name="date"
              value={details.date}
              onChange={(e) => setDetails({ ...details, date: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Type</FormLabel>
            <RadioGroup
              row
              name="type"
              value={details.type}
              onChange={(e) => setDetails({ ...details, type: e.target.value })}
            >
              <FormControlLabel value="technical" control={<Radio />} label="Technical" />
              <FormControlLabel value="non technical" control={<Radio />} label="Non Technical" />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={4} sx={{ my: 1 }}>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Description</InputLabel>
            <Select
              value={details.description}
              onChange={(e) => setDetails({ ...details, description: e.target.value })}
              disabled={details.type === ''}
            >
              {options.map((option, idx) => (
                <MenuItem key={idx} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <TextField
              label="Other"
              placeholder="In case of other please specify"
              value={details.otherDescription || ''}
              onChange={(e) => setDetails({ ...details, otherDescription: e.target.value })}
              disabled={details.description !== "Other"}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Mode</FormLabel>
            <RadioGroup
              row
              name="mode"
              value={details.mode}
              onChange={(e) => setDetails({ ...details, mode: e.target.value })}
            >
              <FormControlLabel value="online" control={<Radio />} label="Online" />
              <FormControlLabel value="offline" control={<Radio />} label="Offline" />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={4} sx={{ my: 1 }}>
        <Grid item xs={12} sm={5}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Result</FormLabel>
            <RadioGroup
              row
              name="result"
              value={details.result}
              onChange={(e) => setDetails({ ...details, result: e.target.value })}
            >
              <FormControlLabel value="winner" control={<Radio />} label="Won" />
              <FormControlLabel value="participant" control={<Radio />} label="Participated" />
              <FormControlLabel value="runner up" control={<Radio />} label="Runner up" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={7}>
          <FormControl fullWidth>
            <TextField
              label="Organised By"
              name="location"
              placeholder="Enter the location of the event"
              multiline
              rows={4}
              value={details.location}
              onChange={(e) => setDetails({ ...details, location: e.target.value })}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Form1;
  