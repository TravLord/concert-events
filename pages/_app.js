import '../styles/globals.css'
import { AuthProvider } from '@/context/AuthContext'
// Wrapping App in AuthProvider for Authentication boundaries
function MyApp({ Component, pageProps }) {
  return (
  <AuthProvider>
    <Component {...pageProps} />    
    </AuthProvider>
  )
}

export default MyApp
