import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const RouteGuard = () => {
  const token = Cookies.get("token");

  if (token && token != "undefined") {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default RouteGuard;
