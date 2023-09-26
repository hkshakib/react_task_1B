import React, { useReducer } from "react";
import MkdSDK from "./utils/MkdSDK";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: localStorage.getItem("isAuthenticated"),
  user: null,
  token: null,
  role: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      try {
        const { email, password, role } = action.payload;
        const sdk = new MkdSDK();
        sdk.login(email, password, role);
        localStorage.setItem("isAuthenticated", true);
        return {
          ...state,
          isAuthenticated: true,
          role,
          token: localStorage.getItem("token"),
        };
      } catch (error) {
        console.error("Error logging in:", error);
        return state;
      }
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

let sdk = new MkdSDK();

export const tokenExpireError = (dispatch, errorMessage) => {
  const role = localStorage.getItem("role");
  if (errorMessage === "TOKEN_EXPIRED") {
    dispatch({
      type: "Logout",
    });
    window.location.href = "/" + role + "/login";
  }
};

const validateToken = (expireTime) => {
  const tokenExpirationTime = expireTime * 1000; // Convert seconds to milliseconds
  const currentTime = Date.now();

  return currentTime < tokenExpirationTime;
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      const isValidToken = validateToken(token);

      if (isValidToken) {
        dispatch({
          type: "LOGIN",
          payload: {
            email: "",
            password: "",
            role,
          },
        });
      } else {
        dispatch({
          type: "LOGOUT",
        });
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
