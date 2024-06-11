import { SessionProps } from "@/types/auth/auth"
import { useLocalStorage } from "@reactuses/core"
import { ReactNode, createContext, useContext } from "react"

interface AuthContextProps {
    session: {
        status: string
        data: SessionProps
    }
    setSessionStorage: React.Dispatch<React.SetStateAction<null | string>>;
}

interface AuthContextProviderProps {
    children: ReactNode
}

const InitialSessionValue: AuthContextProps = {
    session: {
        status: 'unauthenticated',
        data: {
            token: "",
            expires_at: 0,
            user_info: {
                username: "",
                status: false
            }
        }
    },
    setSessionStorage: () => { }
}

const AuthContext = createContext<AuthContextProps | null>(null)

const useAuthContext = () => {
    const contex = useContext(AuthContext)
    if (!contex) throw "Must be under the Auth Provider"
    return contex
}

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