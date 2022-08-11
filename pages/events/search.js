import Link from 'next/link'
import { useRouter } from 'next/router'
import qs from 'qs'
import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"  //with module aliases you have to explictly add index 
import EventItem from "@/components/EventItem"
export default function SearchPage({events}) {
  // console.log(events) test we're getting our events devTools
    const router = useRouter()

  return (
  <Layout title='Search Results'>
    {events.length === 0 && <h3>No Events To Show</h3>} 
    <Link href='/events'>Go Back</Link>
      <h1>Search Results {router.query.term}</h1>
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt}/>
      ))}
  </Layout>  
    
  )
}

  export async function getServerSideProps({query:{term}}) {  //we don't know what people will search for so we can't generate all the paths // using serverSideProps we can generate it with each request instead of getStaticProps which generates at build time.
    const query = qs.stringify({
        _where: {
            _or: [
                {name_contains:term},
                {performers_contains:term},
                {description_contains:term},
                {venue_contains:term}
            ]
        }
    })
    const res = await fetch(`${API_URL}/events?${query}`)  //search criteria (any word in the name sentence)
    const events = await res.json()

    // console.log(events)  this runs serverside so it will log in our terminal (server)

    return {
      props: {events}  //this is how we pass the events into the client side component //from the fetch 
              
    }
                       
  
  }