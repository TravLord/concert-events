import Head from "next/dist/shared/lib/head"
import Styles from '../styles/Layout.module.css'
import Header from "./Header"
import Footer from "./Footer"
export default function Layout({title, keywords, description, children}) {
  return (
    <div>
        <Head>
            <title>{title}</title>
            <meta name="description" content={description}></meta>
            <meta name="keywords" content={keywords}></meta>
        </Head>

        <Header/>
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
