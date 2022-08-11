import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"  //with module aliases you have to explictly add index 
import EventItem from "@/components/EventItem"
export default function EventsPage({events}) {
  // console.log(events) test we're getting our events devTools
  return (
  <Layout>
    {events.length === 0 && <h3>No Events To Show</h3>} 
      <h1>Events</h1>
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt}/>
      ))}
  </Layout>  
    
  )
}

  export async function getStaticProps() {
    const res = await fetch(`${API_URL}/api/events`)
    const events = await res.json()

    // console.log(events)  this runs serverside so it will log in our terminal (server)

    return {
      props: {events},   //this is how we pass the events into the client side component //from the fetch 
      revalidate: 1,     //since the static props are fetched at build time this revaildate option
                        // makes a request again if it can't find it only if data is changed     
    }
                       
  
  }


