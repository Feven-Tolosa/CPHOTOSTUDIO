import React from "react";

function About() {
  return (
    <div className="py-20 bg-customGreen" id="about">
      <div className="container mx-auto px-7">
        <div className="flex justify-between flex-wrap items-center">
          <div className="w-full lg:w-1/2 mb-20 lg:mb-0">
            <div className="mb-20">
              <h2
                className="text-4xl font-bold mb-2 animate-fadeInUp"
                style={{ animationDelay: "100ms" }}
              >
                We Live For Passion
              </h2>
              <div
                className="w-16 mx-6 lg:mx-1 lg:w-20 h-1 bg-customOrange mb-6 animate-fadeInUp"
                style={{ animationDelay: "200ms" }}
              ></div>
              <p
                className="mb-4 animate-fadeInUp"
                style={{ animationDelay: "300ms" }}
              >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et do sunt explicabo. Nemo
                enim ipsam et dolore magnam aliquam quaerat voluptatem.
              </p>
              <p
                className="animate-fadeInUp"
                style={{ animationDelay: "400ms" }}
              >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et do sunt explicabo. Nemo
                enim ipsam et dolore magnam aliquam quaerat voluptatem.
              </p>
              <div
                className="mt-10 animate-bounceInDown"
                style={{ animationDelay: "100ms" }}
              >
                <a
                  href="#contact"
                  className="inline-block bg-customOrange text-white font-bold py-2 px-4 rounded-full m-6 mr-4 hover:bg-black transition duration-300"
                >
                  Contact Me
                </a>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center top-0 left-0 w-auto h-auto">
            <img
              src="../../../public/17.jpg"
              alt="About Us"
              className="object-cover bg-cove  top-0 left-0 w-auto h-auto"
            />
            {/* <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
              <a
                href="https://www.youtube.com/watch?v=sSakBz_eYzQ"
                className="bg-customOrange bg-cover w-11 h-11 rounded-full bg-no-repeat bg-center 
                "
                // style={{ backgroundImage: "url('../../../public/.jpg')" }}
              ></a>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
