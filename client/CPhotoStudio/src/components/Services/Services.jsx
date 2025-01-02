import React from "react";
import ServiceSection from "./ServiceSection";

const Services = () => {
  const services = [
    {
      title: "Mels",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
      imageUrl: "../../../public/image/bg-img/7.jpg",
      reverse: false,
    },
    {
      title: "Kids",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
      imageUrl: "../../../public/image/bg-img/21.jpg",
      reverse: true,
    },
    {
      title: "Genfo",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
      imageUrl: "../../../public/image/bg-img/6.jpg",
      reverse: false,
    },
  ];

  return (
    <section className="services p-5 bg-customGreen">
      <h1 className="text-4xl font-bold text-center mb-5 text-white pb-12">
        Services
      </h1>
      {services.map((service, index) => (
        <ServiceSection
          key={index}
          title={service.title}
          description={service.description}
          imageUrl={service.imageUrl}
          reverse={service.reverse}
        />
      ))}
    </section>
  );
};

export default Services;
