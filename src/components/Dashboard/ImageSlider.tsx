import React, { useState, useEffect } from 'react';

interface ImageSliderProps {
  urls: string[];
  autoSlide?: boolean; // Optional prop to control auto-sliding behavior
  slideInterval?: number; // Interval in milliseconds for auto-sliding (default to 3000ms)
}

const ImageSlider: React.FC<ImageSliderProps> = ({ urls, autoSlide = false, slideInterval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically slide to the next slide
  useEffect(() => {
    if (autoSlide) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % urls.length);
      }, slideInterval);

      // Clear the interval when the component unmounts or when autoSlide is turned off
      return () => clearInterval(interval);
    }
  }, [autoSlide, slideInterval, urls.length]);

  // Go to next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % urls.length);
  };

  // Go to previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? urls.length - 1 : prevIndex - 1
    );
  };

  // Go to specific slide
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="slider-container">
      <div className="slider">
        <button className="arrow prev" onClick={prevSlide}>
          &#10094;
        </button>
        <div className="slide">
          <img
            src={urls[currentIndex]}
            alt={`Slide ${currentIndex}`}
            className="slide-image"
          />
        </div>
        <button className="arrow next" onClick={nextSlide}>
          &#10095;
        </button>
      </div>
      <div className="dots-container">
        {urls.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
