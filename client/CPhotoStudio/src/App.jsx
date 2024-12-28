import React from "react";
import Header from "./components/Header/Header";
import "./assets/css/style.css";
import Carousel from "./components/Carousels/Carousels";
import About from "./components/About/About";
import Services from "./components/Services/Services";
import Gallery from "./components/Gallery/Gallery";
import Blogs from "./components/Blogs/Blogs";
import Testimony from "./components/Testimony/Testimony";
import Book from "./components/Book/Book";
import Follow from "./components/Follow/Follow";
function App() {
  return (
    <div>
      <Header />
      <Carousel />
      <About />
      <Services />
      {/* <Gallery />
      <Blogs />
      <Testimony />
      <Book />
      <Follow /> */}
    </div>
  );
}

export default App;
