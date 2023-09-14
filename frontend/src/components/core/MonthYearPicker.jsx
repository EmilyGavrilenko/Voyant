import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function MonthYearPicker({ updateDate }) {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (newValue) => {
        setSelectedDate(newValue);
        updateDate(newValue.format('YYYY-MM') + '-01');
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                views={['year', 'month']}
                // label='Travel date'
                value={selectedDate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}

export default MonthYearPicker;
