import React from 'react';
import cup_icon from '../../assets/career/cup.svg'
import date_icon from '../../assets/career/date.svg'
import ppl_icon from '../../assets/career/ppl.svg'
import mask_icon from '../../assets/career/mask.svg'



const PerksCardContent = [
    {
        icon: date_icon,
        title: "Five Days A Week",
    },
    {
        icon: ppl_icon,
        title: "Inclusive Workplace",
    },
    {
        icon: mask_icon,
        title: "Fun Fridays",
    },
    {
        icon: cup_icon,
        title: "Non-Stop Coffee",
    },
]


const PerksAtrix = () => {
    return (
        <div>

            <div className="container mx-auto   pt-40">

                <div> <h2 className=' text-4xl md:text-6xl text-center font-bold mb-12 ' >Perks At Atrix</h2> </div>
                <div className="contact-cards-wrapper grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4  ">
                    {PerksCardContent.map((item, index) => (
                        <div key={index} className="contact-card  py-10 px-8  " >
                            <div className=' w-16 h-16 mb-6 mx-auto '>
                                 <img src={item.icon} alt="Atrix IT Solutions" className=' w-full h-full object-cantain' /> </div>
                            <h3 className='text-[16px] font-semibold  text-center ' >{item.title}</h3>
                            <p className='mt-4 text-[16px]'>{item.desc}</p>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default PerksAtrix