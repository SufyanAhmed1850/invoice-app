import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const RequireAuth = ({ children }) => {
    let isAuthenticated = Cookies.get("jwt") ? true : false;
    let location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default RequireAuth;
