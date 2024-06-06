import React, { useContext} from 'react'
import './CartItems.css'
import remove_icon from '../imagess/cart_cross_icon.png'
import { ShopContext } from '../Context/ShopContext'

import Cart from '../../pages/Cart';

const CartItems = (props) => {
  const {product}=props;
console.log(product);
    const {getTotalCartAmount,all_product,cartItems,removeFromCart,processPayment,addTopurchaseHistory}=useContext(ShopContext);
    if (!all_product) {
      return <div>Loading...</div>;
    }
  
  
    // console.log(cartItems);


    // payment intregation
   
  
  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e)=>{
      if(cartItems[e.id]>0){
        return <div>
        <div className="cartitems-format cartitems-format-main" key={e.id}>
            <img className='carticon-product-icon' src={e.image} alt="" />
            <p>{e.name}</p>
            <p>Rs.{e.new_price}</p>
            <button className="cartitems-quantity">{cartItems[e.id]}</button>
            <p>Rs.{e.new_price*cartItems[e.id]}</p>
            <img className='cartitems-remove-icon' src={remove_icon} onClick={()=>(removeFromCart(e.id))} alt="" />
        </div>
      </div>
      }

      return null;

     })}
     <div className="cartitems-down">
      <div className="cartitems-total">
        <h1>Cart Total</h1>
        <div>
          <div className="cartitems-total-item">
            <p>SubTotal</p>
            <p>Rs.{getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cartitems-total-item">
            <p>Shipping Fee: Free Shipping!</p>
            <p>Rs.0.00</p>
          </div>
          <hr />
          <div className="cartitems-total-item cartitems-total-last"> 
            <b><p>Order Total</p></b>
            <h3>Rs.{getTotalCartAmount()}</h3>
            </div>
            </div>
            {/* <><p id="ordertotal">Rs.0.00</p>
            <input type="submit" value="Checkout Now"/></> */}
            <button className='btn-success' onClick={() => { processPayment(); }}>Proceed to Checkout</button>
            

         
        
        </div>
        <div className="cartsitems-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder='promo code' />
            <button>Apply Promo Code</button>
          </div>
        </div>
      </div>
     </div>
     
   
  )
}

export default CartItems
