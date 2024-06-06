import React, { useContext } from 'react'
import { ShopContext } from '../Components/Context/ShopContext'
import { useParams } from 'react-router-dom';
import Breadcrums from '../Components/Breadcrums/Breadcrums';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProduct from '../Components/RelatedProduct/RelatedProduct';
import CartItems from '../Components/CartItems/CartItems';

const Product = () => {
    const {all_product} = useContext(ShopContext);
    const {productId}=useParams();
    const product= all_product.find((e)=>e.id ===Number(productId)); 
  return (
    <div>
        <Breadcrums product={product}/>
        <ProductDisplay product= {product} />
        <DescriptionBox/>
        <RelatedProduct/>
        <CartItems product={product} />
    </div>
  )
}

export default Product
