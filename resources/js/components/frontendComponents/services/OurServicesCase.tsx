import React from "react";
import Button from '../../frontendComponents/button/Button'
import img from "../../assets/ServicesImage/earring.jpg";
import img2 from "../../assets/ServicesImage/baby.webp";
import img3 from "../../assets/ServicesImage/french.jpg";
import { FaArrowTurnUp } from "react-icons/fa6";

const content = [
  {
    title: "EDELMAN ZENO GROUP",
    services: [
      "Digital Strategy",
      "Graphic Design",
      "Website Design & Development",
    ],
    image: img, 
  },
  {
    title: "The Lactation Network",
    services: [
     "Full Partnership",
      
    ],
    image: img2, 
},
  {
    title: "Website Design & DevelopmentWebsite Design & Development",
    services: [
      "Content Creation",
      "Digital Strategy",
      "Website Design & Development",
      
    ],
    image: img3, 
  },
];

const OurServicesCase = () => {
  return (
    <>
      <div className="container mx-auto mt-28">
        <div className="case-sec flex items-center gap-13">
          <div className="heading">
            <h1 className="text-9xl container mx-auto pb-1 font-[900]">
              CASE STUDIES
            </h1>
          </div>
          <div className="btn">
            <Button mybtn={"LEARN MORE"} />
          </div>
        </div>
        <p className="text-xl tracking-[2px] ">
          Building beautiful websites for our partners.
        </p>
      </div>

      <div className="card-sec">
        <div className="row flex flex-wrap h-[700px] mt-20">
          {content.map((item, index) => (
            <div
              key={index}
              className="col-4 w-[33.3%] border-2 group relative"
            >
              <div className="text-sec pt-15 px-10  flex flex-col justify-center        opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                <h2 className="text-3xl font-bold text-[var(--green)] ">{item.title}

                </h2>
                {item.services.map((service, idx) => (
                  <h5 key={idx} className="text-xl mt-3 ">
                    {service} 
                  </h5>))}

                <div className="icon text-6xl rotate-90 absolute bottom-8 right-12 ">
                <FaArrowTurnUp />
                </div>
              </div>
             

              {/* Image section */}
              <div
                className="img-sec absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  backgroundImage: `url(${item.image})`, 
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OurServicesCase;
