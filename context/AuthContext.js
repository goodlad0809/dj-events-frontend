import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { API_URL, NEXT_URL } from "@/config/index";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => checkUserLoggedIn(), []);
  
  // Register User
  const register = async (user) => {
    console.log("register", user);

    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();
    console.log(data);
    if (res.ok) {
      setUser(data.user);
      console.log("AuthContext", data);
      router.push("/account/dashboard");
    } else {
      setError(data.message);
      setError(null);
    }
  };
  // Login User
  const login = async ({ email: identifier, password }) => {
    console.log("Login", { identifier, password });
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    const data = await res.json();
    console.log(data);
    if (res.ok) {
      setUser(data.user);
      console.log("AuthContext", data);
      router.push("/account/dashboard");
    } else {
      setError(data.message);
      setError(null);
    }
  };
  // Logout User
  const logout = async () => {
    console.log("Logout");
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: "POST",
    });

    if (res.ok) {
      setUser(null);
      router.push("/");
    }
  };
  // Check if user logon
  const checkUserLoggedIn = async () => {
    console.log("Check Logon");

    const res = await fetch(`${NEXT_URL}/api/user`);

    const data = await res.json();
    console.log(data);
    if (res.ok) {
      setUser(data.user);
      console.log("checkUserLoggedIn OK", data);
    } else {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;