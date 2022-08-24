
import { FaUser } from "react-icons/fa"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState, useEffect, useContext } from 'react'
import Link from "next/link"
import Layout from "@/components/Layout"
import styles from '@/styles/AuthForm.module.css'
import AuthContext from '@/context/AuthContext'


export default function RegisterPage() {
const [email,setEmail]= useState('')
const [username,setUserName] = useState('')
const [password,setPassword] = useState('')
const [passwordConfirm, setPasswordConfirm] =useState('')

const {error, register} = useContext(AuthContext)

useEffect(() => {error && toast.error(error)})

const handleSubmit = e => {
    e.preventDefault()
    if(password !== passwordConfirm) {
        toast.error('Passwords do not match')
        return 
    }

    register({username, email, password})
}

  return (
    <Layout title='User Login'>
      <div className={styles.auth}>
        <h1>
            <FaUser/> Register
        </h1>
        <ToastContainer/>
        <form onSubmit={handleSubmit}>
        <div>
                <label htmlFor="username">Username</label>
                <input 
                type='text' 
                id='username'
                value={username}
                onChange={(e)=> setUserName(e.target.value)} //sets email to the target value (whatever is typed in)
                />
            </div>
            <div>
                <label htmlFor="email">Email Address</label>
                <input 
                type='email' 
                id='email'
                value={email}
                onChange={(e)=> setEmail(e.target.value)} //sets email to the target value (whatever is typed in)
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input 
                type='password' 
                id='password'
                value={password}
                onChange={(e)=> setPassword(e.target.value)} //sets password to the target value (whatever is typed in)
                />
            </div>
            <div>
                <label htmlFor="passwordConfirm">Confirm Password</label>
                <input 
                type='password' 
                id='passwordConfirm'
                value={passwordConfirm}
                onChange={(e)=> setPasswordConfirm(e.target.value)} //sets password to the target value (whatever is typed in)
                />
            </div>
            <input type='submit' value='Register' className='btn'/>
        </form>

        <p>
           Already have an account? <Link href='/account/login'>Login</Link> 
        </p>
      </div>

    </Layout>
  )
}


