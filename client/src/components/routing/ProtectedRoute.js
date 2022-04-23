import Spinner from "react-bootstrap/Spinner";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Dashboard from "../../views/Dashboard";
import NavbarMenu from "../layout/NavbarMenu";

const ProtectedRoute = () => {
  const authLoading = useSelector((state) => state.auth.authLoading);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (authLoading)
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );

  return isAuthenticated ? (
    <>
      <NavbarMenu />
      <Dashboard />
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
