import React, { useEffect } from "react";

import ServicesData from "../../data/ServicesData";
import { Link } from "@inertiajs/react";
import LinkButton from "../../components/frontendComponents/button/LinkButton";

const OurServices = () => {
 useEffect(() => {
  const handleScroll = () => {
    const cards = document.querySelectorAll<HTMLDivElement>(".service-card");
    const stickyImages = document.querySelectorAll<HTMLImageElement>(".serviceImg");

    const windowHeight = window.innerHeight;
    let closestIndex = -1;
    let minDistance = Infinity;

    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.top + rect.height / 2;
      const distance = Math.abs(windowHeight / 2 - cardCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    cards.forEach((card, index) => {
      const sticky = stickyImages[index];

      if (index === closestIndex) {
        card.style.opacity = "1";
        sticky?.classList.add("active-img");
        if (sticky) sticky.style.opacity = "1";
      } else {
        card.style.opacity = "0.2";
        sticky?.classList.remove("active-img");
        if (sticky) sticky.style.opacity = "0";
      }
    });
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  return () => window.removeEventListener("scroll", handleScroll);
}, []);



  return (
    <div className="Services-section    text-(--whitelight)  ">

      <div className="container mx-auto ">
        <div className=" py-14 md:py-32 ">

          <div className="flex flex-wrap justify-between  gap-10 ">
            <h2 className="sec-heading">Our <br />Services</h2>


            <div className='flex-1 mt-14'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 477 65">
                <path fill="#ffffffbd" d="M0.333333 3C0.333333 4.47276 1.52724 5.66667 3 5.66667C4.47276 5.66667 5.66667 4.47276 5.66667 3C5.66667 1.52724 4.47276 0.333333 3 0.333333C1.52724 0.333333 0.333333 1.52724 0.333333 3ZM475 3L475.255 3.42984L476.82 2.5H475V3ZM438.668 65L441.872 60.197L436.111 59.8239L438.668 65ZM3 3.5H475V2.5H3V3.5ZM474.745 2.57016C459.928 11.3742 441.341 27.8789 438.461 60.47L439.457 60.5581C442.3 28.3895 460.613 12.1303 475.255 3.42984L474.745 2.57016Z"></path>
              </svg>
            </div>

            <div className='mt-1  md:text-end'>
              <div className=' flex md:justify-end'>
                
                <LinkButton  mybtn={'View All Services'} btnLink={'/services'} ></LinkButton>
              </div>
              <p className='md:w-76 text-gray font-normal mt-4'>
                Offer a wide range of services to help businesses establish and enhance their online presence.
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row   gap-2  mt-10  md:mt-20 ">

            <div className="w-full lg:w-1/2  ">
              {ServicesData.map((item , index) => (
                <div
                  key={index}
                  className="service-card opacity-30 transition-opacity duration-300 mt-20 md:mt-40 first:mt-0 "
                >
                  <div className="flex justify-center items-center pb-5">
                    <img key={index}
                      src={item.main_image}
                      alt={item.service_title}
                      className="lg:hidden flex h-80 w-auto"
                    />
                  </div>
                  <Link href={`service/${item.slug}`} className="flex  items-center gap-3 ">
                    <div className="min-w-12 h-12 relative flex justify-center items-center bg-gradient-to-r from-(--blue) to-(--green) rounded-full translate-y-2 mr-1">
                      <img src={item.icon} className="w-6 h-6 filter grayscale-100 brightness-800" />
                      {/* <div className="inline-block ml-2 mt-2 text-2xl">{service.icon}</div> */}
                    </div>
                    <h3 className="heading mt-4 ">{item.service_title} </h3>
                  </Link>
                  <p className="text-[16px] md:text-[16px] mt-6 md:mt-9 text-(--white) leading-7 md:leading-8">
                  {item.main_desc}
                  </p>

                  
                  {item.tags && (
                    <div className="flex flex-wrap mt-6 md:mt-10">
                      {item.tags.map((tag, i) => (
                        <div
                          key={i}
                          className="custom-gradient duration-300 rounded-full px-4 py-1 md:px-6 md:py-2 mt-2 mr-2 text-[14px] lg:text-[16px] "
                        >
                          {tag}
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              ))}
            </div>

            <div className="w-1/2  relative lg:block   hidden  ">
              <div className="sticky top-[25vh]  w-[75%] min-h-[400px] ">
                {ServicesData.map((serviceimg, index) => (
                  <img
                    key={index}
                    src={serviceimg.main_image}
                    alt={serviceimg.service_title}
                    className="serviceImg absolute z-10 left-1/4  h-full w-full opacity-0 transition-all duration-200"
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};



export default OurServices;

