import React from "react";
import Button from '../../frontendComponents/button/Button'
import img from "../../assets/ServicesImage/lap.webp";
import img2 from "../../assets/ServicesImage/ddd.webp";

import { FaQuoteLeft } from "react-icons/fa";

const OurServicesDiscovery = () => {
  return (
    <>
      <div className="mabbly-sec relative mb-56 mt-30 ">
        <div className=" bg-black/65 pt-20 ">
          <h1 className="text-9xl container mx-auto  pb-15  font-[900]">
            WHY MABBLY?{" "}
          </h1>
          <div className="div1  container mx-auto  flex">
            <div className="div3 w-[50%] ">
              <div className="img-sec w-[90%] relative aspect-square -mb-56  ">
                <img
                  className="w-full h-full object-cover absolute"
                  src={img}
                  alt="Atrix IT Solutions"
                />
              </div>
            </div>

            <div className="div4 w-[50%] ">
              <h2 className="text-4xl font-medium " >Elevation Through Rich Discovery</h2>
              <p className="text-lg mt-8" >
                At Mabbly, we understand that a well-crafted website is a
                powerful tool for meaningful engagement and sustainable growth.
                Our approach to website design and development hinges on our
                deep commitment to understanding your unique story and
                translating it into a digital experience that resonates with
                your audience. We don’t just build websites; we craft bespoke
                digital experiences that are grounded in truth.
              </p>
             <div className="btn mt-8">
             <Button mybtn={"CONTACT US"} />
             </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="row-span-12 flex">
          <div className="col-span-6  flex flex-col justify-center w-7xl  ">
            <h4 className="text-4xl">FROM THE TEAM</h4>
            <p className="w-3xl  flex gap-4 leading-7 text-xl pt-8 tracking-[2px] ">
              <div className="icon">
                <FaQuoteLeft />
              </div>
              A website isn’t just an end goal—it’s a powerful tool for
              achieving business success. At Mabbly, we create strategic
              foundations that seamlessly align your digital presence with your
              objectives. The result? A website that attracts, engages, and
              converts your ideal customers into lasting relationships.
            </p>
            <p className="w-4xl  leading-7 text-xl pt-8 text-[var(--green)] ] tracking-[2px] pl-9 ">
              Dima Korolchuk, Backend Lead at Mabbly
            </p>
          </div>
          <div className="col-span-6 flex justify-end">
            <div className="img-sec-2">
              <img className="" src={img2} alt="Atrix IT Solutions" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurServicesDiscovery;
