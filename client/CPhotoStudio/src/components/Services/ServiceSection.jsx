import React from "react";

const ServiceSection = ({ title, description, imageUrl, reverse }) => {
  return (
    <div
      className={`flex flex-col md:flex-row ${
        reverse ? "md:flex-row-reverse" : ""
      } items-center mb-5`}
    >
      <img src={imageUrl} alt={title} className="w-full md:w-1/2" />
      <div className="flex flex-col items-center md:w-1/2 p-4 text-center md:text-left">
        <h4 className="text-xl font-bold mb-2 text">{title}</h4>
        <p className="hidden md:block">{description}</p>
        <a href="#" className="btn alime-btn mb-3">
          View more...
        </a>
      </div>
    </div>
  );
};

export default ServiceSection;
