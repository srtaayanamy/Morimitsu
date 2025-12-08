import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./services/routes";
import { IsLogedProvider } from "./contexts/Auth";

export default function App(){
  return(
    <BrowserRouter>
      <IsLogedProvider>
        <AppRoutes />
      </IsLogedProvider>
    </BrowserRouter>
  );
}