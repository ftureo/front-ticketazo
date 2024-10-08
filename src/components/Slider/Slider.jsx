import React, { useState, useEffect } from 'react';
import '../Slider/slider.css'; 
import image1 from '../../assets/images/image1.png'
import image2 from '../../assets/images/image2.png'
import image3 from '../../assets/images/image3.png'
import image4 from '../../assets/images/image4.png'
import image5 from '../../assets/images/image5.png'


const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [image1,image2,image3,image4,image5];

  const links = [
    "https://www.ticketek.com.ar/chaqueno-palavecino/teatro-el-circulo", 
    "https://www.ticketek.com.ar/jorge-rojas/quality-arena", 
    "https://www.ticketek.com.ar/ciro-y-los-persas/ex-rural", 
    "https://www.ticketek.com.ar/los-mosqueteros-del-rey/teatro-universidad-nacional-de-la-matanza", 
    "https://www.ticketek.com.ar/reik/quality-arena", 
  ];


  
  const length = images ? images.length : 0;

  if (length === 0) {
    return <div>No images available</div>;
  }

  
  const nextSlide = () => {
    setCurrentIndex(currentIndex === length - 1 ? 0 : currentIndex + 1);
  };

  
  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? length - 1 : currentIndex - 1);
  };

  // Auto-play cada 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div className="slider-images">
    {images.map((image, index) => (
      <div
        className={`slide ${index === currentIndex ? 'active' : ''}`}
        key={index}
      >
        {index === currentIndex && (  
          <a href={links[index]} target="_blank" rel="noopener noreferrer">
          <img src={image} alt={`Slide ${index}`} className="image" />
          </a> 
        )}
      </div>
    ))}
  </div>
  
   
  );
};

export default Slider;
