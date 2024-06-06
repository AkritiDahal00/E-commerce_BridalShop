import React, { useContext, useRef, useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../imagess/small_main_logo.png';
import cart_icon from '../imagess/cart_icon.png';
import { Link ,  useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import drop_down_logo from  "../imagess/down-arrow.png";
import axios from 'axios';



const Navbars = () => {
  const [navItems, setNavItems] = useState([]);



  const [menu,setMenu]= useState("shop");
  const {getTotalCartItems} =useContext(ShopContext);
  const navigate = useNavigate();
  
  const menuRef =useRef();
  const dropdown_toogle =(e)=>{
    menuRef.current.classList.toggle('nav-menu-visibile');
    e.target.classList.toggle('open');

  }
  useEffect(() => {
    fetchNavItems();
  }, []);
  const fetchNavItems = async () => {
    try {
      const response = await axios.get('http://localhost:4000/navitems');
      setNavItems(response.data);
    } catch (error) {
      console.error('Error fetching navbar items:', error);
    }
  };

   // Function to navigate to profile page
   const navigateToProfile = () => {
    navigate('/profile');// Navigate to the '/profile' route
  };
  return (
    <div className="navbar">
       <div className='nav_logo'>
        <img className='nav_logo_main' src={logo} alt="" />   
        <p>Bridal Shop <br/><p className='logo_nam'>by akriti</p></p> 
       </div>

        <img className='nav_dropdown' onClick={dropdown_toogle} src={drop_down_logo} alt="" />
       <ul ref={menuRef} className='nav_menu'>
       {navItems.map((item) => (
          <li key={item._id} onClick={() => setMenu(item.text.toLowerCase())}>
            <Link style={{ textDecoration: 'none', color: 'white' }} to={item.link}>
              {item.text.toUpperCase()}
            </Link>
            {menu === item.text.toLowerCase() ? <hr /> : null}
          </li>
        ))}

        {/* <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration:'none', color:'white'}} to='/'>SHOP</Link>{menu==="shop"?<hr></hr>:<></>}</li>
        {/* <li onClick={()=>{setMenu("about")}}><Link style={{textDecoration:'none',color:'white'}} to='/about'>About Us</Link>{menu==="about"?<hr></hr>:<></>}</li> */}
        {/* <li onClick={()=>{setMenu("bridal")}}><Link style={{textDecoration:'none',color:'white'}} to='/bridal'>BRIDAL</Link>{menu==="bridal"?<hr></hr>:<></>}</li>
        <li onClick={()=>{setMenu("evening")}}><Link style={{textDecoration:'none',color:'white'}} to='/evening'>EVENING</Link>{menu==="evening"?<hr></hr>:<></>}</li>
        <li onClick={()=>{setMenu("bridemaid")}}><Link style={{textDecoration:'none',color:'white'}} to='/bridemaid'>BRIDESMAID</Link>{menu==="bridemaid"?<hr></hr>:<></>}</li> */}
       </ul> */
       

       {/* <div className="nav-search-bar">
       <input type="text" placeholder="Search..." />
      <button>Search</button>
       </div> */}
     
       <div className="seeprofile" > {/* Add onClick handler */}
        <h3 className='profileview' onClick={navigateToProfile}>Profile</h3>
      </div>
     
        

       <div className="nav-login-cart">

        {localStorage.getItem('auth-token')?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>LogOut</button> 
          :<Link to='/login'><button>LOGIN</button></Link> }
     
        <Link to='/cart'><img className="nav_cartt" src={cart_icon} alt="" /></Link>
        
        <div className="nav-cart-count">{getTotalCartItems()}</div>
       </div>
    </div>
  )
}

export default Navbars
