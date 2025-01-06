import React, { useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Page/Home/Home";
import BookingForm from "./Page/BookingForm/BookingForm";
import Layout from "./components/Layout/Layout";

const App = () => {
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const gallaryRef = useRef(null);
  const testimonialRef = useRef(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              aboutRef={aboutRef}
              servicesRef={servicesRef}
              gallaryRef={gallaryRef}
              testimonialRef={testimonialRef}
            >
              <Home />
            </Layout>
          }
        />
        <Route
          path="/book"
          element={
            <Layout>
              <BookingForm />
            </Layout>
          }
        />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
