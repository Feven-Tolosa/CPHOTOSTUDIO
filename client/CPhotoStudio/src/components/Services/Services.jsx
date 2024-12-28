import React, { useState, useEffect } from "react";

function Services() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5555/photos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched data:", data); // Log the fetched data
        setPhotos(data);
      })
      .catch((error) => {
        console.error("There was an error fetching the photos!", error);
      });
  }, []);

  return (
    <section className="services">
      <h2 className="wow fadeInUp m-5" data-wow-delay="100ms">
        Services
      </h2>
      {photos.map((photo, index) => (
        <div key={index} className="sectionitem">
          <div>
            <h4 style={{ textAlign: "center" }} className="m-3">
              {photo.product_name}
            </h4>
            <a
              id="topbtn"
              href="#"
              className="topbtn btn alime-btn mb-3 mb-sm-0 mr-4"
            >
              view more...
            </a>
            <img src={photo.product_url} alt={photo.product_name} />
          </div>
          <div>
            <p>{photo.description}</p>
            <a href="#" className="btn alime-btn mb-3 mb-sm-0 mr-4">
              view more...
            </a>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Services;
