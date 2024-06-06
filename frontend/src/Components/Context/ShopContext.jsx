
import React, { createContext, useEffect, useState } from "react";
import {loadStripe} from '@stripe/stripe-js';


export const ShopContext = createContext(null);
const getDefaultcart =() =>{
    let cart ={};
    for (let index=0; index <300+1; index++){
        cart[index]=0;
    }
    return cart;
}
const getDefaultPurchase =()=>{
    let purchaseHistory ={};
    for(let indexs =0;indexs <300+1; indexs++){
        purchaseHistory[indexs]=0;
    }
    return purchaseHistory;
}
const ShopContextProvider = (props) =>{

    const[all_product,setAll_Product] = useState([]);
    const[cartItems,setCartItems]=useState(getDefaultcart());
    const [email, setEmail] = useState('');
    const[purchaseItems,setPurchaseItems]=useState(getDefaultPurchase());

    useEffect(()=>{
        fetch('http://localhost:4000/allproducts')
        .then((response)=>response.json())
        .then((data)=>setAll_Product(data))

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:"",
            }).then((response)=>response.json())
            .then((data)=>setCartItems(data));
        }

    },[])

   

    const addTocart  = (itemId) =>{
     
       setCartItems((prev)=>({...prev,[itemId]: prev[itemId]+1}));
       if(localStorage.getItem('auth-token')){
        fetch('http://localhost:4000/addtocart',{
            method:'POST',
            headers:{   
                Accept:'application/form-data',
                'auth-token':`${localStorage.getItem('auth-token')}`,
                'Content-Type':'application/json',
            },
            body:JSON.stringify({"itemId":itemId}),
        })
        .then((response)=>response.json())
        .then((data)=>console.log(data));
    }
       
 
    }


    ///purchase history
    const addTopurchaseHistory =(itemId)=>{
        setPurchaseItems((prev)=>({...prev,[itemId]: prev[itemId]+1}));
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtopurchasehistory',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
    }

    
    const getProductDetails = (productId) => {
        return all_product.find((product) => product.id === Number(productId));
      };

    const processPayment =async ()=>{
        const stripe = await loadStripe('pk_test_51Ot40ASGEKNzWeY4vSCcuDDvUQNuVNEQTm9QpN45YkhTPuGdnXhiWlcRHTgzwdN0e2GfMwFTKIBe2EqCwkINBNYw00FjIDsVwM');
        const lineItems = [];
        for (const itemId in cartItems) {
            const quantity = cartItems[itemId];
        
            // Only include items with a positive quantity
            if (quantity > 0 ) {
              const productDetails = getProductDetails(itemId);
        
              if (productDetails) {
                // Add the product as a line item
                lineItems.push({
                  name: productDetails.name,
                  new_price: productDetails.new_price,
                  category: productDetails.category,
                  quantity: quantity,
                });
              }
            }
          }
  
          
        const body ={
          products: lineItems,
          
        }
        const headers ={
            'Content-Type':'application/json',
        }
       
        const response =await fetch('http://localhost:4000/api/create-checkout-session',{
            method:'POST',
            headers:headers,
            body:JSON.stringify(body)
        });
        const session = await response.json();
      
        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });
        if(result.error){
            console.log(result.error);
        }
        
  
      }

      
    

   const removeFromCart=(itemId) =>{
       setCartItems((prev)=>({...prev,[itemId]: prev[itemId]-1}));
       if(localStorage.getItem('auth-token')){
        console.log("remove from server");
        fetch('http://localhost:4000/removefromcart',{
            method:'POST',
            headers:{   
                Accept:'application/form-data',
                'auth-token':`${localStorage.getItem('auth-token')}`,
                'Content-Type':'application/json',
            },
            body:JSON.stringify({"itemId":itemId}),
        })
        .then((response)=>response.json())
        .then((data)=>console.log(data));

       }
       }

    const getTotalCartAmount =()=>{
        let totalAmount=0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0){
                let itemInfo = all_product.find((product)=>product.id === Number(item))
                totalAmount += itemInfo.new_price * cartItems[item];
            }
          
        }
        return totalAmount;
    }

    const getTotalCartItems =() =>{
        let totalItem =0;
        for(const item in cartItems){
            if(cartItems[item] >0 )
               totalItem+=cartItems[item];
        
        
        
        }
        return totalItem;
    }

    const getPurchasedata =()=>{
        let totalitems = 0;
        for (const item in purchaseItems){
            if(purchaseItems[item]>0)
            totalitems+=purchaseItems[item];
        }
        return  purchaseItems;

    }
    // const handleForgotPassword = async () => {
    //     try {
    //       // Send a request to your backend to initiate the password reset
    //       const response = await fetch('http://localhost:4000/forgetpassword', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ email }),
    //       });
    
    //       const data = await response.json();
    //       console.log(data); // Handle the response accordingly
    //     } catch (error) {
    //       console.error('Error:', error);
    //     }
    //   };

 


    const contextValue={getTotalCartItems,getTotalCartAmount,all_product,cartItems,addTocart,removeFromCart,processPayment,getPurchasedata,purchaseItems,addTopurchaseHistory};
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider> 
    )

}
export default ShopContextProvider;

