import { useState } from 'react'

import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Task from './component/task/Task'
import Home from './component/home/Home'
import Contact from './component/contact/Contact'

function App() {
  

  return (
    <>

<BrowserRouter>
<Routes>
<Route path="/" element ={<Home />} />
<Route path="/task" element ={<Task />} />
<Route path="/contact" element ={<Contact />} />
</Routes>


</BrowserRouter>
     
    </>
  )
}

export default App
