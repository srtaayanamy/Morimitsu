import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { isLogedContext } from "../contexts/Auth";
import Cookies from "js-cookie";

export function useAuth() {
  
  const {setIsLoged } = useContext(isLogedContext);
  const navigate= useNavigate();

  function logout() {
    Cookies.remove("token");
    Cookies.remove('role');
    setIsLoged(false);
    navigate('/')
  }

  return {  logout };
}