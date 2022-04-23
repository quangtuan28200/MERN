import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import Spinner from "react-bootstrap/Spinner";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Auth = ({ authRoute }) => {
  const authLoading = useSelector((state) => state.auth.authLoading);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  console.log(authLoading, isAuthenticated);
  let body;

  if (authLoading)
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner animation="border" variant="info" />
      </div>
    );
  else if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  else
    body = (
      <>
        {authRoute === "login" && <LoginForm />}
        {authRoute === "register" && <RegisterForm />}
      </>
    );

  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>LearnIt</h1>
          <h4>Keep track of what you are learning</h4>
          {body}
        </div>
      </div>
    </div>
  );
};

export default Auth;
