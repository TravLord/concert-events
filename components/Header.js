import styles from '../styles/Header.module.css' 
import Link from "next/link"

export default function Header() {
  return (
    <div>
        <header className={styles.header}>
            <div className={styles.logo}>

                <Link href='/'>
                    <a>Concert Events</a>
                </Link>
            </div>

            <nav>
                <ul>
                    <li> 
                        <Link href='/events'>
                            <a>Events</a>
                        </Link>
                    </li>
                </ul>
            </nav>


        </header>
    </div>
  )
}
