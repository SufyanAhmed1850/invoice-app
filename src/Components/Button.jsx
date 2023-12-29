import { Button as MuiButton } from "@mui/material";

const Button = ({ text, bgColor, color, onClick, img }) => {
    const isAddInvoiceButton = text === "New Invoice";
    return (
        <MuiButton
            variant="contained"
            onClick={onClick || null}
            sx={{
                whiteSpace: "nowrap",
                textTransform: "capitalize",
                backgroundColor: bgColor || "var(--1)",
                boxShadow: "none",
                padding: isAddInvoiceButton ? "8px 16px 8px 8px" : "16px 24px",
                borderRadius: "100px",
                lineHeight: "normal",
                letterSpacing: "-.25px",
                color: color || "#FFFFFF",
                ...(img && { gap: isAddInvoiceButton ? "16px" : "24px" }),
                "&:hover": {
                    backgroundColor: bgColor || "var(--1)",
                    boxShadow: "none",
                },
                "&:focus": {
                    backgroundColor: bgColor || "var(--1)",
                    boxShadow: "none",
                },
                "&:active": {
                    backgroundColor: bgColor || "var(--1)",
                    boxShadow: "none",
                },
            }}
        >
            {img && <img src={img} alt="Button Icon" />} {text}
        </MuiButton>
    );
};

export default Button;
