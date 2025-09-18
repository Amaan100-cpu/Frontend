import React from 'react';
import './HeroSection.css';
import img1 from "../icons/img2.jpg"
const HeroSection = () => {
  const aaa=()=>{
    if(window.innerWidth<"768"){
      return window.scrollTo({ top: 1200, behavior: 'auto' });
    }
    window.scrollTo({ top: 450, behavior: 'auto' });
  }
  return (
    <div className="hero-banner">
      <div className="hero-content">
        <h1>Premium Fashion & Electronics</h1>
        <p>Discover the latest trends in fashion and cutting-edge electronics at unbeatable prices.</p>
        <h3 className="hero-btn" onClick={aaa}>Shop Now</h3>
      </div>
      <img 
        src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
        alt="Fashion collection" 
        className="hero-image" 
      />
    </div>
  );
};

export default HeroSection;