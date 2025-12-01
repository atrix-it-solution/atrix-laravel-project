import React, { useEffect } from "react";
const img1 = "/assets/About_sec_scroll_imgs/img1.png";
const img2 = "/assets/About_sec_scroll_imgs/img2.png";
const img3 = "/assets/About_sec_scroll_imgs/img3.png";
const img4 = "/assets/About_sec_scroll_imgs/img4.png";

const About_sec_scroll = () => {

  useEffect(() => {
    const elements = document.querySelectorAll(".animate-on-scroll");
    const observerOptions = {
      threshold: 0.2, // 20% of the element should be visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target); // stop observing once it comes into view
        }
      });
    }, observerOptions);

    elements.forEach((element) => {
      observer.observe(element);
    });
  }, []);

  return (
    <div className="container mx-auto md:pb-24 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Image Grid (Left Side) */}
        <div className="md:col-span-5 relative">
          <div className="grid grid-cols-2 md:sticky md:top-6">
            <div className="image-box animate-on-scroll">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden p-2">
                <img src={img1} alt="Atrix IT Solutions" className="w-full h-full object-cover rounded-2xl" />
              </div>
              <div className="aspect-[4/5] rounded-3xl overflow-hidden p-2">
                <img src={img3} alt="Atrix IT Solutions" className="w-full h-full object-cover rounded-2xl" />
              </div>
            </div>

            <div className="pt-14 image-box animate-on-scroll">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden p-2">
                <img src={img2} alt="Atrix IT Solutions" className="w-full h-full object-cover rounded-2xl" />
              </div>
              <div className="aspect-[4/5] rounded-3xl overflow-hidden p-2">
                <img src={img4} alt="Atrix IT Solutions" className="w-full h-full object-cover rounded-2xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Text Section (Right Side) */}
        <div className="md:col-span-6 flex flex-col lg:ml-20">
         <div className="w-full py-8">
          {blurbContent.map((item, index) => (
          <div key={index} className="md:p-3 text-section animate-on-scroll">
           <h3 className="mb-1 heading">{item.description}</h3>
           <p className="text-white/55 text-[16px]">{item.pText}</p><br />
           <p className="text-white/55 text-[16px]">{item.pText1}</p>
          </div>
    ))}
  </div>
</div>



      </div>
    </div>
  );
};

export default About_sec_scroll;

const blurbContent = [
  {
    id: 1,
    description: "Our Story",
    pText:
      "Established in 2020 with a vision to serve the best and most affordable digital solutions designed to deliver results. We have a team of expert designers, developers, and marketing executives who combine their individual skills to form a strong and successful team. Our team is passionate about using the latest technologies and best practices to deliver real results.",
    pText1: "We offer a wide range of services, including web development, branding, digital marketing, visual effects, photo and video production and logistics. Every solution we create is designed to help businesses grow, improve their online presence, and stay ahead in today’s fast-changing digital world."
  },
  {
    id: 2,
    description: "Our Mission",
    pText:
      "Our mission is to create high-performance digital solutions that are effective in facilitating the success of a business. By using the latest technology, our team supports clients in maximizing their online performance potential for long-term success.",
  },
  {
    id: 3,
    description: "Our Vision",
    pText:
      "Through innovative, smart, and reliable digital solutions, we aim to empower businesses towards success. Our vision is to help businesses succeed in an ever-evolving digital world through advanced technology and professional guidance.",
  },
];
