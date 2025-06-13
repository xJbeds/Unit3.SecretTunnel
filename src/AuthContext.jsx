import { createContext, useContext, useState } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");
  const [userNameInput, setUserNameInput] = useState(``);

  // TODO: signup

  const signup = async (username) => {
    const response = await fetch(
      `https://fsa-jwt-practice.herokuapp.com/signup`,
      {
        method: `POST`,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
        }),
      }
    );
    if (!response.ok) {
      return new Error("Unable to add that username");
    }

    const responseJsonObj = await response.json();
    setToken = responseJsonObj.token;
    setLocation("TABLET");
  };
  // TODO: authenticate
  const authenticate = () => {
    if (!token) {
      throw Error("No Token");
    }
  };

  const value = { location, signup, authenticate };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
