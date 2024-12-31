import React, { useState, useEffect } from "react";

const Gallery = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5555/photos")
      .then((response) => response.json())
      .then((data) => setPhotos(data))
      .catch((error) => console.error("Error fetching photos:", error));
  }, []);

  return (
    <div className="row alime-portfolio">
      {photos.map((photo, index) => (
        <div
          key={index}
          className={`col-12 col-sm-6 col-lg-3 single_gallery_item mb-30 wow fadeInUp`}
          data-wow-delay={`${index * 200}ms`}
        >
          <div className="single-portfolio-content">
            <img src={photo.product_url} alt={photo.alt} />
            <div className="hover-content">
              <a href={photo.product_urll} className="portfolio-img">
                +
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
