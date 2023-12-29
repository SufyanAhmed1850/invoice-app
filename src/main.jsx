import "./index.css";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { InvoicesOverviewProvider } from "./context/invoiceOverview.jsx";
import { InvoiceDetailsProvider } from "./context/invoice.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <InvoicesOverviewProvider>
            <InvoiceDetailsProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <App />
                </LocalizationProvider>
            </InvoiceDetailsProvider>
        </InvoicesOverviewProvider>
    </BrowserRouter>,
);
