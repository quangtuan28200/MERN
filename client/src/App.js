import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import Auth from "./views/Auth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Auth authRoute="login" />} />
        <Route path="/register" element={<Auth authRoute="register" />} />
        <Route path="/*" element={<ProtectedRoute />} />
      </Routes>
    </Router>
  );
}

export default App;
