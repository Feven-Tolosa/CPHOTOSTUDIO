import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout = ({
  children,
  aboutRef,
  servicesRef,
  gallaryRef,
  testimonialRef,
}) => {
  return (
    <div>
      <Header
        aboutRef={aboutRef}
        servicesRef={servicesRef}
        gallaryRef={gallaryRef}
        testimonialRef={testimonialRef}
      />
      <main>{children}</main>
      <Footer
        aboutRef={aboutRef}
        servicesRef={servicesRef}
        gallaryRef={gallaryRef}
        testimonialRef={testimonialRef}
      />
    </div>
  );
};

export default Layout;
