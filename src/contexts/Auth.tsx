import { createContext, useState } from "react";

type AuthContextType = {
  isLoged: boolean;
  setIsLoged: (value: boolean) => void;
};

export const isLogedContext = createContext<AuthContextType>({
  isLoged: false,
  setIsLoged: () => {}
});

export function IsLogedProvider({ children }: { children: React.ReactNode }) {
  const [isLoged, setIsLoged] = useState(false);

  return (
    <isLogedContext.Provider value={{ isLoged, setIsLoged }}>
      {children}
    </isLogedContext.Provider>
  );
}