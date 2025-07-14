import React from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div>
        <button ><Link to="/register"> Register Now</Link></button>
        <button><Link to="/login"> Login</Link></button>
        <button><Link to="/profile"> Create Profile</Link></button>
    </div>
  )
}

export default Home