import Link from "next/link"
import { PER_PAGE } from "../config"
export default function Pagination({page,total}) {
    const lastPage = Math.ceil(total / PER_PAGE) //total amount of events divided by allowed amount of events per page rounded up to highest num
  return (
    <>
        
      {page > 1 && (
        <Link href={`/events?page=${page - 1}`}>
          <a className='btn-secondary'>Prev</a>
        </Link>     
      )}

{page < lastPage && (
        <Link href={`/events?page=${page + 1}`}>
          <a className='btn-secondary'>Next</a>
        </Link>     
      )}
        
    </>
  )
}
