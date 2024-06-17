import { ReactNode, createContext, useContext } from "react";
import { useLocalStorage } from "@reactuses/core";

type Status = "loading" | "authenticated" | "unauthenticated";

interface SessionProps {
  token: string;
  expired_at: number;
  user_info: {
    id: string
    username: string
    role: string
  };
}

interface AuthContextProps {
  session: {
    status: Status;
    data: SessionProps;
  };
  setSessionStorage: React.Dispatch<React.SetStateAction<null | string>>;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

const InitialSessionValue: AuthContextProps = {
  session: {
    status: "unauthenticated",
    data: {
      token: "",
      expired_at: 0,
      user_info: {
        id: '',
        username: '',
        role: ''
      }
    }
  },
  setSessionStorage: () => { },
};

const AuthContext = createContext<AuthContextProps | null>(null);

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw "Must be under the Auth Provider";
  return context;
};

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [SESSION, setSessionStorage] = useLocalStorage("jasamarga", JSON.stringify(InitialSessionValue.session));

  const session = SESSION ? JSON.parse(SESSION) : InitialSessionValue.session;

  return (
    <AuthContext.Provider value={{ session, setSessionStorage }}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuthContext, AuthContextProvider };