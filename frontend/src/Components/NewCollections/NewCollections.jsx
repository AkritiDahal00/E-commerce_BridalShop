import React, { useEffect, useState } from 'react'
import './NewCollections.css'
import Item from '../Item/Item'

const NewCollections = () => {
  const [new_collections,setNew_collection] =useState([]);

  useEffect(()=>{
    fetch('http://localhost:4000/newcollection')
    .then((response)=>response.json())
    .then((data)=>setNew_collection(data));

  },[])

  
  return (
    <div className='new_collections'>
        <h1>New Collections</h1>
        <hr/>
        <div className="collections">
    {new_collections.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price}/>
            })}
        </div>
      
    </div>
  )
}

export default NewCollections
