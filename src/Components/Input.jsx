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
                                        color: "#000000 !important",
                                    },
                                },
                            },
                            desktopPaper: {
                                sx: {
                                    marginTop: "12px !important",
                                    borderRadius: "8px !important",
                                    boxShadow:
                                        "0 10px 20px 0 #48549f40 !important",
                                    ".MuiDayCalendar-header span": {
                                        fontFamily: "League Spartan !important",
                                        fontWeight: "700 !important",
                                        letterSpacing: "-0.25px !important",
                                        lineHeight: "normal !important",
                                        fontSize: "15px !important",
                                        color: "var(--8) !important",
                                    },
                                    ".MuiYearCalendar-root": {
                                        fontFamily: "League Spartan !important",
                                        fontWeight: "700 !important",
                                        letterSpacing: "-0.25px !important",
                                        lineHeight: "normal !important",
                                        fontSize: "15px !important",
                                    },
                                    ".css-rhiqj0": {
                                        fontFamily: "League Spartan !important",
                                        fontWeight: "700 !important",
                                        letterSpacing: "-0.25px !important",
                                        lineHeight: "normal !important",
                                        fontSize: "15px !important",
                                    },
                                    ".css-m3ivqp:not(.Mui-selected)": {
                                        border: "1px solid var(--1)",
                                    },
                                    ".MuiPickersYear-root .css-innj4t-MuiPickersYear-yearButton":
                                        {
                                            fontFamily:
                                                "League Spartan !important",
                                            fontWeight: "700 !important",
                                            letterSpacing: "-0.25px !important",
                                            lineHeight: "normal !important",
                                            fontSize: "15px !important",
                                        },
                                    ".css-innj4t-MuiPickersYear-yearButton:hover":
                                        {
                                            backgroundColor:
                                                "#7c5dfa29 !important",
                                        },
                                    ".css-innj4t-MuiPickersYear-yearButton:focus":
                                        {
                                            backgroundColor:
                                                "#7c5dfa29 !important",
                                        },
                                    ".css-sf5j28-MuiButtonBase-root-MuiIconButton-root-MuiPickersCalendarHeader-switchViewButton:hover":
                                        {
                                            backgroundColor:
                                                "#7c5dfa29 !important",
                                        },
                                    ".MuiButtonBase-root.Mui-selected": {
                                        backgroundColor: "var(--1) !important",
                                    },
                                    ".css-rhiqj0.Mui-selected": {
                                        backgroundColor: "var(--1) !important",
                                    },
                                    ".css-innj4t-MuiPickersYear-yearButton.Mui-selected":
                                        {
                                            backgroundColor:
                                                "var(--1) !important",
                                        },
                                    ".css-uqnj9x-MuiButtonBase-root-MuiPickersDay-root:not(.Mui-selected)":
                                        {
                                            border: "1px solid var(--1) !important",
                                        },
                                    ".css-wylj2m-MuiButtonBase-root-MuiPickersDay-root:hover":
                                        {
                                            backgroundColor:
                                                "#7c5dfa29 !important",
                                        },
                                    ".css-wylj2m-MuiButtonBase-root-MuiPickersDay-root:focus":
                                        {
                                            backgroundColor:
                                                "#7c5dfa29 !important",
                                        },
                                },
                            },
                            mobilePaper: {
                                sx: {
                                    marginTop: "12px !important",
                                    borderRadius: "8px !important",
                                    boxShadow:
                                        "0 10px 20px 0 #48549f40 !important",
                                    ".css-3jvy96-MuiTypography-root-MuiDatePickerToolbar-title":
                                        {
                                            fontFamily:
                                                "League Spartan !important",
                                            fontWeight: "700 !important",
                                            letterSpacing: "-0.25px !important",
                                            color: "var(--8) !important",
                                            lineHeight: "normal !important",
                                        },
                                    ".css-1hbyad5-MuiTypography-root": {
                                        fontFamily: "League Spartan !important",
                                        fontWeight: "700 !important",
                                        letterSpacing: "-0.25px !important",
                                        fontSize: "15px !important",
                                        color: "var(--8) !important",
                                    },
                                    ".css-1psulnz-MuiTypography-root-MuiDatePickerToolbar-title":
                                        {
                                            fontFamily:
                                                "League Spartan !important",
                                            fontWeight: "700 !important",
                                            letterSpacing: "-0.25px !important",
                                            color: "var(--8) !important",
                                        },
                                    ".css-1e6y48t-MuiButtonBase-root-MuiButton-root":
                                        {
                                            fontFamily:
                                                "League Spartan !important",
                                            fontWeight: "700 !important",
                                            fontSize: "15px !important",
                                            letterSpacing: "-0.25px !important",
                                            color: "var(--1) !important",
                                        },
                                    ".MuiDayCalendar-header span": {
                                        fontFamily: "League Spartan !important",
                                        fontWeight: "700 !important",
                                        letterSpacing: "-0.25px !important",
                                        lineHeight: "normal !important",
                                        fontSize: "15px !important",
                                        color: "var(--8) !important",
                                    },
                                    ".MuiYearCalendar-root": {
                                        fontFamily: "League Spartan !important",
                                        fontWeight: "700 !important",
                                        letterSpacing: "-0.25px !important",
                                        lineHeight: "normal !important",
                                        fontSize: "15px !important",
                                    },
                                    ".MuiPickersYear-root .css-innj4t-MuiPickersYear-yearButton":
                                        {
                                            fontFamily:
                                                "League Spartan !important",
                                            fontWeight: "700 !important",
                                            letterSpacing: "-0.25px !important",
                                            lineHeight: "normal !important",
                                            fontSize: "15px !important",
                                        },
                                    ".css-innj4t-MuiPickersYear-yearButton:hover":
                                        {
                                            backgroundColor:
                                                "#7c5dfa29 !important",
                                        },
                                    ".css-innj4t-MuiPickersYear-yearButton:focus":
                                        {
                                            backgroundColor:
                                                "#7c5dfa29 !important",
                                        },
                                    ".css-sf5j28-MuiButtonBase-root-MuiIconButton-root-MuiPickersCalendarHeader-switchViewButton:hover":
                                        {
                                            backgroundColor:
                                                "#7c5dfa29 !important",
                                        },
                                    ".MuiButtonBase-root.Mui-selected": {
                                        backgroundColor: "var(--1) !important",
                                        color: "var(--0) !important",
                                    },
                                    ".css-innj4t-MuiPickersYear-yearButton.Mui-selected":
                                        {
                                            backgroundColor:
                                                "var(--1) !important",
                                        },
                                    ".css-uqnj9x-MuiButtonBase-root-MuiPickersDay-root:not(.Mui-selected)":
                                        {
                                            border: "1px solid var(--1) !important",
                                        },
                                    ".css-wylj2m-MuiButtonBase-root-MuiPickersDay-root:hover":
                                        {
                                            backgroundColor:
                                                "#7c5dfa29 !important",
                                        },
                                    ".css-wylj2m-MuiButtonBase-root-MuiPickersDay-root:focus":
                                        {
                                            backgroundColor:
                                                "#7c5dfa29 !important",
                                        },
                                },
                            },
                            calendarHeader: {
                                sx: {
                                    fontWeight: "700 !important",
                                    letterSpacing: "-0.25px !important",
                                    lineHeight: "normal !important",
                                    fontSize: "15px !important",
                                    color: "var(--8) !important",
                                    ".MuiPickersCalendarHeader-labelContainer":
                                        {
                                            fontFamily:
                                                "League Spartan !important",
                                            fontWeight: "700 !important",
                                            letterSpacing: "-0.25px !important",
                                            lineHeight: "normal !important",
                                            fontSize: "15px !important",
                                            color: "var(--8) !important",
                                        },
                                    ".css-sldnni": {
                                        fill: "var(--1) !important",
                                    },
                                    ".css-1tkx1wf-MuiSvgIcon-root-MuiPickersCalendarHeader-switchViewIcon":
                                        {
                                            fill: "var(--1) !important",
                                        },
                                    ".css-1cw4hi4": {
                                        fill: "var(--1) !important",
                                        fontSize: "22px !important",
                                    },
                                    ".css-1vooibu-MuiSvgIcon-root": {
                                        fill: "var(--1) !important",
                                        fontSize: "22px !important",
                                    },
                                    ".css-kg9q0s-MuiButtonBase-root-MuiIconButton-root-MuiPickersArrowSwitcher-button:hover":
                                        {
                                            backgroundColor:
                                                "#7c5dfa29 !important",
                                        },
                                    ".css-1nkg345-MuiButtonBase-root-MuiIconButton-root-MuiPickersArrowSwitcher-button:hover":
                                        {
                                            backgroundColor:
                                                "#7c5dfa29 !important",
                                        },
                                    ".css-12mkn7b-MuiButtonBase-root-MuiIconButton-root-MuiPickersCalendarHeader-switchViewButton:hover":
                                        {
                                            backgroundColor:
                                                "#7c5dfa29 !important",
                                        },
                                },
                            },
                            day: {
                                sx: {
                                    fontFamily: "League Spartan !important",
                                    fontWeight: "700 !important",
                                    letterSpacing: "-0.25px !important",
                                    lineHeight: "normal !important",
                                    fontSize: "15px !important",
                                    color: "var(--8) !important",
                                },
                            },
                        }}
                        sx={{
                            fontFamily: "League Spartan !important",
                            fontWeight: "700 !important",
                            minHeight: "0 !important",

                            "& .css-1bn53lx": {
                                fontFamily: "League Spartan !important",
                                fontWeight: "700 !important",
                                letterSpacing: "-0.25px !important",
                                lineHeight: "normal !important",
                                fontSize: "15px !important",
                                color: "var(--8) !important",
                                borderRadius: "4px !important",
                            },
                            "& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root":
                                {
                                    fontFamily: "League Spartan !important",
                                    fontWeight: "700 !important",
                                    letterSpacing: "-0.25px !important",
                                    lineHeight: "normal !important",
                                    fontSize: "15px !important",
                                    color: "var(--8) !important",
                                    borderRadius: "4px !important",
                                },
                            "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root":
                                {
                                    fontFamily: "League Spartan !important",
                                    fontWeight: "700 !important",
                                    letterSpacing: "-0.25px !important",
                                    lineHeight: "normal !important",
                                    fontSize: "15px !important",
                                    color: "var(--8) !important",
                                    borderRadius: "4px !important",
                                },

                            ".css-1yq5fb3-MuiButtonBase-root-MuiIconButton-root:hover":
                                {
                                    backgroundColor: "#7c5dfa29 !important",
                                },
                            "& .css-1uvydh2": {
                                height: "auto !important",
                                padding: "16px 20px !important",
                            },
                            "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input":
                                {
                                    height: "auto !important",
                                    padding: "16px 20px !important",
                                },
                            "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input":
                                {
                                    height: "auto !important",
                                    padding: "16px 20px !important",
                                },
                            ".css-vubbuv": {
                                fill: "var(--7) !important",
                                width: "19.21px !important",
                                height: "19.21px !important",
                                fontSize: "19.21px !important",
                            },
                            "& .css-i4bv87-MuiSvgIcon-root": {
                                fill: "var(--7) !important",
                                width: "19.21px !important",
                                height: "19.21px !important",
                                fontSize: "19.21px !important",
                            },
                            ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                borderColor: "var(--5) !important",
                            },
                            ".css-igs3ac": {
                                borderColor: "var(--5) !important",
                                borderWidth: "1px !important",
                            },
                            ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                borderColor: "var(--5) !important",
                                borderWidth: "1px !important",
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
                        fontFamily: "League Spartan !important",
                        fontWeight: "700 !important",
                        letterSpacing: "-0.25px !important",
                        lineHeight: "normal !important",
                        fontSize: "15px !important",
                        borderRadius: "4px !important",
                        color: "var(--8) !important",
                        minHeight: "0 !important",
                        "& .css-qiwgdb.MuiSelect-select": {
                            minHeight: 0,
                        },
                        "& .MuiSelect-select": {
                            minHeight: 0,
                        },
                        "& .css-qiwgdb": {
                            padding: "16px 20px !important",
                            height: "auto !important",
                        },
                        "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
                            {
                                padding: "16px 20px !important",
                                height: "auto !important",
                            },
                        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "var(--1) !important",
                            borderWidth: "1px !important",
                        },
                        ".css-igs3ac": {
                            borderColor: "var(--5) !important",
                            borderWidth: "1px !important",
                        },
                        ".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                            borderColor: "var(--5) !important",
                            borderWidth: "1px !important",
                        },
                        ".MuiSvgIcon-root": {
                            color: "var(--1) !important",
                        },
                        "&:hover": {
                            "&& fieldset": {
                                border: "1px solid var(--5) !important",
                            },
                        },
                        "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select":
                            {
                                minHeight: "0 !important",
                            },
                    }}
                    MenuProps={{
                        sx: {
                            "& .MuiList-root .MuiMenuItem-root:not(:last-child)":
                                {
                                    borderBottom:
                                        "1px solid var(--5) !important",
                                },
                            "& .MuiMenu-paper": {
                                marginTop: "12px !important",
                                boxShadow: "0 10px 20px 0 #48549f40 !important",
                                borderRadius: "8px !important",
                                color: "var(--8) !important",
                            },
                            "& .MuiMenuItem-root:hover:not(.Mui-selected)": {
                                backgroundColor: "transparent !important",
                                color: "var(--1) !important",
                            },
                            "& .css-1km1ehz": {
                                fontFamily: "League Spartan !important",
                                fontWeight: "700 !important",
                                letterSpacing: "-0.25px !important",
                                lineHeight: "normal !important",
                                fontSize: "15px !important",
                                padding: "16px 24px !important",
                            },
                            "& .css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root":
                                {
                                    fontFamily: "League Spartan !important",
                                    fontWeight: "700 !important",
                                    letterSpacing: "-0.25px !important",
                                    lineHeight: "normal !important",
                                    fontSize: "15px !important",
                                    padding: "16px 24px !important",
                                },
                            "& .css-r8u8y9": {
                                padding: "0px !important",
                            },
                            "& .css-6hp17o-MuiList-root-MuiMenu-list": {
                                padding: "0px !important",
                            },
                            "& .Mui-selected": {
                                backgroundColor: `#7C5DFA26 !important`,
                                color: "var(--1) !important",
                            },
                            "& .Mui-selected:hover": {
                                backgroundColor: "#7C5DFA26 !important",
                                color: "var(--1) !important",
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
