import { useState } from "react";
import { createContext } from "react";
import { useRouter } from "next/router";
import { NEXT_URL } from "@/config/index";


const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const[user,setUser] = useState(null)
    const[error,setError] = useState(null)

    //Register user
    const register = async (user)=>{
        console.log({user})
    }

    //Login user email renamed to identifier as that is strapi's name for it
    const login = async ({email:identifier, password}) => {

        const res = await fetch(`${NEXT_URL}/api/login`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        
            body: JSON.stringify ({
                identifier,
                password,
            }),
        })
        const data = await res.json()
        console.log(data)

        if(res.ok){

        setUser(data.user)

        } else {

            setError(data.message)
            setError(null)
        }

        // console.log({identifier, password})
    }

    //Logout user
    const logout = async () => {
        console.log('Logout');
    }
    

    //Check if user is logged in
    const checkUserLoggedIn = async (user) => {
        console.log('Check');
    }

// this provider takes in value of an object with these values children is our app
    return (
        <AuthContext.Provider value={{user, error, register, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext