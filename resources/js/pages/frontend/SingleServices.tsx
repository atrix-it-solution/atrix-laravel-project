import React, { useRef, useEffect, useState } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { Head, usePage } from "@inertiajs/react";
import { useLocation } from "react-router-dom";

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
import MasterLayout from "@/layouts/frontendLayouts/MasterLayouts";

  interface SubService {
  services_heading: string;
  services_desc?: string;
  all_services: Array<{
    service_name: string;
    service_desc: string;
    hover_image: string;
  }>;
}

interface CardData {
  cardTitle: string;
  desc: string;
}

interface ProcessCard {
  title: string;
  desc: string;
}

interface FAQCategory {
  category: string;
  content: Array<{
    q: string;
    a: string;
  }>;
}

interface ServiceItem {
  slug: string;
  service_title: string;
  seotitle: string;
  seodescription: string;
  keywords?: string;
  ctImage: string;
  quote: string;
  category: string;
  main_desc: string;
  tags: string[];
  main_image: string;
  icon: string;
  heading_1: string;
  description_1: string;
  img_1: string;
  heading_2: string;
  description_2: string;
  img_2: string;
  img_3: string;
  sub_service: SubService[];
  cards_sec_heading: string;
  cards_sec_data: CardData[];
  why_atrix_heading: string;
  why_atrix_subheading: string;
  why_atrix_desc: string[];
  process_cards: ProcessCard[];
  faqs: FAQCategory[];
}

const SingleServices: React.FC = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const [serviceSlug, setServiceSlug] = useState<string>("");
  const [filteredService, setFilteredService] = useState<ServiceItem | null>(null);

  // Method 1: Get slug from URL path
  useEffect(() => {
    // Get the current pathname
    const pathname = window.location.pathname;
    
    // Extract the slug from the URL
    // Example: /service/branding-graphic-design -> branding-graphic-design
    const slugFromUrl = pathname.split('/').pop();
    
    if (slugFromUrl) {
      setServiceSlug(slugFromUrl);
      
      // Find the service in your data
      const foundService = ServicesData.find(
        (item: ServiceItem) => item.slug === slugFromUrl
      );
      
      if (foundService) {
        setFilteredService(foundService);
      } else {
        // Try alternative slug formats
        const alternativeSlug = slugFromUrl.toLowerCase().replace(/\s+/g, '-');
        const alternativeService = ServicesData.find(
          (item: ServiceItem) => item.slug.toLowerCase() === alternativeSlug
        );
        
        if (alternativeService) {
          setFilteredService(alternativeService);
        }
      }
    }
  }, []);

  // Method 2: If using Inertia, check what's actually in props
  const { props } = usePage();
  // console.log("All props from Inertia:", props);

  // If service is not found, return a fallback
  if (!serviceSlug || !filteredService) {
    return (
      <div className="text-center py-24">
        <h1 className="text-3xl font-bold">Service Not Found</h1>
        <p className="mt-4">Service slug from URL: {serviceSlug || 'Not found'}</p>
        <p className="mt-2">Available services:</p>
        <ul className="list-disc inline-block text-left mt-2">
          {ServicesData.map((item, index) => (
            <li key={index}>
              <a href={`/service/${item.slug}`} className="text-blue-500 hover:underline">
                {item.service_title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Hero section data
  const herodata = {
    title: filteredService.service_title
  };

  return (
    <>
    <MasterLayout>
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

      <HeroCommon heroData={herodata} />

      <div>
        <WebDevelopment secData={filteredService} targetRef={formRef} />
        <ServicesCards secData={filteredService} />
        <WhyNeedBranding secData={filteredService} targetRef={formRef} />

        <div className="img-se">
          <img 
            className="w-full" 
            src={filteredService.ctImage} 
            alt={filteredService.service_title} 
          />
        </div>

        <WhyAtrix secData={filteredService} />
        <ProcessCards secData={filteredService} targetRef={formRef} />

        <div className="container mx-auto my-16">
          <h2 className="max-w-[800px] mx-auto text-2xl md:text-3xl lg:text-5xl font-bold relative px-4">
            <FaQuoteLeft className="absolute -top-0.5 -translate-y-full text-(--blue) text-2xl mb-8" />
            {filteredService.quote}
            <FaQuoteRight className="absolute right-4 text-(--blue) text-2xl mt-2" />
          </h2>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto mt-28 service-cta">
          <div className="grid grid-cols-1 md:grid-cols-12 mt-10 bg-(--blue) rounded-xl p-6 md:p-10">
            <div className="lg:col-span-10 col-span-12 text-center md:text-left">
              <h2 className="sec-heading font-bold">
                Ready to take your brand to the next level?
              </h2>
              <p className="mt-1 max-w-[800px]">
                We&apos;re here to help you create an identity that&apos;s powerful and memorable. 
                Let&apos;s work together to make your brand stand out. Get in touch today, 
                and let&apos;s bring your vision to life!
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
      </div>
    </MasterLayout>
    </>
  );
};

export default SingleServices;