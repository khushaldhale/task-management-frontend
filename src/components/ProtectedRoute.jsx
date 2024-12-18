import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => {
    return state.auth.isAuthenticated;
  });

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  //if we are  covering the element with protected route
  //return children;

  //returning the parent route , making it visible
  //outlet is a componet so use it like a tag
  return <Outlet></Outlet>;
};
export default ProtectedRoute;
