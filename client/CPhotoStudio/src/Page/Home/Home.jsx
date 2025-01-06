import React, { useRef } from "react";
import Header from "../../components/Header/Header";
import Carousels from "../../components/Carousels/Carousels";
import About from "../../components/About/About";
import Services from "../../components/Services/Services";
import Gallary from "../../components/Gallery/Gallary";
import Testimonial from "../../components/Testimony/Testimony";
import Footer from "../../components/Footer/Footer";

function Home() {
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const gallaryRef = useRef(null);
  const testimonialRef = useRef(null);

  return (
    <div>
      <Header
        aboutRef={aboutRef}
        servicesRef={servicesRef}
        gallaryRef={gallaryRef}
        testimonialRef={testimonialRef}
      />
      <Carousels />
      <div ref={aboutRef}>
        <About />
      </div>
      <div ref={servicesRef}>
        <Services />
      </div>
      <div ref={gallaryRef}>
        <Gallary />
      </div>
      <div ref={testimonialRef}>
        <Testimonial />
      </div>
    </div>
  );
}

export default Home;
