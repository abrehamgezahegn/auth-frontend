import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

const AuthProvider = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const refreshToken = async (callback) => {
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      const res = await axios({
        method: "post",
        url: "http://127.0.0.1:4000/refresh-access-token",
        data: {
          token: refreshToken,
        },
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      setTimeout(() => {
        callback();
      });
    } catch (error) {
      console.log("refresh token", error);
      // window.location = "localhost:3000/signup";
    }
  };

  const getCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios({
        method: "get",
        url: "http://127.0.0.1:4000/current-user",
        headers: { authorization: token },
      });
      if (res.data.message === "Access token has expired") {
        refreshToken(getCurrentUser);
      } else {
        setUser(res.data);
      }
    } catch (error) {
      console.log("current user", error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <AuthProvider.Provider value={{ user, setUser }}>
      {children}
    </AuthProvider.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = () => useContext(AuthProvider);
