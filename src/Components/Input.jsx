import "./css/input.css";
import { useState } from "react";
import { Select, MenuItem } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Input = ({
    label,
    value,
    error,
    onChange,
    onBlur,
    onKeyDown,
    touched,
    id,
    type,
    placeholder,
    flex,
    setFieldValue,
}) => {
    const [selectValue, setSelectValue] = useState(null);
    const inputError = error && touched;
    const formattedValue = typeof value === "string" ? dayjs(value) : value;
    return (
        <div
            style={flex ? { flex: flex } : {}}
            className={label === "Invoice Date" ? "input-date" : "input"}
        >
            {label && (
                <div className="label-head">
                    <p
                        style={{
                            color: error && touched ? "var(--9)" : "var(--7)",
                        }}
                    >
                        {label}
                    </p>
                    {error && touched && (
                        <p style={{ color: "var(--9)" }}>{error}</p>
                    )}
                </div>
            )}
            {label === "Invoice Date" ? (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        value={formattedValue}
                        onChange={(newValue) => {
                            const formattedDate = newValue
                                ? newValue.format()
                                : "";
                            setFieldValue(id, formattedDate);
                        }}
                        onBlur={onBlur}
                        textField={(params) => (
                            <TextField
                                {...params}
                                error={inputError}
                                helperText={inputError ? error : ""}
                                onBlur={onBlur}
                            />
                        )}
                    />
                </LocalizationProvider>
            ) : label === "Payment Terms" ? (
                <Select
                    value={value}
                    onChange={(e) => {
                        setSelectValue(e.target.value);
                        setFieldValue(id, e.target.value);
                    }}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                >
                    <MenuItem value={1}>Net 1 Day</MenuItem>
                    <MenuItem value={7}>Net 7 Days</MenuItem>
                    <MenuItem value={14}>Net 14 Days</MenuItem>
                    <MenuItem value={30}>Net 30 Days</MenuItem>
                </Select>
            ) : (
                <input
                    className={inputError ? "error" : ""}
                    style={inputError ? { outline: "1px solid var(--9)" } : {}}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    onKeyDown={onKeyDown || null}
                    id={id}
                    type={type}
                    placeholder={placeholder || ""}
                />
            )}
        </div>
    );
};

export default Input;
