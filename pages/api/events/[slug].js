const {events} = require('./data.json')    //common js syntax because this is running server side
                                          // we are serving the events (api) from data.json
                                          // then we are limiting the type of request coming in 
                                          // we only want get requests THIS [SLUG] IS FOR ACCESSING AN INDIVIDUAL ITEM
export default(req, res) => {
    const evt = events.filter(ev => ev.slug === req.query.slug)
  if(req.method ==='GET') {

  res.status(200).json(evt)
  }
  else
  {
    res.setHeader('Allow', ['GET']) //this sets the header for allow which is an array of allowed methods which is only GET request
    res.status(405).json({message: `Method ${req.method} is not allowed`})
  }
}