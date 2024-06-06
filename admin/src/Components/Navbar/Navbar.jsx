import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/main_logo_two.png'
import navProfile from '../../assets/admin_img.jpg'

const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={navlogo} alt="" className="nav-logo" />
        <div className="admin-logo">
        <img src={navProfile} alt="" className='navprofile'/>
        </div>
        
      
    </div>
  )
}

export default Navbar
