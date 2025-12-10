import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProcessCard {
  title: string;
  desc: string;
}

interface ProcessCardsProps {
  secData: {
    service_title: string;
    process_cards: ProcessCard[];
  };
  targetRef?: React.RefObject<HTMLDivElement | null>;
}

const ProcessCards:React.FC<ProcessCardsProps> = ({ secData }) => {
  const [activeCard, setActiveCard] = useState(0);

  // Variants for animation
  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  };

  const rotateVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  };

  return (
    <section className="process-cards-section my-36 relative z-0">
      <div className="container mx-auto">
        <h2 className="sec-heading text-center my-10">
          Our {secData.service_title} Process
        </h2>

        <div className="process-cards-wrapper flex flex-wrap gap-5 justify-center">
          {secData.process_cards.map((item, index) => {
            const isActive = activeCard === index;

            return (
              <div
                key={index}
                onClick={() => setActiveCard(index)}
                className={`relative cursor-pointer p-10 rounded-2xl bg-[var(--black)] text-white transition-all duration-500 overflow-hidden ease-in-out flex-grow 
                  ${
                    isActive
                      ? "flex-grow-[2] max-w-[500px]"
                      : "flex-grow-[1] max-w-[120px]"
                  }`}
                style={{
                  height: "400px", // ✅ Fixed height (no jumping)
                }}
              >
                {/* Background Number */}
                <span
                  className={`absolute font-bold text-white pointer-events-none z-0 select-none leading-none transition-all duration-500
                    ${
                      isActive
                        ? "opacity-20 -bottom-10 -right-1 text-[100px] md:text-[140px]"
                        : "opacity-40 top-2 right-2 text-[30px] md:text-[41px]"
                    }`}  >
                  0{index + 1}
                </span>

                {/* Title & Description with animation */}
                <div className="relative z-10 h-full pt-8 flex flex-col justify-start">
                  <AnimatePresence mode="wait">
                    {isActive ? ( 
                      <motion.div
                        key="content"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={{
                          visible: {
                            transition: {
                              staggerChildren: 0.2,
                              delayChildren: 0.2,
                            },
                          },
                        }}
                        className=" "
                      >
                        {/* Heading */}
                        <motion.h3
                          className="text-3xl font-bold mb-4"
                          variants={contentVariants}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                          {item.title}
                        </motion.h3>

                        {/* Description */}
                        <motion.p
                          className="text-[16px] "
                          variants={contentVariants}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                          {item.desc}
                        </motion.p>
                      </motion.div>
                    ) : (
                      <motion.h3
                        key="rotated"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={rotateVariants}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="absolute -bottom-6 left-6 right-6 transform -rotate-90 origin-bottom-left text-xl font-extrabold w-[350px] uppercase truncate"
                      >
                        {item.title}
                      </motion.h3>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 flex justify-center">{/* button here */}</div>
      </div>
    </section>
  );
};

export default ProcessCards;
