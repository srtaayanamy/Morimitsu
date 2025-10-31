import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token= localStorage.getItem('token');
  const navigate= useNavigate();

  useEffect(() => {
    if(token){
        setIsLoggedIn(true);
    }
  }, []);

  function logout() {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/Initial')
  }

  return { isLoggedIn, token: token, logout };
}
