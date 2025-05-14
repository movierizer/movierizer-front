import React, { createContext, useContext, useState, useEffect, useMemo } from 'react'
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setTheToken] = useState(localStorage.getItem("token"));

    const setToken = (newToken) => {
        setTheToken(newToken);
    };

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            localStorage.setItem('token',token);
        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem('token')
        }
    }, [token]);
    
    const contextValue = useMemo(
        () => ({
          token,
          setToken,
        }),[token]
    );

    return (
        <AuthContext.Provider value={contextValue}>
          {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
  
export default AuthProvider;
  
      

