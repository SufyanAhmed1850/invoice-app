import "./css/dropDown.css";
import { useEffect, useState, useRef, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import downArrow from "../assets/images/down-arrow.svg";
import { useSearchParams } from "react-router-dom";
import invoicesOverviewContext from "../context/invoiceOverview";

const DropDown = () => {
    const [searchFilterParams, setSearchFilterParams] = useSearchParams();
    const { filterOptions, setFilterOptions, setCurrentPage } = useContext(
        invoicesOverviewContext,
    );

    const [showDropDown, setShowDropDown] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropDown = () => {
        setShowDropDown(!showDropDown);
    };

    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setShowDropDown(false);
        }
        return;
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const params = {};
        filterOptions.forEach((option) => {
            if (!option.checked) {
                params[option.text.toLowerCase()] = option.checked.toString();
            }
        });
        setSearchFilterParams(params);
    }, [filterOptions, setSearchFilterParams]);

    const handleCheckboxChange = (index) => {
        setCurrentPage(1);
        setFilterOptions((currentOptions) => {
            const checkedCount = currentOptions.filter(
                (option) => option.checked,
            ).length;

            if (checkedCount === 1 && currentOptions[index].checked) {
                // Do not allow unchecking the last checked option
                return currentOptions;
            }

            return currentOptions.map((option, ind) => {
                if (ind === index) {
                    return { ...option, checked: !option.checked };
                }
                return option;
            });
        });
    };

    return (
        <div className="dropdown" ref={dropdownRef}>
            <motion.div className={"dropbtn"} onClick={toggleDropDown}>
                <h3>Filter by status</h3>
                <motion.div
                    initial={{ rotate: 180 }}
                    animate={{ rotate: showDropDown ? 180 : 0 }}
                    transition={{ type: "linear" }}
                >
                    <img src={downArrow} alt="Down" />
                </motion.div>
            </motion.div>
            <AnimatePresence>
                {showDropDown && (
                    <motion.div
                        className="dropdown-options-container"
                        initial={{
                            scaleY: 0.85,
                            opacity: 0,
                            y: -10,
                            transformOrigin: "top center",
                        }}
                        animate={{ scaleY: 1, opacity: 1, y: 0 }}
                        exit={{ scaleY: 0.85, opacity: 0, y: -10 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                        }}
                    >
                        {filterOptions.map((option, ind) => (
                            <motion.div key={ind} className={"dropdown-option"}>
                                <label className="container">
                                    <input
                                        checked={option.checked}
                                        id="uppercaseCheckbox"
                                        type="checkbox"
                                        onChange={() =>
                                            handleCheckboxChange(ind)
                                        }
                                    />
                                    <span className="checkmark" />
                                    <h3 className="dropdown-option-text">
                                        {option.text}
                                    </h3>
                                </label>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DropDown;
