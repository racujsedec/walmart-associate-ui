import React,{createContext,useContext} from 'react';
// This fixed token is accepted ONLY when DEMO_MODE=true on the local API.
const AuthContext=createContext({token:'local-associate-token'});
export function AuthProvider({children}:{children:React.ReactNode}){return <AuthContext.Provider value={{token:'local-associate-token'}}>{children}</AuthContext.Provider>}
export function useAuth(){return useContext(AuthContext)}
