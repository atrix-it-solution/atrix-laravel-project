import React, { useState, useRef } from 'react';
import hover_img from '../../assets/service-hover.jpg';

const serviceCardsData = [
    // ... your existing data
];

const Testing = () => {
    const [hoverState, setHoverState] = useState({
        isHovering: false,
        x: 0,
        y: 0,
        activeIndex: null
    });
    
    const cardsRef = useRef([]);

    const handleMouseMove = (e, index) => {
        const card = cardsRef.current[index];
        if (!card) return;
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        setHoverState({
            isHovering: true,
            x: e.clientX,
            y: e.clientY,
            activeIndex: index
        });
    };

    const handleMouseLeave = () => {
        setHoverState(prev => ({
            ...prev,
            isHovering: false,
            activeIndex: null
        }));
    };

    return (
        <div className="services-sec mt-36">
            <div className="container mx-auto">
                <div className='text-center'>
                    <h2 className='text-6xl font-bold mb-6'>Content</h2>
                    <p className='max-w-[900px] mx-auto mb-14'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit...
                    </p>
                </div>
            </div>
            <div>
                <div className="service-cards-wapper grid grid-cols-1">
                    {serviceCardsData.map((item, index) => (
                        <div 
                            key={index} 
                            className='border-b'
                            ref={el => cardsRef.current[index] = el}
                        >
                            <div
                                className="service-card grid lg:grid-cols-2 gap-10 pb-12 pt-15 relative container mx-auto"
                                onMouseMove={(e) => handleMouseMove(e, index)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div className="service-title flex items-center relative ml-12">
                                    <h2 className="text-5xl font-bold">{item.service_title}</h2>
                                    <span className="absolute -top-2 -left-12 font-bold text-xl">
                                        {index < 9 ? "0" : ""}{index + 1}
                                    </span>
                                </div>
                                <div className="service-desc">
                                    <p>{item.service_desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Single hover image that follows mouse */}
                {hoverState.isHovering && (
                    <div
                        className="service-hover-img fixed z-40 rounded overflow-hidden pointer-events-none"
                        style={{
                            transform: 'translate(-50%, -50%)',
                            left: `${hoverState.x}px`,
                            top: `${hoverState.y}px`,
                            width: '300px',
                            height: '200px'
                        }}
                    >
                        <img
                            src={serviceCardsData[hoverState.activeIndex]?.hover_image}
                            alt="hover"
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Testing;