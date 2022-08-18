import moment from 'moment'
import { FaImage } from 'react-icons/fa'
import { toast, ToastContainer } from 'react-toastify'
  import 'react-toastify/dist/ReactToastify.css'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import styles from '@/styles/Form.module.css'
import Image from 'next/image'
import Modal from '@/components/Modal'
import ImageUpload from '@/components/ImageUpload'


export default function EditEventPage({evt}) {
const [values, setValues] = useState({   //setting our state values to empty strings initially
  name: evt.name,
  performers: evt.performers,
  venue: evt.venue,
  address: evt.address,
  date: evt.date,
  time: evt.time,
  description: evt.description
  
})
const [imagePreview, setImagePreview] = useState( evt.image ? evt.image.formats.thumbnail.url : null)
const [showModal, setShowModal] = useState(false)

const router = useRouter()

const handleSubmit = async (e) => {
  e.preventDefault()
  // console.log(values);  check to make sure we have the object before additonal logic
  //Validation     //looking at object values of values object checking each element (some) to see if it is an empty string 
const hasEmptyFields = Object.values(values).some((element) => element === '') // returns true if feild empty
if(hasEmptyFields) {
  toast.error('Please fill in all fields')  //toastify module for displaying error messagef
}
const res = await fetch(`${API_URL}/events/${evt.id}`, {  //making request to post our edited event
  method: 'PUT', //PUT REQUEST FOR UPDATE
  headers: {
    'Content-Type': 'application/json'   
  },
  body:JSON.stringify(values) //

})

if(!res.ok) {  //if response is not ok error message
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

const imageUploaded = async (e) => {
  const res = await fetch(`${API_URL}/events/${evt.id}`) //associate with specific id and fetch
  const data = await res.json()
  setImagePreview(data.image.formats.thumbnail.url) //set the preview image to display
  setShowModal(false) //hide the modal after upload complete
}



  return (
    <Layout title='Add New Event'>
      <Link href='/events'>Go Back</Link>
        <h1>Edit Event</h1>
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
              value={moment(values.date).format('yyyy-MM-YY')}  // moment date formater module to convert date format to display
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
            type='submit' value='Update Event'/> 
        </form>

        <h2>Event Image</h2> {/* if there is an img and not null display image else no img upld */}
        {imagePreview ? (       
        <Image src={imagePreview} height={100} width={170}/>
        ) : (
            <div>
                <p>No Image Uploaded</p>
            </div>

        )}

        <div>
            <button onClick={setShowModal} className='btn-secondary btn-icon'>
                <FaImage/> Set Image
            </button>
        </div>
        <Modal show={showModal} onClose={()=> setShowModal(false)}>
            <ImageUpload evtId={evt.id} imageUploaded={imageUploaded}/>
        </Modal>
    </Layout>
  )
}

export async function getServerSideProps({params:{id}, req}) {  //destructure context obj for params then destructure params for id 
    const res = await fetch(`${API_URL}/events/${id}`)
    const evt = await res.json()

    // console.log(req.headers.cookie) showing we can pass in the req obj with cookie attached

    return {
        props: {
            evt
        }
    }
}

