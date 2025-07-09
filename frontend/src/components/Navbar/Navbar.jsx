import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

// eslint-disable-next-line no-unused-vars
const Navbar = ({setShowLogin}) => {

    const [menu,Setmenu] = useState("home");

    // eslint-disable-next-line no-unused-vars
    const {getTotalCartAmount,token,setToken} = useContext(StoreContext);


  return (
    <div className='navbar'>
        <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
        <ul className='nav-menu'>
            <Link to='/' onClick={()=>Setmenu("home")} className={menu==="home"?"active":""}>home</Link>
            <a href='#explore-menu' onClick={()=>Setmenu("menu")} className={menu==="menu"?"active":""}>menu</a>
            <a href='#app-download' onClick={()=>Setmenu("mobile-app")} className={menu==="mobile-app"?"active":""}>mobile-app</a>
            <a href='#footer' onClick={()=>Setmenu("contact-us")} className={menu==="contact-us"?"active":""}>contact us</a>
        </ul>
        <div className='navbar-right'>
            <img src={assets.search_icon} alt="" className="search_icon" />
            <div className='navbar-search-icon'>
                <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                <div className={getTotalCartAmount()===0?"":"dot"}></div>
            </div>

        </div>
      
    </div>  
  )
}

export default Navbar
    