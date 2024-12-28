import React, { useState, useEffect } from "react";
import logo from "../../assets/image/core-img/logo.png";
import menu from "../../assets/image/core-img/menu_white.png";
import cMenu from "../../assets/image/core-img/close_menu.png";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
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
          <a href="/">
            <img src={logo} alt="Logo" />
          </a>
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
          <a
            href="#"
            className="text-white hover:text-customOrange hover:shadow-red-500"
          >
            Home
          </a>
          <a
            href="#"
            className="text-white hover:text-customOrange hover:shadow-red-500"
          >
            About
          </a>
          <a
            href="#"
            className="text-white hover:text-customOrange hover:shadow-red-500"
          >
            Gallery
          </a>
          <a
            href="#"
            className="text-white hover:text-customOrange hover:shadow-red-500"
          >
            Blogs
          </a>
          <a
            href="#"
            className="text-white hover:text-customOrange hover:shadow-red-500"
          >
            Book
          </a>
          <a
            href="#"
            className="text-white hover:text-customOrange hover:shadow-red-500"
          >
            Contact
          </a>
        </nav>
      </div>
      <div
        className={`fixed top-0 left-0 w-64 bg-transparent text-white h-full shadow-lg transform transition-transform duration-300 lg:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="px-4 py-20 space-y-4">
          <li>
            <a
              href="#"
              onClick={closeMenu}
              className=" hover:text-customOrange"
            >
              Home
            </a>
          </li>
          <hr />
          <li>
            <a
              href="#"
              onClick={closeMenu}
              className=" hover:text-customOrange"
            >
              About
            </a>
          </li>
          <hr />
          <li>
            <a href="#" onClick={closeMenu} className="hover:text-customOrange">
              Gallery
            </a>
          </li>
          <hr />
          <li>
            <a href="#" onClick={closeMenu} className="hover:text-customOrange">
              Blogs
            </a>
          </li>
          <hr />
          <li>
            <a href="#" onClick={closeMenu} className="hover:text-customOrange">
              Book
            </a>
          </li>
          <hr />
          <li>
            <a href="#" onClick={closeMenu} className="hover:text-customOrange">
              Contact
            </a>
          </li>
          <hr />
        </ul>
      </div>
    </header>
  );
}

export default Header;
