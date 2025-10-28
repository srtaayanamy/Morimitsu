import { useEffect, useState } from "react";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token= localStorage.getItem('token');

  useEffect(() => {
    if(token){
        setIsLoggedIn(true);
    }
  }, []);

  function logout() {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  }

  return { isLoggedIn, token: token, logout };
}
