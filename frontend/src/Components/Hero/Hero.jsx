import React from 'react'
import './Hero.css'
import hand_icon from '../imagess/hand_icon.png'
import arrow_icon from '../imagess/arrow.png'
import hero_image from '../imagess/no_background_img.webp'

const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero_left">
        <h2>NEW ARRIVIAL ONLY</h2>
        <div>
            <div className="hero-hand-icon">
                <p>New</p>
                {/* <img src={hand_icon} alt=""/> */}
            </div>
            <p>collections</p>
            <p>for everyone</p>
        </div>
         <div className="hero-latest-btn">
         <div>
            Latest Collections
        </div>
        <img src={arrow_icon} alt=""/>
         </div>
      </div>

      <div className="hero_right">
        <img src={hero_image} alt=''/>
       
      </div>
    </div>
  )
}

export default Hero
