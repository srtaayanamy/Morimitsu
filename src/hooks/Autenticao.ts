import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { isLogedContext } from "../contexts/Auth";

export function useAuth() {
  
  const {setIsLoged } = useContext(isLogedContext);
  const token= localStorage.getItem('token');
  const navigate= useNavigate();

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoged(false);
    navigate('/')
  }

  return { token: token, logout };
}
