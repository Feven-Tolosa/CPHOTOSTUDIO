import React, { useState, useEffect } from "react";
import logo from "../../assets/image/core-img/logo.png";
import menu from "../../assets/image/core-img/menu_white.png";
import cMenu from "../../assets/image/core-img/close_menu.png";
import { Link } from "react-router-dom";

function Header({ aboutRef, servicesRef, gallaryRef, testimonialRef }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
    closeMenu();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 570) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest(".menu, .menu-button")) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 w-full px-8 py-5 z-50 transition-colors duration-300 ${
        isScrolled ? "bg-customGreen" : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center">
        <div>
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="menu-button focus:outline-none"
          >
            <img
              src={isMenuOpen ? cMenu : menu}
              alt="Menu"
              width={30}
              height={30}
            />
          </button>
        </div>
        <nav className="hidden lg:flex space-x-4 gap-10 pr-10">
          <button
            onClick={() => scrollToSection(aboutRef)}
            className="text-white hover:text-customOrange hover:shadow-red-500"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection(servicesRef)}
            className="text-white hover:text-customOrange hover:shadow-red-500"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection(gallaryRef)}
            className="text-white hover:text-customOrange hover:shadow-red-500"
          >
            Gallery
          </button>
          <button
            onClick={() => scrollToSection(testimonialRef)}
            className="text-white hover:text-customOrange hover:shadow-red-500"
          >
            Testimonial
          </button>
          <Link
            to="/book"
            className="text-white hover:text-customOrange hover:shadow-red-500"
          >
            Book
          </Link>
        </nav>
      </div>
      <div
        className={`fixed top-0 left-0 w-64 bg-transparent text-white h-full shadow-lg transform transition-transform duration-300 lg:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="px-4 py-20 space-y-4">
          <li>
            <button
              onClick={() => scrollToSection(aboutRef)}
              className="hover:text-customOrange"
            >
              About
            </button>
          </li>
          <hr />
          <li>
            <button
              onClick={() => scrollToSection(servicesRef)}
              className="hover:text-customOrange"
            >
              Services
            </button>
          </li>
          <hr />
          <li>
            <button
              onClick={() => scrollToSection(gallaryRef)}
              className="hover:text-customOrange"
            >
              Gallery
            </button>
          </li>
          <hr />
          <li>
            <button
              onClick={() => scrollToSection(testimonialRef)}
              className="hover:text-customOrange"
            >
              Testimonial
            </button>
          </li>
          <hr />
          <li>
            <Link
              to="/book"
              onClick={closeMenu}
              className="hover:text-customOrange"
            >
              Book
            </Link>
          </li>
          <hr />
        </ul>
      </div>
    </header>
  );
}

export default Header;
