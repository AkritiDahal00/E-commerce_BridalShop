import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from '../imagess/star_icon.png'
import star_dull_icon from '../imagess/star_dull_icon.png'
import { ShopContext } from '../Context/ShopContext'

const ProductDisplay = (props) => {
    const {product}=props;
    const {addTocart}=useContext(ShopContext)
  return (
    <div className='productdisplay'>
        <div className="productdisplay-left">
            <div className="productdisplay-img-list">
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />

                

            </div>
            <div className="productdisplay-image">
                <img className='productdisplay-main-img' src={product.image} alt="" />
            </div>
        </div>
      <div className="productdisplay-right">
        <h1> {product.name}</h1>
        <div className="productdisplay-right-stars">
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_dull_icon} alt="" />
            <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
            <div className="productdisplay-right-price-old">
                NPR {product.old_price}
            </div>
            <div className="productdisplay-right-price-new">
                NPR {product.new_price}
            </div>
           
        </div>
        <div className="productdisplay-right-description">
            A romantic wedding dress but with modern style details. Created in an all-over glittery fabric with an abstract pattern. 
            The corset bodice with ‘visible’ boning and cups supports two sleeve options – either dropped shoulder or peasant-style sleeves that are detachable. With a fully, flowy skirt and mid-length train.
            </div>
            <div className="prodctdisplay-right-size">
                <h1>Select Size</h1>
            </div>
            <div className="productdisplay-right-sizes">
                <div>S</div>
                <div>M</div>
                <div>L</div>
                <div>XL</div>
                <div>XXL</div>
            </div>
        <button onClick={()=>{addTocart(product.id)}}>ADD TO CART</button>
        <p className='productdisplay-right-category'><span>Category :</span>Bridal Gown Glitter</p>
        <p className='productdisplay-right-category'><span>Tags :</span>Modern Latest</p>

      </div>
    </div>
  )
}

export default ProductDisplay
