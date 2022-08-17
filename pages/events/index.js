import Layout from "@/components/Layout"
import Pagination from "@/components/Pagination"
import { API_URL, PER_PAGE } from "@/config/index"  //with module aliases you have to explictly add index 
import EventItem from "@/components/EventItem"



export default function EventsPage({events, page, total}) {
  // console.log(events) test we're getting our events devTools

 
  return (
  <Layout>
    {events.length === 0 && <h3>No Events To Show</h3>} 
      <h1>Events</h1>
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt}/>
      ))}
    <Pagination page={page} total={total}/>
  </Layout>  
    
  )
}

  export async function getServerSideProps({query:{page=1}}) {
//CALCULATE START PAGE + changes string to num if equal to page one then start at beginning (0) of entries else take current page num minus one and multiply by 
const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE
      //Fetch total/count
      const totalRes = await fetch(`${API_URL}/events/count`)  //total amount of events in res
      const total = await totalRes.json()

    //Fetch events
    const eventRes = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`)  //after events this sorts the dates in ascending order to the ui
    const events = await eventRes.json()

    // console.log(events)  this runs serverside so it will log in our terminal (server)

    return {
      props: {events, page:+page, total},    //passing total/count as prop to component
      //this is how we pass the events into the client side component //from the fetch 
      // revalidate: 1,     //since the static props are fetched at build time this revaildate option
                        // makes a request again only if data is changed.   
    }
                       
  
  }


