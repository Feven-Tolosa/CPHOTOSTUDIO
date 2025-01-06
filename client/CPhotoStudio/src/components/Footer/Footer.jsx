import React from "react";
import logo from "../../assets/image/core-img/logo.png";
import { Link } from "react-router-dom";

const Footer = ({ aboutRef, servicesRef, gallaryRef, testimonialRef }) => {
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-customGreen text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between">
          {/* Logo and Description */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <a href="/" className="text-white text-2xl font-bold">
              <img src={logo} alt="Studio Logo" className="h-12" />
            </a>
            <p className="mt-4 text-gray-400">
              Capturing moments from today... Creating memories for a lifetime.
            </p>
          </div>
          {/* Quick Links */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul>
              <li>
                <button
                  onClick={() => scrollToSection(aboutRef)}
                  className="text-gray-400 hover:text-white"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection(servicesRef)}
                  className="text-gray-400 hover:text-white"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection(gallaryRef)}
                  className="text-gray-400 hover:text-white"
                >
                  Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection(testimonialRef)}
                  className="text-gray-400 hover:text-white"
                >
                  Contact
                </button>
              </li>
              <li>
                <Link to="/book" className="text-gray-400 hover:text-white">
                  Book
                </Link>
              </li>
            </ul>
          </div>
          {/* Contact Info */}
          <div className="w-full md:w-1/3">
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <p className="text-gray-400">
              <strong>Address:</strong> 123 Photography St, City, Country
              <br />
              <strong>Phone:</strong> (123) 456-7890
              <br />
              <strong>Email:</strong>{" "}
              <a
                href="mailto:info@photostudio.com"
                className="text-gray-400 hover:text-white"
              >
                info@photostudio.com
              </a>
            </p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-400">
            &copy; 2025 Your Photography Studio. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
