import React from 'react'
import Button from '../../frontendComponents/button/Button'


interface Card {
    cardTitle: string;
    desc: string;
}

interface WhyNeedBrandingProps {
    secData: {
        service_title: string;
        cards_sec_data: Card[];
    };
    targetRef?: React.RefObject<HTMLDivElement | null>;
}

const WhyNeedBranding:React.FC<WhyNeedBrandingProps> = ({ secData, targetRef }) => {

    return (
        <div className='why-need-branding my-36' >
            <div className="container mx-auto ">
                <h2 className='sec-heading font-bold text-center mb-14 ' >Why do you need  {secData.service_title}</h2>
                <div className="branding-Cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {secData.cards_sec_data.map((item, index) => (
                        <div key={index} className="branding-card p-12 bg-(--black) rounded-2xl">
                            <h3 className='heading mb-2 font-bold' >{item.cardTitle}</h3>
                            <p>{item.desc}</p>
                        </div>
                    ))}

                </div>
                <div className='mt-14 flex justify-center' >
                <Button mybtn="Get Your Quote Now" targetRef={targetRef} />

                    </div>
            </div>


        </div>
    )
}

export default WhyNeedBranding