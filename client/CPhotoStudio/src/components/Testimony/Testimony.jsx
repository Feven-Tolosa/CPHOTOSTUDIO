import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5555/testimonials")
      .then((response) => response.json())
      .then((data) => setTestimonials(data))
      .catch((error) => console.error("Error fetching testimonials:", error));
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="first-testimonial p-4 bg-white shadow-lg rounded-lg"
            >
              <div className="post-thumbnail mb-4 flex justify-center">
                <img
                  src={testimonial.img_url}
                  alt=""
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>
              <p className="text-gray-600 mb-2 text-center">
                {testimonial.text}
              </p>
              <h4 className="text-lg font-semibold text-center">
                {testimonial.name}
              </h4>
              <span className="text-sm text-gray-500 text-center block">
                {testimonial.position}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="item">
                <div className="testimony-wrap p-4 pb-5 bg-white shadow-lg rounded-lg text-center">
                  <div
                    className="user-img mb-4 mx-auto w-24 h-24 rounded-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${testimonial.img_url})` }}
                  >
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
      </div>
    </section>
  );
};

export default Testimonial;
