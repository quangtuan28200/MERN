import Spinner from "react-bootstrap/Spinner";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import About from "../../views/About";
import Dashboard from "../../views/Dashboard";
import NavbarMenu from "../layout/NavbarMenu";
import NoPage from "../layout/NoPage";

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
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/*" element={<NoPage />} />
      </Routes>
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
