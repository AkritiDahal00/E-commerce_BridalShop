import React, { useContext} from 'react'
import { ShopContext } from '../Context/ShopContext'
import './UserPurchaseHistory.css'


const UserPurchaseHistory = (props) => {
    const {getTotalCartAmount,all_product,purchaseItems}=useContext(ShopContext);

    const {product}=props;
console.log(product);
    // const{getPurchasedata,addTopurchaseHistory}=useContext(ShopContext);
    if (!all_product) {
        return <div>Loading...</div>;
      }
  return (
    <div className='purchaseitems'>
       <div className="purchaseitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Status</p>
      </div>
      <hr/>
      {all_product.map((e)=>{
      if(purchaseItems[e.id]>0){
        console.log(purchaseItems);
        return <div>
        <div className="purchaseitems-format purchaseitems-format-main" key={e.id}>
            <img className='carticon-product-icon' src={e.image} alt="" />
            <p>{e.name}</p>
            <p>Rs.{e.new_price}</p>
            <button className="purchaseitems-quantity">{purchaseItems[e.id]}</button>
            <p>Rs.{e.new_price*purchaseItems[e.id]}</p>
        </div>
        <div className="cartitems-total-item cartitems-total-last"> 
            <b><p>Order Total</p></b>
            <h3>Rs.{getTotalCartAmount()}</h3>
            </div>
      </div>
      }

      return null;

     })}
    </div>
  )
}

export default UserPurchaseHistory
