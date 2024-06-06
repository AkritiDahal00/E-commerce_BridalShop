import React from 'react'
import './Navbar.css'
import logo from '../imagess/mainlogo_one.png'
const Navbar = () => {
  return (
    <div className="navbar">
       <div className='nav_logo'>
        <img src={logo} alt="" />   
        <p>ALegance</p>
       </div>
    </div>
  )
}

export default Navbar

