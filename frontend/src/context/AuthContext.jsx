import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext();



export const AuthProvider = ({ children }) => {


    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);



    // Load user when application starts

    useEffect(() => {


        const savedUser = localStorage.getItem("user");


        if (savedUser) {

            setUser(JSON.parse(savedUser));

        }


        setLoading(false);


    }, []);




    // Login Function

    const login = (userData, token) => {


        localStorage.setItem(
            "token",
            token
        );


        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );


        setUser(userData);


    };




    // Logout Function

    const logout = () => {


        localStorage.removeItem("token");


        localStorage.removeItem("user");


        setUser(null);


    };





    return (

        <AuthContext.Provider

            value={{
                user,
                login,
                logout,
                loading
            }}

        >

            {children}

        </AuthContext.Provider>

    );


};





export const useAuth = () => {

    return useContext(AuthContext);

};