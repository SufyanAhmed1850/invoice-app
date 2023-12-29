import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const Auth = ({ children }) => {
    let isAuthenticated = Cookies.get("jwt") ? true : false;

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default Auth;
