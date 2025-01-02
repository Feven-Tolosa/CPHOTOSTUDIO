import React from "react";

const ServiceSection = ({ title, description, imageUrl, reverse }) => {
  return (
    <div>
      <div
        className={`flex flex-col md:flex-row ${
          reverse ? "md:flex-row-reverse" : ""
        } items-center mb-5`}
      >
        <img src={imageUrl} alt={title} className="w-full md:w-1/2" />
        <div className="flex flex-col items-center md:w-1/2 p-4 text-center md:text-left">
          <h4 className="text-xl font-bold mb-2 text">{title}</h4>
          <p className="hidden md:block w-80 text-center">{description}</p>
          <a
            href="#"
            className="mb-3 border-2 border-customOrange rounded-full bg-transparent px-4 text-white py-3 m-4 hover:bg-customOrange"
          >
            View more...
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;
