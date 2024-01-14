import "./css/input.css";
import { useContext, useState } from "react";
import { Select, MenuItem, Skeleton } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import companyDetailsContext from "../context/companyDetails";
import { useLocation } from "react-router-dom";

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
    const { pathname } = useLocation();
    const isPathCompanyDetails = pathname === "/profile-details";
    const { isCompanyLoading } = useContext(companyDetailsContext);
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
                    {isPathCompanyDetails ? (
                        isCompanyLoading ? (
                            <Skeleton
                                variant="rounded"
                                width={90}
                                height={14}
                            />
                        ) : (
                            <>
                                <p
                                    style={{
                                        color:
                                            error && touched
                                                ? "var(--9)"
                                                : "var(--7)",
                                    }}
                                >
                                    {label}
                                </p>
                                {error && touched && (
                                    <p style={{ color: "var(--9)" }}>{error}</p>
                                )}
                            </>
                        )
                    ) : (
                        <>
                            <p
                                style={{
                                    color:
                                        error && touched
                                            ? "var(--9)"
                                            : "var(--7)",
                                }}
                            >
                                {label}
                            </p>
                            {error && touched && (
                                <p style={{ color: "var(--9)" }}>{error}</p>
                            )}
                        </>
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
                        slotProps={{
                            layout: {
                                sx: {
                                    ".MuiDateCalendar-root": {
                                        color: "#000000",
                                    },
                                },
                            },
                            desktopPaper: {
                                sx: {
                                    marginTop: "12px",
                                    borderRadius: "8px",
                                    boxShadow: "0 10px 20px 0 #48549f40",
                                    ".MuiDayCalendar-header span": {
                                        fontFamily: "League Spartan",
                                        fontWeight: "700",
                                        letterSpacing: "-0.25px",
                                        lineHeight: "normal",
                                        fontSize: "15px",
                                        color: "var(--8)",
                                    },
                                    ".MuiYearCalendar-root": {
                                        fontFamily: "League Spartan",
                                        fontWeight: "700",
                                        letterSpacing: "-0.25px",
                                        lineHeight: "normal",
                                        fontSize: "15px",
                                    },
                                    ".css-rhiqj0": {
                                        fontFamily: "League Spartan",
                                        fontWeight: "700",
                                        letterSpacing: "-0.25px",
                                        lineHeight: "normal",
                                        fontSize: "15px",
                                    },
                                    ".css-m3ivqp:not(.Mui-selected)": {
                                        border: "1px solid var(--1)",
                                    },
                                    ".MuiPickersYear-root .css-innj4t-MuiPickersYear-yearButton":
                                        {
                                            fontFamily: "League Spartan",
                                            fontWeight: "700",
                                            letterSpacing: "-0.25px",
                                            lineHeight: "normal",
                                            fontSize: "15px",
                                        },
                                    ".css-innj4t-MuiPickersYear-yearButton:hover":
                                        {
                                            backgroundColor: "#7c5dfa29",
                                        },
                                    ".css-innj4t-MuiPickersYear-yearButton:focus":
                                        {
                                            backgroundColor: "#7c5dfa29",
                                        },
                                    ".css-sf5j28-MuiButtonBase-root-MuiIconButton-root-MuiPickersCalendarHeader-switchViewButton:hover":
                                        {
                                            backgroundColor: "#7c5dfa29",
                                        },
                                    ".MuiButtonBase-root.Mui-selected": {
                                        backgroundColor: "var(--1)",
                                    },
                                    ".css-rhiqj0.Mui-selected": {
                                        backgroundColor: "var(--1)",
                                    },
                                    ".css-innj4t-MuiPickersYear-yearButton.Mui-selected":
                                        {
                                            backgroundColor: "var(--1)",
                                        },
                                    ".css-uqnj9x-MuiButtonBase-root-MuiPickersDay-root:not(.Mui-selected)":
                                        {
                                            border: "1px solid var(--1)",
                                        },
                                    ".css-wylj2m-MuiButtonBase-root-MuiPickersDay-root:hover":
                                        {
                                            backgroundColor: "#7c5dfa29",
                                        },
                                    ".css-wylj2m-MuiButtonBase-root-MuiPickersDay-root:focus":
                                        {
                                            backgroundColor: "#7c5dfa29",
                                        },
                                },
                            },
                            mobilePaper: {
                                sx: {
                                    marginTop: "12px",
                                    borderRadius: "8px",
                                    boxShadow: "0 10px 20px 0 #48549f40",
                                    ".css-3jvy96-MuiTypography-root-MuiDatePickerToolbar-title":
                                        {
                                            fontFamily: "League Spartan",
                                            fontWeight: "700",
                                            letterSpacing: "-0.25px",
                                            color: "var(--8)",
                                            lineHeight: "normal",
                                        },
                                    ".css-1hbyad5-MuiTypography-root": {
                                        fontFamily: "League Spartan",
                                        fontWeight: "700",
                                        letterSpacing: "-0.25px",
                                        fontSize: "15px",
                                        color: "var(--8)",
                                    },
                                    ".css-1psulnz-MuiTypography-root-MuiDatePickerToolbar-title":
                                        {
                                            fontFamily: "League Spartan",
                                            fontWeight: "700",
                                            letterSpacing: "-0.25px",
                                            color: "var(--8)",
                                        },
                                    ".css-1e6y48t-MuiButtonBase-root-MuiButton-root":
                                        {
                                            fontFamily: "League Spartan",
                                            fontWeight: "700",
                                            fontSize: "15px",
                                            letterSpacing: "-0.25px",
                                            color: "var(--1)",
                                        },
                                    ".MuiDayCalendar-header span": {
                                        fontFamily: "League Spartan",
                                        fontWeight: "700",
                                        letterSpacing: "-0.25px",
                                        lineHeight: "normal",
                                        fontSize: "15px",
                                        color: "var(--8)",
                                    },
                                    ".MuiYearCalendar-root": {
                                        fontFamily: "League Spartan",
                                        fontWeight: "700",
                                        letterSpacing: "-0.25px",
                                        lineHeight: "normal",
                                        fontSize: "15px",
                                    },
                                    ".MuiPickersYear-root .css-innj4t-MuiPickersYear-yearButton":
                                        {
                                            fontFamily: "League Spartan",
                                            fontWeight: "700",
                                            letterSpacing: "-0.25px",
                                            lineHeight: "normal",
                                            fontSize: "15px",
                                        },
                                    ".css-innj4t-MuiPickersYear-yearButton:hover":
                                        {
                                            backgroundColor: "#7c5dfa29",
                                        },
                                    ".css-innj4t-MuiPickersYear-yearButton:focus":
                                        {
                                            backgroundColor: "#7c5dfa29",
                                        },
                                    ".css-sf5j28-MuiButtonBase-root-MuiIconButton-root-MuiPickersCalendarHeader-switchViewButton:hover":
                                        {
                                            backgroundColor: "#7c5dfa29",
                                        },
                                    ".MuiButtonBase-root.Mui-selected": {
                                        backgroundColor: "var(--1)",
                                        color: "var(--0)",
                                    },
                                    ".css-innj4t-MuiPickersYear-yearButton.Mui-selected":
                                        {
                                            backgroundColor: "var(--1)",
                                        },
                                    ".css-uqnj9x-MuiButtonBase-root-MuiPickersDay-root:not(.Mui-selected)":
                                        {
                                            border: "1px solid var(--1)",
                                        },
                                    ".css-wylj2m-MuiButtonBase-root-MuiPickersDay-root:hover":
                                        {
                                            backgroundColor: "#7c5dfa29",
                                        },
                                    ".css-wylj2m-MuiButtonBase-root-MuiPickersDay-root:focus":
                                        {
                                            backgroundColor: "#7c5dfa29",
                                        },
                                },
                            },
                            calendarHeader: {
                                sx: {
                                    fontWeight: "700",
                                    letterSpacing: "-0.25px",
                                    lineHeight: "normal",
                                    fontSize: "15px",
                                    color: "var(--8)",
                                    ".MuiPickersCalendarHeader-labelContainer":
                                        {
                                            fontFamily: "League Spartan",
                                            fontWeight: "700",
                                            letterSpacing: "-0.25px",
                                            lineHeight: "normal",
                                            fontSize: "15px",
                                            color: "var(--8)",
                                        },
                                    ".css-sldnni": {
                                        fill: "var(--1)",
                                    },
                                    ".css-1tkx1wf-MuiSvgIcon-root-MuiPickersCalendarHeader-switchViewIcon":
                                        {
                                            fill: "var(--1)",
                                        },
                                    ".css-1cw4hi4": {
                                        fill: "var(--1)",
                                        fontSize: "22px",
                                    },
                                    ".css-1vooibu-MuiSvgIcon-root": {
                                        fill: "var(--1)",
                                        fontSize: "22px",
                                    },
                                    ".css-kg9q0s-MuiButtonBase-root-MuiIconButton-root-MuiPickersArrowSwitcher-button:hover":
                                        {
                                            backgroundColor: "#7c5dfa29",
                                        },
                                    ".css-1nkg345-MuiButtonBase-root-MuiIconButton-root-MuiPickersArrowSwitcher-button:hover":
                                        {
                                            backgroundColor: "#7c5dfa29",
                                        },
                                    ".css-12mkn7b-MuiButtonBase-root-MuiIconButton-root-MuiPickersCalendarHeader-switchViewButton:hover":
                                        {
                                            backgroundColor: "#7c5dfa29",
                                        },
                                },
                            },
                            day: {
                                sx: {
                                    fontFamily: "League Spartan",
                                    fontWeight: "700",
                                    letterSpacing: "-0.25px",
                                    lineHeight: "normal",
                                    fontSize: "15px",
                                    color: "var(--8)",
                                },
                            },
                        }}
                        sx={{
                            fontFamily: "League Spartan",
                            fontWeight: "700",
                            minHeight: "0",

                            "& .css-1bn53lx": {
                                fontFamily: "League Spartan",
                                fontWeight: "700",
                                letterSpacing: "-0.25px",
                                lineHeight: "normal",
                                fontSize: "15px",
                                color: "var(--8)",
                                borderRadius: "4px",
                            },
                            "& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root":
                                {
                                    fontFamily: "League Spartan",
                                    fontWeight: "700",
                                    letterSpacing: "-0.25px",
                                    lineHeight: "normal",
                                    fontSize: "15px",
                                    color: "var(--8)",
                                    borderRadius: "4px",
                                },
                            "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root":
                                {
                                    fontFamily: "League Spartan",
                                    fontWeight: "700",
                                    letterSpacing: "-0.25px",
                                    lineHeight: "normal",
                                    fontSize: "15px",
                                    color: "var(--8)",
                                    borderRadius: "4px",
                                },

                            ".css-1yq5fb3-MuiButtonBase-root-MuiIconButton-root:hover":
                                {
                                    backgroundColor: "#7c5dfa29",
                                },
                            "& .css-1uvydh2": {
                                height: "auto",
                                padding: "16px 20px",
                            },
                            "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input":
                                {
                                    height: "auto",
                                    padding: "16px 20px",
                                },
                            "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input":
                                {
                                    height: "auto",
                                    padding: "16px 20px",
                                },
                            ".css-vubbuv": {
                                fill: "var(--7)",
                                width: "19.21px",
                                height: "19.21px",
                                fontSize: "19.21px",
                            },
                            "& .css-i4bv87-MuiSvgIcon-root": {
                                fill: "var(--7)",
                                width: "19.21px",
                                height: "19.21px",
                                fontSize: "19.21px",
                            },
                            ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                borderColor: "var(--5)",
                            },
                            ".css-igs3ac": {
                                borderColor: "var(--5)",
                                borderWidth: "1px",
                            },
                            ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                borderColor: "var(--5)",
                                borderWidth: "1px",
                            },
                        }}
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
                    sx={{
                        fontFamily: "League Spartan",
                        fontWeight: "700",
                        letterSpacing: "-0.25px",
                        lineHeight: "normal",
                        fontSize: "15px",
                        borderRadius: "4px",
                        color: "var(--8)",
                        minHeight: "0",
                        "& .css-qiwgdb.MuiSelect-select": {
                            minHeight: 0,
                        },
                        "& .MuiSelect-select": {
                            minHeight: 0,
                        },
                        "& .css-qiwgdb": {
                            padding: "16px 20px",
                            height: "auto",
                        },
                        "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
                            {
                                padding: "16px 20px",
                                height: "auto",
                            },
                        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "var(--1)",
                            borderWidth: "1px",
                        },
                        ".css-igs3ac": {
                            borderColor: "var(--5)",
                            borderWidth: "1px",
                        },
                        ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                            borderColor: "var(--5)",
                            borderWidth: "1px",
                        },
                        ".MuiSvgIcon-root": {
                            color: "var(--1)",
                        },
                        "&:hover": {
                            "&& fieldset": {
                                border: "1px solid var(--5)",
                            },
                        },
                        "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":
                            {
                                minHeight: "0",
                            },
                    }}
                    MenuProps={{
                        sx: {
                            "& .MuiList-root .MuiMenuItem-root:not(:last-child)":
                                {
                                    borderBottom: "1px solid var(--5)",
                                },
                            "& .MuiMenu-paper": {
                                marginTop: "12px",
                                boxShadow: "0 10px 20px 0 #48549f40",
                                borderRadius: "8px",
                                color: "var(--8)",
                            },
                            "& .MuiMenuItem-root:hover:not(.Mui-selected)": {
                                backgroundColor: "transparent",
                                color: "var(--1)",
                            },
                            "& .css-1km1ehz": {
                                fontFamily: "League Spartan",
                                fontWeight: "700",
                                letterSpacing: "-0.25px",
                                lineHeight: "normal",
                                fontSize: "15px",
                                padding: "16px 24px",
                            },
                            "& .css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root":
                                {
                                    fontFamily: "League Spartan",
                                    fontWeight: "700",
                                    letterSpacing: "-0.25px",
                                    lineHeight: "normal",
                                    fontSize: "15px",
                                    padding: "16px 24px",
                                },
                            "& .css-r8u8y9": {
                                padding: "0px",
                            },
                            "& .css-6hp17o-MuiList-root-MuiMenu-list": {
                                padding: "0px",
                            },
                            "& .Mui-selected": {
                                backgroundColor: `#7C5DFA26`,
                                color: "var(--1)",
                            },
                            "& .Mui-selected:hover": {
                                backgroundColor: "#7C5DFA26",
                                color: "var(--1)",
                            },
                        },
                    }}
                >
                    <MenuItem value={1}>Net 1 Day</MenuItem>
                    <MenuItem value={7}>Net 7 Days</MenuItem>
                    <MenuItem value={14}>Net 14 Days</MenuItem>
                    <MenuItem value={30}>Net 30 Days</MenuItem>
                </Select>
            ) : isPathCompanyDetails ? (
                isCompanyLoading ? (
                    <Skeleton variant="rounded" height={45} />
                ) : (
                    <input
                        className={inputError ? "error" : ""}
                        style={
                            inputError ? { outline: "1px solid var(--9)" } : {}
                        }
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        onKeyDown={onKeyDown || null}
                        id={id}
                        type={type}
                        placeholder={placeholder || ""}
                    />
                )
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
