import React from "react";
import Button from "../Button";

const WebDevelopment = ({ secData, targetRef }) => {
  return (
    <div className="web-development-sec mb-20 lg:mb-36 pt-4">
      <div className="container  mx-auto  lg:px-0">
        {/* First Row - Maintains exact 6-6 column layout on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          <div className="lg:col-span-6">
            <h2 className="sec-heading font-bold max-w-[400px] ">{secData.heading_1}</h2>
            <p className="mt-3 lg:mt-[10px] max-w-full lg:max-w-[590px]">
              {secData.description_1}
            </p>
          </div>
          <div className="lg:col-span-6 flex ">
            <div className="w-full lg:w-auto ml-0 lg:ml-auto">
              <div className="w-[434px] h-[315px]">
                <img src={secData.img_1} alt="Atrix IT Solutions" className="w-full h-full object-cover" />
              </div>

            </div>
          </div>
        </div>

        {/* Second Row - Maintains exact 7-5 column layout on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 mt-8 lg:mt-12 pt-[100px]">
          <div className="lg:col-span-7">
            <div className="flex gap-3 ">
              <div className="w-[420px] aspect-square " ><img src={secData.img_2} alt="Atrix IT Solutions" className="w-full h-full object-cover" /></div>
              <div className="w-[420px] aspect-square translate-y-[-100px] " ><img src={secData.img_3} alt="Atrix IT Solutions" className="w-full h-full object-cover" /></div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-end">
            <h2 className="sec-heading font-bold">{secData.heading_2}</h2>
            <p className="mt-3 lg:mt-[10px] max-w-full lg:max-w-[570px]">
              {secData.description_2}
            </p>
            <div className="mt-4 lg:mt-5">
              <Button mybtn="Get A Quote" targetRef={targetRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebDevelopment;