
import { API_URL } from '@/config/index'

// only allow POST requests
export default async (req,res) => {
    if(req.method === 'POST') {
        const {identifier, password} = req.body

        
        const strapiRes = await fetch(`${API_URL}/auth/local`,
        { 
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            
            body:JSON.stringify({
                identifier,
                password
            })
        })
        
        
        const data = await strapiRes.json()

        if(strapiRes.ok) {
            //set the cookie | data is going to be the user and jwt
            res.status(200).json({user:data.user})
            
        } else {
            //else bad request send descriptive error message 
            res
            .status(data.statusCode)
            .json({message:data.message[0].messages[0].message})
        }
        
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).json({message: `Method ${req.method} not allowed`})
    }
}