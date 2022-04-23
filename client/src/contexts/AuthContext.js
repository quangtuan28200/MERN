import axios from "axios";
import { createContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import AuthSlice from "../components/auth/AuthSlice";
import setAuthToken from "../utils/setAuthToken";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  // Authenticate user
  const loadUser = () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }

    axios
      .get(`${apiUrl}/auth`)
      .then(function (response) {
        if (response.data.success) {
          dispatch(
            AuthSlice.actions.setAuth({
              isAuthenticated: true,
              user: response.data.user,
            })
          );
        }
        console.log(response.data);
      })
      .catch(function (error) {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
        setAuthToken(null);

        dispatch(
          AuthSlice.actions.setAuth({
            isAuthenticated: false,
            user: null,
          })
        );
      });
  };

  useEffect(() => loadUser(), []);

  // Login
  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, userForm);
      if (response.data.success)
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );

      await loadUser();

      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Register
  const registerUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, userForm);
      if (response.data.success)
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );

      await loadUser();

      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Logout
  const logoutUser = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    dispatch(
      AuthSlice.actions.setAuth({
        isAuthenticated: false,
        user: null,
      })
    );
  };

  // Context data
  const authContextData = { loginUser, registerUser, logoutUser };

  // Return provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
