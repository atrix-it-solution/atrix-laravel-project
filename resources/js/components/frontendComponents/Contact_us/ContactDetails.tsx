import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "@inertiajs/react";
import "./ContactDetails.css";
import { MdPhoneInTalk } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { BsChatDots } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";

const cardsContent = [
  // {
  //   title: "Contact",
  //   desc: "Have questions? Fill out our contact form, and we'll get back to you as soon as possible.",
  //   btn_name: "Phone No.",
  //   icon: <MdPhoneInTalk />,
  // },
  {
    link: "mailto:info@atrixitsolutions.com",
    title: "Get Support",
    desc: "Our support team is ready to assist you with quick and reliable solutions",
    btn_name: "Email Id",
    icon: <BiSupport />,
  },
  {
    title: "Chat With Us",
    desc: "Want instant answers? Start a chat, and our team will be happy to help!",
    btn_name: "Open Chat",
    icon: <BsChatDots />,
  },
  {
    link: "https://maps.app.goo.gl/3kZmdKfvDvsaVdSeA",
    title: "Our Location",
    desc: "Visit us at our office. We're here to connect and support your business needs.",
    btn_name: "Google Map",
    icon: <FaMapMarkerAlt />,
  },
];

const ContactDetails = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('contact-cards');
      if (!element) return;

      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        setIsVisible(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div id="contact-cards" className="container mx-auto">
      <div className={`contact-cards-wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        {cardsContent.map((item, index) => {
          const cardClass = item.title.toLowerCase().replace(/\s+/g, "-");

          return (
            <div
              key={index}
              className={`contact-card ${cardClass}-card flex flex-col justify-between bg-[var(--black)] py-10 px-8 rounded-3xl shadow-2xl shadow-white/5 relative h-full transition-all duration-500 ease-out ${isVisible ? "opacity-100" : "opacity-0"}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Icon Background */}
              <div className="card-bg-icon absolute text-7xl bottom-6 right-6 opacity-5 pointer-events-none">
                {item.icon}
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold">{item.title}</h3>
                <p className="mt-4 mb-6 flex-grow">{item.desc}</p>

                {/* Button */}
                {item.link ? (
                  <Link
                    href={item.link}
                    target={item.btn_name === "Google Map" ? "_blank" : "_self"}
                    className="font-bold pt-4 flex items-center cursor-pointer hover:text-[var(--blue)] self-start group mt-auto"
                  >
                    {item.btn_name}
                    <span className="border border-white/45 ml-2 flex justify-center items-center h-6 w-6 rounded-full -rotate-45 text-[var(--blue)] group-hover:rotate-1 group-hover:bg-[var(--blue)] group-hover:text-white group-hover:border-[var(--blue)] duration-300">
                      <FaArrowRight />
                    </span>
                  </Link>
                ) : (
                  <div
                    className="font-bold pt-4 flex items-center cursor-pointer hover:text-[var(--blue)] self-start group mt-auto"

                          onClick={() => console.log(item.btn_name)} // optional: handle click

                  >
                    {item.btn_name}
                    <span className="border border-white/45 ml-2 flex justify-center items-center h-6 w-6 rounded-full -rotate-45 text-[var(--blue)] group-hover:rotate-1 group-hover:bg-[var(--blue)] group-hover:text-white group-hover:border-[var(--blue)] duration-300">
                      <FaArrowRight />
                    </span>
                  </div>
                )}


              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactDetails;