import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import the carousel styles
import { Carousel } from "react-responsive-carousel";
import "../../../public/1.jpg";

function Carousels() {
  return (
    <div className="welcome-slides">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        showStatus={false}
        interval={5000}
        transitionTime={1000}
      >
        {/* Single Slide */}
        <div
          className="single-welcome-slide bg-img  w-full  h-auto bg-no-repeat bg-cover"
          style={{ backgroundImage: "url('../../../public/1.jpg')" }}
        >
          <div className="container h-screen mx-0.5 flex items-center justify-center">
            <div className="flex flex-col items-center pt-52 pl-10">
              <div className="text-left">
                <h2 className="text-6xl font-bold animate-bounceInDown">
                  Hello <br /> I'm Mercy
                </h2>
                <p className="text-xl text-left w-4/3 mt-5">
                  I photograph very instinctively. I see how it is taken like
                  that. I do not follow certain styles, philosophies or
                  teachers.
                </p>
                <div className="mt-10 hero-btn-group animate-bounceInDown delay-100">
                  <a
                    href="#about"
                    className="inline-block text-white font-bold py-2  mb-3 mb-sm-0 mr-4 ml-6 hover:bg-customOrange  transition duration-300 btn alime-btn border-2 border-customOrange rounded-full bg-transparent px-4 m-4"
                  >
                    About
                  </a>
                  <a
                    href="#book"
                    className="inline-block text-white font-bold py-2  mb-3 mb-sm-0 mr-4 ml-6 hover:bg-customOrange  transition duration-300 btn alime-btn border-2 border-customOrange rounded-full bg-transparent px-4 m-4"
                  >
                    Book now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Single Slide */}
        <div
          className="single-welcome-slide bg-img w-full h-auto bg-no-repeat bg-cover"
          style={{ backgroundImage: "url('../../../public/2.jpg')" }}
        >
          <div className="container h-screen mx-auto flex items-center justify-center">
            <div className="flex flex-col items-center pt-52 pl-10">
              <div className="text-left">
                <h2 className="text-6xl font-bold animate-bounceInDown">
                  Hello <br /> I'm Mercy
                </h2>
                <p className="text-xl text-left w-4/3 mt-5">
                  I photograph very instinctively. I see how it is taken like
                  that. I do not follow certain styles, philosophies or
                  teachers.
                </p>
                <div className="hero-btn-group animate-bounceInDown delay-100 mt-10">
                  <a
                    href="#about"
                    className="inline-block text-white font-bold py-2  mb-3 mb-sm-0 mr-4 ml-6 hover:bg-customOrange  transition duration-300 btn alime-btn border-2 border-customOrange rounded-full bg-transparent px-4 m-4"
                  >
                    About
                  </a>
                  <a
                    href="#book"
                    className="inline-block text-white font-bold py-2  mb-3 mb-sm-0 mr-4 ml-6 hover:bg-customOrange  transition duration-300 btn alime-btn border-2 border-customOrange rounded-full bg-transparent px-4 m-4"
                  >
                    Book now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
}

export default Carousels;
