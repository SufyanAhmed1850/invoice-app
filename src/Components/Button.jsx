import { LoadingButton as MuiButton } from "@mui/lab";

const Button = ({ text, bgColor, color, onClick, img, disabled, loading }) => {
    const isAddInvoiceButton = text === "New Invoice";
    return (
        <MuiButton
            loading={loading || false}
            disabled={disabled}
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
