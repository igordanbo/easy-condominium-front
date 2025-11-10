import "./DatePicker.css";
import { useState } from "react";
import dayjs from "dayjs";
import Grid from "@mui/material/Grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const today = dayjs();

export default function DatePicker({ onDateChange }) {
  const [selectedDate, setSelectedDate] = useState(today);

  

  const handleChange = (newValue) => {
    setSelectedDate(newValue);
    if (onDateChange) onDateChange(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid
        container
        columns={{ xs: 1, lg: 2 }}
        spacing={4}
        alignItems="center"
        justifyContent="center"
      >
        <Grid>
          <DateCalendar
            value={selectedDate}
            onChange={handleChange}
            sx={{
              "& .Mui-selected": {
                backgroundColor: "var(--accent-color) !important",
                color: "#fff",
              },
            }}
          />
        </Grid>
      </Grid>

      <p style={{ textAlign: "center", marginTop: "1rem" }}>
        Data selecionada: {selectedDate.format("DD/MM/YYYY")}
      </p>
    </LocalizationProvider>
  );
}
