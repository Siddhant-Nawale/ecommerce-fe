import React, { useState, useEffect, useRef } from "react";

interface ImageSliderProps {
  urls: string[];
  editMode?: boolean; // Optional prop for edit mode
  autoSlide?: boolean;
  slideInterval?: number;
  onUpdate?: (newUrls: string[]) => void; // Function to update URLs
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  urls,
  editMode = false,
  autoSlide = false,
  slideInterval = 3000,
  onUpdate,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newImageUrl, setNewImageUrl] = useState(urls[0] || ""); // Initialize with the first URL
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Reference for the interval

  // Automatically slide to the next slide
  useEffect(() => {
    if (autoSlide) {
      const startAutoSlide = () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current); // Clear any existing interval
        }
        intervalRef.current = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % urls.length);
        }, slideInterval);
      };

      startAutoSlide();

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current); // Clear the interval when the component unmounts or autoSlide changes
        }
      };
    }
  }, [autoSlide, slideInterval, urls.length]);

  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % urls.length;
    setCurrentIndex(nextIndex);
    setNewImageUrl(urls[nextIndex]); // Update the image URL when changing slide
    resetTimmer();
  };

  const prevSlide = () => {
    const prevIndex = currentIndex === 0 ? urls.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setNewImageUrl(urls[prevIndex]); // Update the image URL when changing slide
    resetTimmer();
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setNewImageUrl(urls[index]); // Update the image URL when selecting a specific slide
    resetTimmer();
  };
  const resetTimmer = () => {
    if (autoSlide) {
      clearInterval(intervalRef.current as NodeJS.Timeout); // Reset the interval when navigating manually
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % urls.length);
      }, slideInterval); // Restart the auto-slide timer
    }
  };

  const handleUpdateImage = () => {
    if (newImageUrl && onUpdate) {
      const updatedUrls = [...urls];
      updatedUrls[currentIndex] = newImageUrl;
      onUpdate(updatedUrls);
    }
  };

  const handleAddImage = () => {
    if (newImageUrl && onUpdate) {
      const updatedUrls = [...urls, ""]; // Add an empty URL for the new image
      onUpdate(updatedUrls);
      goToSlide(updatedUrls.length - 1);
      setNewImageUrl(""); // Clear the input after adding
    }
  };
  const handleDeleteImage = () => {
    if (onUpdate) {
      const updatedUrls = urls.filter((_, index) => index !== currentIndex); // Remove the current image from the array
      onUpdate(updatedUrls);

      // Move to the previous image after deletion, if possible
      const newIndex =
        currentIndex === 0 ? updatedUrls.length - 1 : currentIndex - 1;
      goToSlide(newIndex);
    }
  };

  return (
    <div className="slider-container">
      <div className="slider">
        <button className="arrow prev" onClick={prevSlide}>
          &#10094;
        </button>
        <div className="slide">
          {urls[currentIndex] ? (
            <img
              src={urls[currentIndex]}
              alt={`Slide ${currentIndex}`}
              className="slide-image"
            />
          ) : (
            <div className="empty-slide flex-row flex-center">No Image</div>
          )}
        </div>
        <button className="arrow next" onClick={nextSlide}>
          &#10095;
        </button>
      </div>

      {/* Edit mode controls */}
      {editMode && (
        <div className="edit-controls">
          <input
            type="text"
            placeholder="Enter image URL"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            className="image-url-input"
          />
          <button onClick={handleUpdateImage}>Process</button>
          <button onClick={handleAddImage}>Add Image</button>
          <button onClick={handleDeleteImage}>Delete Image</button>
        </div>
      )}

      <div className="dots-container">
        {urls.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
