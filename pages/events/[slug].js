import { useRouter } from 'next/router'
import styles from '@/styles/Event.module.css'
import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"
import Link from 'next/link'
import Image from 'next/image'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import EventMap from "@/components/EventMap"


export default function EventPage({evt}) {
  const router = useRouter()
  
  return (
 <Layout>
    <div className={styles.event}>
     
      <span>
      {new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}

      </span>
      <h1>{evt.name}</h1>
      <ToastContainer/>
      {evt.image && (
        <div className={styles.image}>
          <Image src={evt.image.formats.medium.url} width={960}
          height={600}/>        
          </div>

      )}
      <h3>Performers:</h3>
      <p>{evt.performers}</p>
      <h3>Description:</h3>
      <p>{evt.description}</p>
      <h3>Venue: {evt.venue}</h3>
      <p>{evt.address}</p>

      <EventMap evt={evt}/>
      <Link href='/events'>
        <a className={styles.back}>{'<'} Go Back
        </a>
      </Link>
    </div>
 </Layout>
  )
}

// export async function getServerSideProps({query:{slug}}) {
// const res = await fetch (`${API_URL}/api/events/${slug}`)
// const events = await res.json()

//   return {
//     props: {
//       evt: events[0]
//     },
//   }
// }
export async function getStaticPaths(){              //for static website looks at data in URL
 const res = await fetch(`${API_URL}/events`)       //creates all paths using slug
 const events = await res.json()                    //passed to getStaticPaths then it will
                                                    //generate all the pages

 const paths = events.map(evt => ({
  params: {slug: evt.slug}
 }))
  return {
    paths,
    fallback: true,  //if resource isn't found when true a new request will be made to locate data
  }
}

export async function getStaticProps({params:{slug}}) {
  const res = await fetch (`${API_URL}/events?slug=${slug}`)
  const events = await res.json()
  
    return {
      props: {
        evt: events[0]  //we want the first element
      },
      revalidate:1  //checks if data is changed if so new request sent to update
    }
  }
