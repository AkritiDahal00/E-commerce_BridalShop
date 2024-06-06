import React from 'react'
import './Popular.css'
import data_product from '../imagess/data'
import Item from '../Item/Item'

const Popular = () => {

  // const [popularProducts,setPopularProduct] =useState([]);

  // useEffect(()=>{
  //   fetch('http://localhost:4000/popularinbridal')
  //   .then((response)=>response.json())
  //   .then((data)=>setPopularProduct(data))
  // })
  return (
    <div className='popular'>
        <h1>SHOP NOW</h1>
      <hr />
      <div className='popular-item'>
        {data_product.map((item,i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image}
            //  new_price={item.new_price} old_price={item.old_price}
             />
        })}
       
      </div>
    </div>
  )
}

export default Popular
