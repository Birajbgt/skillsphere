import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
      <section className='page notfound'>
        <div className="content">
          <Link to={'/'}>RETURN TO HOME PAGE</Link>
          <img src="/notfound.png" alt="notfound" />
        </div>
      </section>
    </>
  )
}

export default NotFound
