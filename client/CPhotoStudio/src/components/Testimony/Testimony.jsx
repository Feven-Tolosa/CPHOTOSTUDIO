import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/testimonials`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setTestimonials(data))
      .catch((error) => {
        console.error("Error fetching testimonials:", error);
        setError(error.message);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <section className="ftco-section testimony-section mb-4" id="testimonial">
      <div className="container mx-auto">
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold">Testimony</h2>
          <h4 className="text-xl mt-2">Our satisfied customer says</h4>
        </div>

        {error && (
          <div className="text-center text-red-500 mb-4">Error: {error}</div>
        )}

        <Slider {...settings}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="item">
              <div className="testimony-wrap p-4 pb-5 bg-white shadow-lg rounded-lg text-center">
                <div className="user-img mb-4 mx-auto w-24 h-24 rounded-full">
                  <img
                    src={testimonial.img_url}
                    alt={testimonial.name}
                    className="w-24 h-24 rounded-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "fallback-image-url"; // Replace with a fallback image URL
                    }}
                  />
                  <span className="quote bg-customOrange text-white text-2xl p-2 rounded-full absolute top-0 left-0">
                    <i className="icon-quote-left"></i>
                  </span>
                </div>
                <div className="text">
                  <p className="mb-2 pl-4 line text-gray-600">
                    {testimonial.text}
                  </p>
                  <p className="name text-lg font-semibold">
                    {testimonial.name}
                  </p>
                  <span className="position text-sm text-gray-500">
                    {testimonial.position}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonial;
