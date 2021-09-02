import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";
import { Spinner } from "react-bootstrap";

const AuthProvider = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [state, setState] = useState("loading");

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
      signOut();
    }
  };

  const signOut = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios({
        method: "get",
        url: "http://127.0.0.1:4000/logout",
        headers: { authorization: token },
      });
      clearLocalStorage();
    } catch (error) {
      console.log("signout error", error);
    }
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setState("success");
    setUser();
  };

  const getCurrentUser = async () => {
    console.log("get current user ");
    try {
      const token = localStorage.getItem("token");
      const res = await axios({
        method: "get",
        url: "http://127.0.0.1:4000/current-user",
        headers: { authorization: token },
      });
      console.log("res", res);
      if (res.data.message === "Access token has expired") {
        refreshToken(getCurrentUser);
      } else {
        setUser(res.data);
        setState("success");
      }
    } catch (error) {
      console.log("current user", error);
      clearLocalStorage();
    }
  };

  useEffect(() => {
    getCurrentUser();
    // eslint-disable-next-line
  }, []);

  if (state === "loading") {
    return (
      <div className="w-screen h-screen flex justify-center align-items-center">
        <Spinner data-testid="loading-spinner" size="xlg" animation="border" />
      </div>
    );
  }

  return (
    <AuthProvider.Provider value={{ user, setUser, signOut }}>
      {children}
    </AuthProvider.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = () => useContext(AuthProvider);
