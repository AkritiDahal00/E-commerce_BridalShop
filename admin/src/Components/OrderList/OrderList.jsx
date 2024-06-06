import React from 'react'
import './OrderList.css'
import { useState ,useEffect} from 'react'


const OrderList = () => {
  const [purchaseproduct, setPurchaseProduct] = useState([]);
  const fetchInfo=async()=>{
    await fetch ('http://localhost:4000/api/create-checkout-session')
    .then((res)=>res.json())
    .then((data)=>{setPurchaseProduct(data)});
  }
  useEffect(()=>{
    fetchInfo();
  },[])

  

  
  return (
    <div className='orderlist'>

<h1>All Order List</h1>
      <div className="orderlist-format-main">
        <p>User ID:</p>
        <p>Product Name</p>
        <p>Product Price</p>
        <p>Product Caregory</p>
       
        

      </div>

      <div className="listproduct-allproduct">
        <hr />
          {purchaseproduct.map((purchase,index)=>{
            return<> <div key={index} className="listproduct-format-main listproduct-format">
            
              <p>{purchase.user_id}</p>
              <p>{purchase.name}</p>
              <p>NPR {purchase.new_price}</p>
              <p>{purchase.category}</p>
            ?

            </div>
            <hr />
            </>
          })}
      </div>
      
    </div>
  )
}

export default OrderList
