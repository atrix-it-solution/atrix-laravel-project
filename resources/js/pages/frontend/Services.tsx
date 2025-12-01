import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import OurServiceCard from "../../components/frontendComponents/services/OurServiceCard";
import LinkButton from "../../components/frontendComponents/button/LinkButton";
import HeroCommon from "../../components/frontendComponents/herocommon/HeroCommon";
import SeoTags from "../../components/frontendComponents/seoTags/SeoTags";
import MasterLayout from "@/layouts/frontendLayouts/MasterLayouts";

const chess_image = "/assets/services/chess.png"

const Services = () => {

  const heroData = { title: 'Services', desc: 'Built for brands that demand more ~ more clarity, more impact, and real conversion that drives growth.' }
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration (in ms)
      once: true, // Animation happens once
    });
  }, []);

  return (
    <>
    <MasterLayout>
      <SeoTags
        title="Our Services | Explore Our IT Services by Atrix IT Solutions"
        description="Discover the wide range of IT services offered by Atrix IT Solutions. , including branding, digital marketing, website development, and visual effects."
      />

      <HeroCommon heroData={heroData} />

      <OurServiceCard />

      {/* HOW WE DO IT */}
      <div className="container mx-auto mt-16 leading-0 " data-aos="fade-up">
        <h2 className="text-4xl md:text-8xl font-bold text-center py-15 sec-heading ">
          How We Do It
        </h2>
        <div className="grid grid-cols-12 md:gap-9 space-y-5 overflow-x-hidden  overflow-y-visible">
          <div
            className="col-span-12 md:col-span-4 border-t-1 border-white/20"
            data-aos="fade-right"
          >
            <h3 className="heading  pt-10 break-words">

              Start With  <br />
              Understanding
            </h3>
            <p className="text-[16px] leading-6 pt-3">
              Every partnership begins with an ask. But our magic is in the
              understanding, finding the root of what needs to be solved—your
              pivotal problem.
            </p>
            <p>

            </p>
          </div>


          <div
            className="col-span-12 md:col-span-4 border-t-1 border-white/20"
            data-aos="fade-up"
          >
            <h3 className="heading pt-10 break-words">

              Craft <br />
              For Impact
            </h3>
            <p className="text-[16px] leading-6 pt-3">
              With our focus clear, we build a strategic framework for brand
              positioning.
            </p>
          </div>


          <div
            className="col-span-12 md:col-span-4 border-t-1 border-white/20"
            data-aos="fade-left"
          >
            <h3 className="heading pt-10 break-words">

              Accelerate For <br />
              Growth
            </h3>
            <p className="text-[16px] leading-6  pt-3">
              We never set it and forget it. We constantly monitor our
              ecosystem, analyze performance.
            </p>
          </div>
        </div>
      </div>

      {/* CTA SECTION */}

      <div
        className="container mx-auto mt-35 mb-11 "
        data-aos="zoom-in-up"
      >
        <div className="grid grid-cols-12 p-8 lg:p-15 bg-[#262626] rounded-2xl">
          <div className="col-span-12 md:col-span-6 flex justify-start items-center">
            <div className="brand-text-sec">

              <h2 className="sec-heading font-[900]">
                Ready To Elevate <br /> Your Brand?
              </h2>
              <p className="pt-6 text-[16px] leading-6">
                Let’s connect so we can understand your business objectives.
              </p>
              <div className="btn mt-10 flex">
                <LinkButton bgColor={"bg-[#5e5c5c]"} hoverColor={"hover:bg-[#00B140]"} mybtn={"Let's Talk"} btnLink="/contact-us" />
              </div>
            </div>
          </div>

          <div className="hidden md:col-span-6 md:flex justify-center items-center">
            <div className="img-sec w-[50%]">
              <img src={chess_image} alt="Atrix IT Solutions" />
            </div>
          </div>
        </div>
      </div>
    </MasterLayout>
    </>
  );
};

export default Services;
