import styles from '@/styles/Modal.module.css'
import { useState, useEffect } from 'react'
import  ReactDOM  from 'react-dom'
import { FaTimes } from 'react-icons/fa'

export default function Modal({show, onClose, children, title}) {
const [isBrowser, setIsBrowser] = useState(false) // this will allow us to control the rendering of the modal and give us access the window object

useEffect(() => setIsBrowser(true)) //page rendered state true once this page is opened 

const handleClose = (e) => {
    e.preventDefault()
    onClose()
}
// if show true then show the modal else null
//check for title then the body holds content of children
const modalContent = show ? (
    <div className={styles.overlay}>
        <div className={styles.modal}>
            <div className={styles.header}>
                <a href='#' onClick={handleClose}>
                    <FaTimes/>
                </a>
            </div>
            
            {title && <div>{title}</div>}
            <div className={styles.body}>{children}</div>
        </div>

    </div>
) : null

//if state true then window document object is available to us, arguments are what you are inserting and other argument is location to insert content
if (isBrowser){
    return ReactDOM.createPortal(modalContent, document.getElementById('modal-root'))
} else {
    return null
}
}
