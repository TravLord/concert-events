import { toast, ToastContainer } from 'react-toastify'
  import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import styles from '@/styles/Form.module.css'
import { parseCookies } from '@/helpers/index'


export default function AddEventPage({token}) {
const [values, setValues] = useState({   //setting our state values to empty strings initially
  name:'',
  performers:'',
  venue:'',
  address:'',
  date:'',
  time:'',
  description:''
  
})
const handleSubmit = async (e) => {
  e.preventDefault()
  // console.log(values);  check to make sure we have the object before additonal logic
  //Validation     //looking at object values of values object checking each element to see if it is an empty string if true then hasEmptyfields true
const hasEmptyFields = Object.values(values).some((element) => element === '')
if(hasEmptyFields) {
  toast.error('Please fill in all fields')  //toastify module for displaying error messagef
}
const res = await fetch(`${API_URL}/events`, {  //making request to post our created event
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  },
  body:JSON.stringify(values) //

})

if(!res.ok) {  //if response is not ok error message
  if(res.status === 403 || res.status === 401) {
    toast.error('No token included')
    return
  }
  toast.error('Something went wrong')

} else {
  const evt = await res.json() // getting data stored in evt
  router.push(`/events/${evt.slug}`) //redirect to the created event
}


}

const handleInputChange=(e) => {
  const { name,value} = e.target  // we want the name and the value of the the event target
  setValues({...values, [name]:value})  //copy the values that are already there, take the name and change that value to the input feild target value
}

const router = useRouter()

  return (
    <Layout title='Add New Event'>
      <Link href='/events'>Go Back</Link>
        <h1>Add Events</h1>
        <ToastContainer/>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.grid}>
            <div>
              <label htmlFor='name'>Event Name</label>
              <input 
              type='text' 
              id='name'
              name='name'
              value={values.name}
              onChange={handleInputChange}/>
            </div>
            <div>
              <label htmlFor='performers'>Performers</label>
              <input 
              type='text' 
              id='performers'
              name='performers'
              value={values.performers}
              onChange={handleInputChange}/>
            </div>
            <div>
              <label htmlFor='venue'>Venue</label>
              <input 
              type='text' 
              id='venue'
              name='venue'
              value={values.venue}
              onChange={handleInputChange}/>
            </div>
            <div>
              <label htmlFor='address'>Address</label>
              <input 
              type='text' 
              id='address'
              name='address'
              value={values.address}
              onChange={handleInputChange}/>
            </div>
            <div>
              <label htmlFor='date'>Date</label>
              <input 
              type='date'   //this is required to show the date picker calendar
              id='date'
              name='date'
              value={values.date}
              onChange={handleInputChange}/>
            </div>
            <div>
              <label htmlFor='time'>Time</label>
              <input 
              type='text' 
              id='time'
              name='time'
              value={values.time}
              onChange={handleInputChange}/>
            </div>
          </div>
          <div>
              <label htmlFor='description'>Description</label>
              <textarea 
              type='text' 
              id='description'
              name='description'
              value={values.description}
              onChange={handleInputChange}
              ></textarea>
            </div>   
            <input className='btn'
            type='submit' value='submit'/> 
        </form>
    </Layout>
  )
}


export async function getServerSideProps({req}) {
  const {token} = parseCookies(req)

  return {
    props: {
      token
    }
  }
}
