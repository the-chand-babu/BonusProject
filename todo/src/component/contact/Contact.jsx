import React, { useState } from 'react'
import Joi from 'joi'
import './Contact.css'
import { Link } from 'react-router-dom'
function Contact() {
  const [user,setUser]= useState({
    FirstName:"",
    LastName:"",
    Email:"",
    Phone:""
  })

  const [error,setError] =useState("")
  const handleChange=(e)=>{
    const {name,value}=e.target;
   setUser({
    ...user,[name]:value
   })
   
   
  }
  

  const handleClick=()=>{
   const error= validation(user);
   if(error){
    setError(error)
    return;
   }

   localStorage.setItem('user',JSON.stringify(user))

  }



  const validation=(user)=>{
    setError("")
    const Schema = Joi.object({
      FirstName:Joi.string()
      .min(3).max(30).required(),
      LastName:Joi.string()
      .min(3).max(30).required(),
      
      Email:Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      Phone:Joi.string().min(10).max(10).required()
    })

    const {error}=Schema.validate({...user})
    return(error?.message)
  }

  return (
    <div className='container'>

      <p>{error}</p>
     <input onChange={handleChange} name="FirstName"  placeholder='Enter your Name' />
     <input onChange={handleChange} name="LastName" placeholder='Enter Your lastName' />
     <input onChange={handleChange} name="Email" placeholder='Enter your Email' />
     <input onChange={handleChange} name="Phone" placeholder='Enter Your Phone'  />
    <button onClick={handleClick}>Submit</button>
    <Link to={'/task'}>go to task</Link>
    </div>
  )
}

export default Contact
