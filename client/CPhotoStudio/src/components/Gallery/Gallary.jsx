import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Gallary = ({ maxImages = 9 }) => {
  const [isSlideshowOpen, setSlideshowOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/photos`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        setImages(data.map((photo) => photo.photo_url)); // Assuming photo_url is the URL to the image
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    initialSlide: currentSlide,
  };

  const openSlideshow = (index) => {
    console.log("Opening slideshow at index:", index);
    setCurrentSlide(index);
    setSlideshowOpen(true);
  };

  const closeSlideshow = () => {
    console.log("Closing slideshow");
    setSlideshowOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="bg-customGreen px-4 sm:px-8 md:px-16">
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-white">Gallery</h1>
        <p className="text-white">Recent shots</p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-3 lg:grid-cols-3 lg:grid-rows-3">
        {images
          .slice(0, Math.min(maxImages, images.length))
          .map((image, index) => (
            <div
              key={index}
              className={`w-full ${
                index === 0 ? "md:row-span-2 md:col-span-2" : ""
              } ${
                index === 1 || index === 2 ? "md:col-span-1 md:row-span-1" : ""
              } ${index === 3 ? "md:row-span-2 md:col-span-1" : ""} ${
                index === 4 || index === 5 ? "md:col-span-1 md:row-span-1" : ""
              } ${index >= 6 ? "md:col-span-1 md:row-span-2" : ""}`}
            >
              <img
                src={image}
                alt={`Image ${index}`}
                className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110 cursor-pointer"
                onClick={() => openSlideshow(index)}
              />
            </div>
          ))}
      </div>
      {isSlideshowOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={closeSlideshow}
          >
            &times;
          </button>
          <div className="w-full md:w-3/4 lg:w-1/2">
            <Slider {...settings}>
              {images.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={`Slide ${index}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallary;
