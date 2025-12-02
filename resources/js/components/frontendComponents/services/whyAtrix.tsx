import React from 'react'


const WhyAtrix = ({ secData }) => {
  return (
    <div className='why-atrix my-36' >
      <div className='container  mx-auto' >
        <div>  <h2 className='sec-heading font-bold mb-8 text-center' >{secData.why_atrix_heading}</h2> </div>
        <div className="why-atrix-content-content grid grid-cols-1 lg:grid-cols-2 space-y-4 ">
          <div className="left flex   text-4xl font-bold">
            <h3 className='heading max-w-[380px]  ' >{secData.why_atrix_subheading}</h3>
          </div>
          <div className="right">
            {secData.why_atrix_desc.map((item, index) => (
         
              <p key={index} >{item}</p>
             
            ))}

        </div>
      </div>
    </div>
    </div >
  )
}

export default WhyAtrix;