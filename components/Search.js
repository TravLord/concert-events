import styles from '@/styles/search.module.css'
import { Router, useRouter } from 'next/router'
import {useState} from 'react'

export default function Search() {
    const [term,setTerm] = useState('')

    const router = useRouter()

    const handleSubmit= (e) => {
        e.preventDefault()
        router.push(`/events/search?term=${term}`) //this redirects us to the search items detail page
        setTerm('') //clearing the term after search

    }

  return (
    <div className={styles.search}>
        <form onSubmit= {handleSubmit}>
            <input 
            type='text'
            value={term}
            onChange= {(e) => setTerm(e.target.value)}
            placeholder='Search Events'>

            </input>
        </form>
    </div>
  )
}
