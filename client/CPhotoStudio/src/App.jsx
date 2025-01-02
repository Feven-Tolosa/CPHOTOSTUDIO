import React from "react";
import Header from "./components/Header/Header";
// import "./assets/css/style.css";
import Carousel from "./components/Carousels/Carousels";
import About from "./components/About/About";
import Services from "./components/Services/Services";
import Gallary from "./components/Gallery/Gallary";
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
      <Gallary maxImages={8} />
      <Testimony />
      {/* <Book />
      <Follow /> */}
    </div>
  );
}

export default App;
