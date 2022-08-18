import cookie from 'cookie'
import { API_URL } from '@/config/index'
//Getting a user associated with token
// hit a strapi endpoint of users/me, send token give you back user for that token then in auth context set user then we'll have access to links as user will persist
export default async (req,res) => {
    if(req.method === 'GET') {

      if(!req.headers.cookie) // this is how we get the cookie stored in headers
      {
        res.status(403).json({message:'Not Authorized'})
        return
      }  
 
 const {token} = cookie.parse(req.headers.cookie)   // if found parse the cookie and destructure/extract the token pass it in
 
 //sending token variable to strapi to get our user back 
 const strapiRes = await fetch(`${API_URL}/users/me`, {
    method:'GET',
    headers: {
        Authorization: `Bearer ${token}`
        }
    })

    //we should have our user in strapi res if no errors
    if(strapiRes.ok) {
        res.status(200).json({user})
    } else {
        res.status(403).json({message: 'User Forbidden'})
    }
    } else {
        res.setHeader('Allow', ['GET'])
        res.status(405).json({message: `Method ${req.method} not allowed`})
    }
}