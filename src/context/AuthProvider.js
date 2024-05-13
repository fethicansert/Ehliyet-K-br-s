import React, { createContext, useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import useRefresh from '../hooks/useRefresh';
export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});
    
    
    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
