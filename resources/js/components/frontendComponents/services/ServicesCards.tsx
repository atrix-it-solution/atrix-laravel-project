import React, { useEffect, useState } from 'react';
import hover_img from '../../assets/service-hover.jpg';
import './ServicesCards.css';


const serviceCardsData = [
    {
        service_title: 'Branding',
        service_desc:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam ut laborum architecto provident tempore recusandae at exercitationem! Praesentium blanditiis laborum quas repellendus. Ab, sed quidem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, id.',
        hover_image: hover_img,
    },
    {
        service_title: 'Logo Design',
        service_desc:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam ut laborum architecto provident tempore recusandae at exercitationem! Praesentium blanditiis laborum quas repellendus. Ab, sed quidem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, id.',
        hover_image: hover_img,
    },
    {
        service_title: 'UI/UX Design',
        service_desc:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam ut laborum architecto provident tempore recusandae at exercitationem! Praesentium blanditiis laborum quas repellendus. Ab, sed quidem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, id.',
        hover_image: hover_img,
    },
    {
        service_title: 'Packaging Design',
        service_desc:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam ut laborum architecto provident tempore recusandae at exercitationem! Praesentium blanditiis laborum quas repellendus. Ab, sed quidem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, id.',
        hover_image: hover_img,
    },
    {
        service_title: 'Print Design',
        service_desc:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam ut laborum architecto provident tempore recusandae at exercitationem! Praesentium blanditiis laborum quas repellendus. Ab, sed quidem! Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, id.',
        hover_image: hover_img,
    },

];


const ServicesCards = ({ secData }) => {

    const [imgPosition, setImgPosition] = useState({ x: 0, y: 0 });
    const handleMouseMove = (event) => {
        const cardRect = event.currentTarget.getBoundingClientRect();
        setImgPosition({
            x: event.clientX - cardRect.left,
            y: event.clientY - cardRect.top,
        });
    };

 



    return (

        <div className="services-sec mt-36">
            {secData.sub_service.map((item, index) => (
                <div key={index}>
                    <div className="container mx-auto ">
                        <div className='text-center' >
                            <h2 className=' sec-heading mb-6' >{item.services_heading}  </h2>
                            <p className=' max-w-[900px] mx-auto mb-14 leading-[1.65rem] '>{item.services_desc} </p>
                        </div>
                    </div>
                    <div>
                        <div className="service-cards-wapper grid grid-cols-1  ">
                            {item.all_services.map((seritem, serindex) => (
                                <div key={serindex} className='border-b ' >
                                    <div
                                        className="service-card grid lg:grid-cols-2 gap-10 pb-12 pt-15 relative container  mx-auto"
                                        onMouseMove={handleMouseMove}
                                        onMouseEnter={handleMouseMove}
                                    >

                                        <div className="service-title flex  items-center relative ml-12 ">
                                            <h3 className="sub-sec-heading">{seritem.service_name}</h3>
                                            <span className="absolute -top-2 -left-12 font-bold text-xl">{serindex < 9 ? "0" : ""}{serindex + 1}</span>
                                        </div>
                                        <div className="service-desc">
                                            <p className='leading-[1.65rem]'>{seritem.service_desc}</p>
                                        </div>
                                        <div
                                            className="service-hover-img absolute z-40 rounded overflow-hidden wi "
                                            style={{
                                                top: `${imgPosition.y}px`,
                                                left: `${imgPosition.x}px`,

                                            }}
                                        >
                                            <img
                                                src={seritem.hover_image}
                                                alt="hover"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>

    );
};

export default ServicesCards;
