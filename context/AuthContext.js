
import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { API_URL, NEXT_URL } from "@/config/index";


const AuthContext = createContext()


export const AuthProvider = ({children}) => {
    const[user,setUser] = useState(null)
    const[error,setError] = useState(null)

    const router = useRouter()
    useEffect(()=> {checkUserLoggedIn()}, []) // empty dependency array for ran at each reload
   
    //Register user
    const register = async (user)=>{
        // console.log({user})
        const res = await fetch(`${NEXT_URL}/api/register`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            
                body: JSON.stringify (user),
            })
            const data = await res.json()
            console.log(data)
    
            if(res.ok){
    
            setUser(data.user)
            router.push('/account/dashboard')
            } else {
                //data message sent from login
                setError(data.message)
                setError(null)
            }
    
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
                password
            })
        })
        const data = await res.json()
        console.log(data)

        if(res.ok){

        setUser(data.user)
        router.push('/account/dashboard')
        } else {
            //data message sent from login
            setError(data.message)
            setError(null)
        }

        // console.log({identifier, password})
    }

    //Logout user
    const logout = async () => {
        // console.log('Logout');
        const res = await fetch(`${NEXT_URL}/api/logout`, {
            method:'POST',
        })

        if (res.ok) {
            setUser(null)
            router.push('/')
        }
    }
    

    //Check if user is logged in
    const checkUserLoggedIn = async (user) => {
        const res = await fetch(`${NEXT_URL}/api/user`)
        const data = await res.json()

        //should have user in data response called about in useEffect
        if(res.ok) {
            setUser(data.user)
        } else {
            setUser(null)
        }
    }

// this provider takes in value of an object with these values children is our app
    return (
        <AuthContext.Provider value={{user, error, register, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext