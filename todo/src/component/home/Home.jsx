import React, { useState } from 'react'
import './Home.css'
import { Link } from 'react-router-dom';
function Home() {
  const [user,setUser]= useState(JSON.parse(localStorage.getItem('user'))||{
    FirstName:"",
    LastName:"",
   
  })


  const handleClear=()=>{
    localStorage.setItem('user',null);
    setUser({
      FirstName:"",
      LastName:"",
     
    })
  }
  return (
    <div className='container'>
      <h2>Welcome to </h2>
      <span>{user.FirstName} </span>
      <span>{user.LastName}</span>
      <br />


      <button onClick={handleClear}>clear...</button>
      <Link to={'/contact'}  >
        Go to Contact page
      </Link>
    </div>
  )
}

export default Home
