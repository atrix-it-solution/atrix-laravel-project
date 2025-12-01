import React, { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import { AiOutlineArrowRight } from "react-icons/ai";
import ServicesData from "../../../data/ServicesData";
import AOS from "aos"; // Import AOS
import "aos/dist/aos.css"; // Import AOS styles

const OurServiceCard = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
      });
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  const servicesLength = ServicesData.length;
  const columns = screenSize.width < 767 ? 1 : screenSize.width < 1279 ? 2 : 3;
  // const columns = 3
  // console.log("columns",columns)
  const servicesPerColumn = Math.ceil(servicesLength / columns);
  const dividedServices = [];

  for (let i = 0; i < columns; i++) {
    const start = i * servicesPerColumn;
    const end = start + servicesPerColumn;
    const chunk = ServicesData.slice(start, end);
    dividedServices.push(chunk);
  }

  // console.log(dividedServices);



  return (
    <>
      <div className="container mx-auto  ">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-20 -mt-20 ">
          {dividedServices.map((outerItem, outerIndex) => (
            <div key={outerIndex}>
              {outerItem.map((item, index) => (
                <div
                  key={index}
                  className=" inline-block w-full pt-20"
                  data-aos="fade-up" // Add fade-up animation when the item appears
                >
                  <Link href={`/service/${item.slug}`} className="cursor-pointer">
                    <h3 className="heading font-bold flex items-center gap-2">
                      <div
                        className="icon-bg min-w-12 h-12 relative flex justify-center items-center bg-gradient-to-r from-(--blue) to-(--green) rounded-full translate-y-2 mr-1 mb-3"
                        data-aos="zoom-in" // Zoom-in effect for the icon
                      >
                        <img
                          className="w-6 h-6 filter grayscale-100 brightness-800"
                          src={item.icon}
                          alt="Atrix IT Solutions"
                        />{" "}
                      </div>
                      {item.service_title}
                    </h3>
                  </Link>
                  <ul className="mt-2 text-lg">
                    {item.tags.map((tagItem, tagindex) => (
                      <li
                        key={tagindex}
                        className="flex items-center justify-between border-b-2 border-white/15 hover:border-(--green) pb-4 pt-4 group cursor-pointer hover:scale-102 duration-350"
                      // data-aos="fade-left" // Add fade-left animation for the list items
                      >
                        <Link
                          href={`/service/${item.slug}`}
                          className="flex items-center justify-between w-full group-hover:text-(--green) font-bold"
                        >
                          <span>{tagItem}</span>
                          <AiOutlineArrowRight className="text-gray-500 text-2xl group-hover:text-(--green) -rotate-45 group-hover:rotate-2 transform duration-300 group" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

          ))}
        </div>


        {/* <div className="columns-1 md:columns-2 xl:columns-3 gap-20 -mt-20 ">
          {ServicesData.map((item, index) => (
            <div
              key={index}
              className=" inline-block w-full pt-20"
              data-aos="fade-up" // Add fade-up animation when the item appears
            >
              <Link href={`/service/${item.slug}`} className="cursor-pointer">
                <h3 className="heading font-bold flex items-center gap-2">
                  <div
                    className="icon-bg min-w-12 h-12 relative flex justify-center items-center bg-gradient-to-r from-(--blue) to-(--green) rounded-full translate-y-2 mr-1 mb-3"
                    data-aos="zoom-in" // Zoom-in effect for the icon
                  >
                    <img
                      className="w-6 h-6 filter grayscale-100 brightness-800"
                      src={item.icon}
                      alt="Atrix IT Solutions"
                    />{" "}
                  </div>
                  {item.service_title}
                </h3>
              </Link>
              <ul className="mt-2 text-lg">
                {item.tags.map((tagItem, tagindex) => (
                  <li
                    key={tagindex}
                    className="flex items-center justify-between border-b-2 border-white/15 hover:border-(--green) pb-4 pt-4 group cursor-pointer hover:scale-102 duration-350"
                  // data-aos="fade-left" // Add fade-left animation for the list items
                  >
                    <Link
                      href={`/service/${item.slug}`}
                      className="flex items-center justify-between w-full group-hover:text-(--green) font-bold"
                    >
                      <span>{tagItem}</span>
                      <AiOutlineArrowRight className="text-gray-500 text-2xl group-hover:text-(--green) -rotate-45 group-hover:rotate-2 transform duration-300 group" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div> */}
      </div>
    </>
  );
};

export default OurServiceCard;