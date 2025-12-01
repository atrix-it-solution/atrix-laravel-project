import React, { useState, useEffect } from 'react';

const testimonials = [
  {
    title: "“Undoubtedly, Mabbly is as strong an agency partner as I’ve come across in my career. And, if an added bonus were required, they’re wonderful to work with.”",
    services: [
      "David Spreckman, Verano",
    ],
  },
  {
    title: "“Thank you all for your hard work. We couldn’t have picked a better partner to help us bring TLN to life. I hope you feel like TLN is yours, too, because it is. So grateful for each of you.”",
    services: [
      "Sarah Kellogg Neff, The Lactation Network",
     
    ],
  },
  {
    title: "“We’re eager to continue working with [Mabbly] because they understand what we’re trying to do and are able to act on it. Their unique data-driven approach allows them to align with the client and really understand objectives.”",
    services: [
      "Dan Hogan, Tolmar",
    ],
  },
 
];

function OurServicesTestimonial() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        setTransitioning(false);
      }, 500); 
    }, 3000); 

   
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center  mt-30">
      <div className="text-center px-4 py-8 max-w-4xl mx-auto h-[300px] overflow-hidden">
        {/* Title */}
        <div
          className={`transition-all duration-500 ease-out transform ${
            transitioning ? 'translate-y-[-100px]' : 'translate-y-0'
          }`}
        >
          <h2 className="text-3xl font-bold text-white">
            {testimonials[currentTestimonial].title}
          </h2>
        </div>

        {/* Services */}
        <div
          className={`transition-all duration-500 ease-out transform ${
            transitioning ? 'translate-y-[100px]' : 'translate-y-0'
          }`}
        >
          <ul className="text-xl text-[var(--green)] mt-4">
            {testimonials[currentTestimonial].services.map((service, idx) => (
              <li key={idx} className="mt-2">
                {service}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default OurServicesTestimonial;
