import { useState } from "react"
import { API_URL } from "@/config/index"
import styles from '@/styles/Form.module.css'
export default function ImageUpload({evtId,imageUploaded,token}) {
  const [image, setImage] = useState(null)

  const handleSubmit = async (e) =>{
    e.preventDefault()
    const formData = new FormData() // create form data object
    formData.append('files', image) // upload form data appending files to our form data obj appending image in our state
    formData.append('ref', 'events') //conncect to events ref=collection we want to use (events)
    formData.append('refId', evtId) // refId is event Id
    formData.append('field', 'image') // we called our image feild image

    //with strapi the path is upload to upload something 
    const res = await fetch(`${API_URL}/upload`, {
      method:'POST',
      headers:{ 
        Authorization: `Bearer ${token}`
    },
      body:formData
    })

    if(res.ok) {
      imageUploaded()

    }
    else {
      console.log("error upload not completed ")
    }
  }
  //
  const handleFileChange =(e)=>{
    setImage(e.target.files[0])  //set to state
  }
  return (
    <div className={styles.form}>
      <h1>Upload Event Image</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type='file' onChange={handleFileChange}/>
        </div>
        <input type='submit' value='Upload' className='btn'/>
      </form>
       
    </div>
  )
}
