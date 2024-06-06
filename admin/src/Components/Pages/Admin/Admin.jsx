import React from 'react'
import './Admin.css'
import Sidebar  from "../../Sidebar/Sidebar";
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import AddProduct from '../../AddProduct/AddProduct';
import ListProduct from '../../ListProduct/ListProduct';
import OrderList from '../../OrderList/OrderList';
import AddNav from '../../AddNav/AddNav';
// import './Admin.css'

const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar />
      <Routes>
        <Route path="/addproduct" element={<AddProduct/>}></Route>
        <Route path="/listproduct" element={<ListProduct/>}></Route>
        <Route path="/orderlist" element={<OrderList/>}></Route>
        <Route path="/addnav" element={<AddNav/>}></Route>
      </Routes>
      
    </div>
  )
}

export default Admin
