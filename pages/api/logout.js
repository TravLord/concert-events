import cookie from 'cookie'
import { API_URL } from '@/config/index'
//Getting a user associated with token
// hit a strapi endpoint of users/me, send token give you back user for that token then in auth context set user then we'll have access to links as user will persist
export default async (req,res) => {
    if(req.method === 'POST') {
        //Destroy cookie
        res.setHeader('Set-Cookie', cookie.serialize('token','', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',  //needs to be https if not development environment
            expires: new Date(0),  // a date that has already passed
            sameSite: 'strict',
            path:'/'
           })
        )

     res.status(200).json({message: 'Success'})
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).json({message: `Method ${req.method} not allowed`})
    }
}