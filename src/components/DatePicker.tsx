import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateInputProps {
    label: string;
    selectedDate: Date | null;
    onDateChange: (date: Date | null) => void;
}

const DateInput: React.FC<DateInputProps> = ({ label, selectedDate, onDateChange }) => {
    return (
        <div>
            <label>{label}</label>
            <DatePicker
                className="p-2 bg-white rounded-lg z-1 shadow"
                selected={selectedDate}
                onChange={date => onDateChange(date)}
                dateFormat="yyyy-MM-dd" // Customize date format as per your requirement
            />
        </div>
    );
};

export default DateInput;
