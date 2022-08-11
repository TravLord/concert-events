import Link from 'next/link'
import styles from '@/styles/Footer.module.css'
import React from 'react'

export default function Footer() {
  return (
    <div>
        <footer className={styles.footer}>
            <p>Copyright &copy; Concert Events 2022</p>
            <p>
                <Link href='/about'>About this Project</Link>
                
            </p>
        </footer>
    </div>
  )
}
