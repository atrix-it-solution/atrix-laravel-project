import React, { useEffect, useRef, useState } from "react";
// import { useFAQ } from "../GetContextApi/FAQGetContext";
interface FAQItem {
  q: string;
  a: string;
}

interface FaqsCardProps {
  faqsList: FAQItem;
  idx: number;
  isOpen: boolean;
  onClick: (idx: number) => void;
}

interface FaqSectionProps {
  categoryName: string;
}

const FaqsCard: React.FC<FaqsCardProps> = (props) => {
    const answerElRef = useRef<HTMLDivElement>(null);
    const [answerH, setAnswerH] = useState("0px");
    const { faqsList, idx, isOpen, onClick } = props;

    const handleOpenAnswer = () => {
        onClick(idx); // Notify parent about the click
    };

    useEffect(() => {
        // Update height when open state changes
       if (isOpen && answerElRef.current) {
      const textHeight = answerElRef.current.children[0]?.clientHeight || 0;
      setAnswerH(`${textHeight}px`);
    } else {
      setAnswerH("0px");
    }
    }, [isOpen]);

    return (
        <div className={`accordian overflow-hidden  ${isOpen ? "active" : ""}`} key={idx}>
            <h4 
                className={`accordian-title ${isOpen ? "active" : ""}`}
                onClick={handleOpenAnswer}
            >
                {faqsList.q}
                {isOpen ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-100 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 12H4"
                        />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-200 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                )}
            </h4>
            <div
                ref={answerElRef}
                className="duration-300"
                style={{ height: answerH }}
            >
                <div className="bodyContent"
                dangerouslySetInnerHTML={{ __html: faqsList.a }}>
                    {/* <p>{faqsList.a}</p> */}
                </div>
            </div>
        </div>
    );
};

const faqsData = [
    {
        category: "Frequently Asked Questions ",
        content: [
            {
                q: "Will my website be mobile-friendly?",
                a: " Yes! We design websites that adjust to all screen sizes, ensuring a smooth user experience. A mobile-friendly site also helps improve search rankings.",
            },
            {
                q: "How long does it take to build a website?",
                a: " It typically takes 1 to 4 months, depending on the complexity and features required. The process includes planning, design, development, and testing.",
            },
            {
                q: "What's the difference between a website and a web app?",
                a: "A website provides information, while a web app allows user interaction. Web apps often have advanced features like forms and dashboards.",
            },
            {
                q: "What programming languages are used in web development?",
                a: " Common languages include HTML, CSS, JavaScript, and Python. The choice depends on the project requirements and functionality needed.",
            },
            {
                q: "How much does it cost to develop a website?",
                a: "The cost varies based on complexity, features, and design. Simple websites cost less, while custom-built sites are more expensive.",
            },
        ]
    },
];

const FaqSection: React.FC<FaqSectionProps>  = ({categoryName}) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
//         const { faqData } = useFAQ();
    

    const handleToggle = (idx: number) => {
        setOpenIndex(openIndex === idx ? null : idx);

   };


   const filteredFaqs = faqsData.filter(
    (faq) => faq.category.toLowerCase() === categoryName.toLowerCase()
  );

//   if (filteredFaqs.length === 0) {
//     return <p className="text-center">No FAQs found for {categoryName}.</p>;
//   }

    return (
        // <section className="faqsec">
        //     <div className="container mx-auto max-w-[900px]">
        //         <h2 className="text-4xl faqCatHeading font-semibold mb-10 text-center">
        //         Frequently Asked Questions
        //         </h2>
        //         <div className="mt-16">
        //         {filteredFaqs.map((faq, idx) => (
        //             <FaqsCard
        //             key={idx}
        //             idx={idx}
        //             faqsList={{ q: faq.name, a: faq.fullDescription }}
        //             isOpen={openIndex === idx}
        //             onClick={handleToggle}
        //             />
        //         ))}
        //         </div>
        //     </div>
        // </section>
        <section className="faqsec ">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 gap-y-15 gap-x-15 max-w-[900px] mx-auto">
                    {filteredFaqs.map((item, index) => (
                        <div className="leading-relaxed mt-12" key={index}>
                            <div className="space-y-3 text-center">
                                <h2 className="text-4xl faqCatHeading font-semibold mb-10">
                                Frequently Asked Questions
                                </h2>
                            </div>
                            <div className="mt-16 ">
                                {item.content.map((faq, idx) => (
                                    <FaqsCard 
                                        key={idx}
                                        idx={idx} 
                                        faqsList={faq} 
                                        isOpen={openIndex === idx}
                                        onClick={handleToggle}
                                        
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FaqSection;