import React from 'react'
import cta_bg from './../../assets/bgcta.svg'

const ServiceCta = () => {
    return (
        <div className="service-cta-wrapper mt-36 mb-20">
            <div className="container mx-auto">
                <div className="service-cta  grid grid-cols-2 p-28 rounded-3xl  bg-[#262626]/60 " >
                    <div className="content">
                       <h2 className=' text-4xl font-bold mb-5 ' >Lorem ipsum dolor sit.</h2>
                       <p className="desc">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, officiis. Suscipit officia veniam voluptatum sapiente, quas modi repudiandae possimus consequuntur ipsum corrupti iusto, recusandae debitis sit ut, tempore tempora nihil!
                       </p>
                    </div>
                    <div className="cta-btn flex justify-end items-end">
                        <button className='bg-(--green) py-2 px-6 rounded-md cursor-pointer' >Lets's Begin</button>
                    </div>
                </div>

            </div>
           
        </div>
    )
}

export default ServiceCta