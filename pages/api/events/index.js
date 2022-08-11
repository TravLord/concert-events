// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const {events} = require('./data.json')    //common js syntax because this is running server side
                                          // we are serving the events(api EP) from data.json
                                          // then we are limiting the type of request coming in 
                                          // we only want get requests
export default function handler(req, res) {
  if(req.method ==='GET') {

  res.status(200).json(events)
  }
  else
  {
    res.setHeader('Allow', ['GET']) //this sets the header for allow which is an array of allowed methods which is only GET request
    res.status(405).json({message: `Method ${req.method} is not allowed`})
  }
}