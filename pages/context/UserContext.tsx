import { createContext ,useContext } from "react";

interface CurrentUserContextType {
  username: string;
}

const CurrentUserContext = createContext<CurrentUserContextType | null>(null);

const useCurrentUser = () => {
    const currentUserContext = useContext(CurrentUserContext);
  
    if (!currentUserContext) {
      throw new Error(
        "useCurrentUser has to be used within <CurrentUserContext.Provider>"
      );
    }
  
    return currentUserContext;
  };