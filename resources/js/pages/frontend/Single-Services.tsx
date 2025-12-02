import React, { useRef, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "@inertiajs/react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";


import WebDevelopment from "../../components/frontendComponents/services/WebDevelopment";
import ServicesCards from "../../components/frontendComponents/services/ServicesCards";
import WhyNeedBranding from "../../components/frontendComponents/services/WhyNeedBranding";
import WhyAtrix from "../../components/frontendComponents/services/whyAtrix";
import ProcessCards from "../../components/frontendComponents/ProcessCards";
import ServiceFrom from "../../components/frontendComponents/services/ServiceFrom";
import OurPortfolio from "../../components/frontendComponents/OurPortfolio";
import FaqSection from "../../components/frontendComponents/FaqSection";
import Button from "../../components/frontendComponents/button/Button";
import ServicesData from "../../data/ServicesData";
import HeroCommon from "../../components/frontendComponents/herocommon/HeroCommon";
import { Head } from "@inertiajs/react";

interface ServiceItem {
  slug: string;
  service_title: string;
  seotitle: string;
  seodescription: string;
  keywords?: string;
  ctImage: string;
  quote: string;
  category: string;
}

interface RouteParams {
  service_id: string;
}



const Service: React.FC = () => {
  const { service_id } = useParams<RouteParams>();
  const navigate = useNavigate();
  const location = useLocation();
  const formRef = useRef<HTMLDivElement | null>(null);

  // Find the matched service
  const filteredService = ServicesData.find((item) => item.slug === service_id);

  // Redirect to 404 if ID is invalid
  useEffect(() => {
    if (!service_id || service_id === "undefined" || !filteredService) {
      navigate("/page-not-found", { replace: true });
    }
  }, [location.pathname]);

  // Don't render if invalid (avoid flicker)
  if (!filteredService) return null;


  // hero section data  
  const herodata = [
    {
      title: filteredService.service_title
    }
  ];

  return (
    <>
    <Head>
        <title>{filteredService.seotitle}</title>
        <meta name="description" content={filteredService.seodescription} />
        {filteredService.keywords && (
          <meta name="keywords" content={filteredService.keywords} />
        )}
    </Head>
      


      <style>
        {`
          #mybtn2 button:hover {
            background-color: white;
            color: var(--blue);
          }
        
        `}
      </style>

      <HeroCommon heroData={herodata[0]} />

      <div className="">
        {/* <ServiceHeroBanner /> */}

        {/* <div className="container mx-auto  pt-[200px] pb-[180px]" >
          <h1 className="medium-heading  font-bold text-center">{filteredService.service_title}</h1>
        </div> */}

        <WebDevelopment secData={filteredService} targetRef={formRef} />
        <ServicesCards secData={filteredService} />
        <WhyNeedBranding secData={filteredService} targetRef={formRef} />

        <div className="img-se">
          <img className="w-full" src={filteredService.ctImage} alt="Atrix IT Solutions" />
        </div>


        <WhyAtrix secData={filteredService} />
        <ProcessCards secData={filteredService} targetRef={formRef} />

        <div className="container mx-auto my-16">
          <h2 className="max-w-[800px] mx-auto text-2xl md:text-3xl lg:text-5xl font-bold relative">
            <FaQuoteLeft className="absolute -top-0.5 -translate-y-full text-(--blue) text-2xl mb-8" />
            {filteredService.quote}
            <FaQuoteRight className="absolute right-0 text-(--blue) text-2xl mt-2" />
          </h2>
        </div>

        {/* CTA Section */}
        <div className="container  mx-auto mt-28 service-cta">
          <div className="row grid grid-cols-1 md:grid-cols-12 mt-10 bg-(--blue) rounded-xl p-6 md:p-10">
            <div className="lg:col-span-10 col-span-12 text-center md:text-left">
              <h2 className="sec-heading font-bold">
                Ready to take your brand to the next level?
              </h2>
              <p className="mt-1 max-w-[800px]">
                We’re here to help you create an identity that’s powerful and memorable. Let’s work together to make your brand stand out. Get in touch today, and let’s bring your vision to life!
              </p>
            </div>
            <div
              id="mybtn2"
              className="lg:col-span-2 col-span-12 flex justify-center items-center lg:justify-end mt-4 lg:mt-0"
            >
              <Button mybtn="Contact us!" targetRef={formRef} />
            </div>
          </div>
        </div>

        {/* Scroll target form */}
        <div ref={formRef}>
          <ServiceFrom />
        </div>

        <OurPortfolio />
        <FaqSection categoryName={filteredService.category} />
        {/* <FaqSection secData={filteredService} /> */}
      </div>
    </>
  );
};

export default Service;
