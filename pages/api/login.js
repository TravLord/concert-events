import cookie from 'cookie'
import { API_URL } from '@/config/index'

// only allow POST requests
export default async (req,res) => {
    if(req.method === 'POST') {
        const {identifier, password} = req.body

        //we will get our strapi cookie from calling this endpoint
        const strapiRes = await fetch(`${API_URL}/auth/local`,
        { 
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            //pass in obj with identifier and pw
            body:JSON.stringify({
                identifier,
                password
            })
        })
        
        
        const data = await strapiRes.json()

        console.log(data.jwt) // contains cookie
        if(strapiRes.ok) {
           //set the cookie name token coming from data.jwt | send back user data is going to be the user and jwt
           res.setHeader('Set-Cookie', cookie.serialize('token',data.jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',  //needs to be https if not development environment
            maxAge: 60*60*24*7, //1 week
            sameSite: 'strict',
            path:'/'
           }))
            res.status(200).json({user:data.user})
            
        } else {
            //else bad request send descriptive error message accessed 
            res
            .status(data.statusCode)
            .json({message:data.message[0].messages[0].message})
        }
        
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).json({message: `Method ${req.method} not allowed`})
    }
}