import Head from "next/head"
import {useRouter} from "next/router"
import Styles from '@/styles/Layout.module.css'
import Header from "./Header"
import Footer from "./Footer"
import Showcase from "./Showcase"
export default function Layout({title, keywords, description, children}) {

  const router = useRouter()  //Here we are defining the router then we encap showcase
                              // if the path is index then show the Showcase background img
  return (
    <div>
        <Head>
            <title>{title}</title>
            <meta name="description" content={description}></meta>
            <meta name="keywords" content={keywords}></meta>
        </Head>

        <Header/>
        
        {router.pathname === '/' && <Showcase/>} {/*if the path is index then show the shwCs component */}
        <div className={Styles.container}>
        {children}
        </div>
        <Footer/>
    </div>
  )
}

Layout.defaultProps = {
    title:'Concert Events | Find your favorite concert',
    description:'Find the event schedule the concert',
    keywords:'music, concerts, edm, rap, alternative, indy',
}
