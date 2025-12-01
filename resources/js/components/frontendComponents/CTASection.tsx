import React, { useEffect } from "react";
import LinkButton from "../../components/frontendComponents/button/LinkButton";

const CTASection: React.FC = () => {
  useEffect(() => {
    const cta = document.querySelector(".cta-animated-block") as HTMLElement | null;

    if (!cta) return; //  prevent null errors ❗

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cta.classList.add("cta-animate-in");
          observer.unobserve(cta);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(cta);

    return () => observer.disconnect(); // cleanup
  }, []);

  return (
    <div className="container mx-auto mt-14 md:mt-28">
      <div className="grid grid-cols-1 md:grid-cols-12 mt-10 bg-(--blue) rounded-xl p-6 md:p-10 cta-animated-block">
        
        {/* Text */}
        <div className="md:col-span-10 col-span-12 text-center md:text-left">
          <h3 className="text-white sub-sec-heading">
            Say Goodbye to IT Hassles – Get Expert Solutions Now!
          </h3>
        </div>

        {/* Button */}
        <div className="md:col-span-2 col-span-12 flex justify-center items-center md:justify-end mt-4 md:mt-0">
          <LinkButton mybtn="Contact Us!" btnLink="/contact-us">
            Contact Us!
          </LinkButton>
        </div>

      </div>
    </div>
  );
};

export default CTASection;
