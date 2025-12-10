import React from 'react'
import Button from '../../frontendComponents/button/Button'

const ServiceFrom = () => {
    return (
        <section className="service-from-sec mt-36 mb-12">
            <div className="container  mx-auto">
                <form className="form-wrapper  grid grid-cols-12 xl:gap-x-36  gap-y-5 ">
                    <div className="form-sec col-span-12 xl:col-span-8 space-y-10 order-2 xl:order-1  ">

                        <div className='flex items-end gap-8' >
                            <p className="text-white text-lg text-end py-2 self-end   min-w-1/3">Hi! My name is</p>
                            <input type="text" placeholder="Full Name" className=" text-lg w-full bg-transparent  py-2 border-b border-gray-600 text-gray-400  outline-none " />
                        </div>


                        <div className='flex gap-8'>
                            <p className="text-white text-lg text-end py-2 self-end  min-w-1/3">You can reach me at</p>
                            <input type="email" placeholder="Email ID" className=" text-lg w-full bg-transparent b py-2 border-b border-gray-600 text-gray-400 outline-none" />
                        </div>

                        <div className='flex gap-8'> <p className="text-white text-lg text-end py-2 self-end  min-w-1/3">or Call me at</p>
                            <input type="tel" placeholder="Phone No." className=" text-lg  w-full bg-transparent py-2  border-b border-gray-600 text-gray-400 outline-none" /></div>


                        <div className='flex gap-8'>
                            <p className="text-white text-lg text-end  min-w-1/3 self-end">Also, I would like to add</p>

                            <textarea placeholder="Message" rows={3} className=" text-lg  w-full bg-tra py-2 nsparent border-b border-gray-600 text-gray-400 outline-none"></textarea>
                        </div>

                        <div className=' flex justify-end mt-10'>
                            {/* <button type="submit" className=" bg-gradient-to-r from-blue-400 to-green-400 text-white py-1  ms-auto   px-9 rounded-full text-lg cursor-pointer ">Let's Us Begin</button> */}
                            <Button mybtn="Let's Us Begin" btnLink="#" />

                        </div>


                    </div>
                    <div className="form-check-btns col-span-12 xl:col-span-4 order-1 xl:order-2 ">
                        <p className="text-white text-lg  mb-6">I'm interested in...</p>
                        <ul className="flex flex-wrap gap-2 mb-2 ">
                            {['Branding', 'Website Design', 'Digital Marketing', 'Website Development', 'Video Production', 'Product Design', 'Social Media Design'].map((tag, index) => (


                                <li key={index} >
                                    <input type="checkbox" name={tag} id={tag} className="peer hidden  " />
                                    <label htmlFor={tag} className=" contactFrom-custom-gradient border  px-4 inline-block peer-checked:bg-gradient-to-r from-blue-400 to-green-400 rounded-full font-medium py-1 cursor-pointer ">
                                        {tag}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* <div className='py-5' ><button className=' bg-gradient-to-r from-(--blue) to-(--green) px-6 py-2 rounded-full font-bold ms-auto' >Let's Us Begin </button> </div> */}
                </form>

            </div>
        </section>
    )
}

export default ServiceFrom  





// import React, { useState, useRef } from 'react';
// import Button from '../Button';
// import axios from 'axios';
// import { useNavigate } from '@inertiajs/react';

// const ServiceFrom = () => {
//     const form = useRef();
//     const [checkedTags, setCheckedTags] = useState([]);
//     const [formStatus, setFormStatus] = useState({
//         loading: false,
//         success: false,
//         error: ''
//     });
//     const [formErrors, setFormErrors] = useState({
//         name: '',
//         email: '',
//         services: '',
//     });

//     const navigate = useNavigate();

//     const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    
//     const validateName = (name) => {
//         if (!name.trim()) return 'Name is required';
//         if (name.trim().length < 2) return 'Name must be at least 2 characters';
//         return '';
//     };

//     const validateEmail = (email) => {
//         if (!email.trim()) return 'Email is required';
//         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email';
//         return '';
//     };

//     const validateServices = (services) => {
//         if (services.length === 0) return 'Please select at least one service';
//         return '';
//     };

//     const validateForm = () => {
//         const formData = form.current;
//         const errors = {
//             name: validateName(formData.name.value),
//             email: validateEmail(formData.email.value),
//             services: validateServices(checkedTags)
//         };
//         setFormErrors(errors);
//         return !Object.values(errors).some(error => error !== '');
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         let error = '';
//         if (name === 'name') error = validateName(value);
//         if (name === 'email') error = validateEmail(value);
//         setFormErrors(prev => ({ ...prev, [name]: error }));
//     };

    
//     const handleTagClick = (tag) => {
//         if (checkedTags.includes(tag)) {
//             setCheckedTags(checkedTags.filter(t => t !== tag));
//         } else {
//             setCheckedTags([...checkedTags, tag]);
//         }
//         if (checkedTags.length === 0) {
//             setFormErrors(prev => ({ ...prev, services: '' }));
//         }
//     };

//     const tags = [
//         'Branding',
//         'Website Design',
//         'Digital Marketing',
//         'Website Development',
//         'Video Production',
//         'Product Design',
//         'Social Media Design'
//     ];

    
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!validateForm()) return;

//         setFormStatus({ loading: true, success: false, error: '' });

//         try {
//             const formData = {
//                 name: form.current.name.value,
//                 email: form.current.email.value,
//                 phone: form.current.phone.value || '',
//                 message: form.current.message.value || '',
//                 services: checkedTags,
//                 formType: "service"   
//             };

//             const response = await axios.post(
//                 `${BACKEND_URL}api/formRouter/sendQuote`,  
//                 // `${BACKEND_URL}api/formRouter/sendQuote`,
//                 formData,
//                 { headers: { 'Content-Type': 'application/json' } }
//             );

//             if (response.data.success) {
//                 setFormStatus({ loading: false, success: true, error: '' });
//                 form.current.reset();
//                 setCheckedTags([]);

//                 setTimeout(() => navigate('/thankyou'), 1000);

//                 // setTimeout(() => {
//                 //     setFormStatus(prev => ({ ...prev, success: false }));
//                 // }, 5000);
//             }
//         } catch (error) {
//             setFormStatus({
//                 loading: false,
//                 success: false,
//                 error: error.response?.data?.message || "Failed to send request"
//             });
//         }
//     };

//     return (
//         <section className="service-from-sec mt-36 mb-12">
//             <div className="container mx-auto">
//                 <form
//                     ref={form}
//                     onSubmit={handleSubmit}
//                     noValidate
//                     className="form-wrapper grid grid-cols-12 xl:gap-x-36 gap-y-5"
//                 >
//                     <div className="form-sec col-span-12 xl:col-span-8 space-y-10 order-2 xl:order-1">

//                         {/* Success & Error Messages */}
//                         {formStatus.success && (
//                             <div className="p-4 bg-green-100 text-green-700 rounded-lg">
//                                 Thank you! Your request has been sent successfully.
//                             </div>
//                         )}
//                         {formStatus.error && (
//                             <div className="p-4 bg-red-100 text-red-700 rounded-lg">
//                                 Error: {formStatus.error}
//                             </div>
//                         )}

//                         {/* Name */}
//                         <div>
//                             <div className='flex items-start gap-8 justify-center'>
//                                 <p className="text-white text-lg text-end py-2 min-w-1/3">Hi! My name is*</p>
//                                 <div className='flex-1'>
//                                     <input
//                                         type="text"
//                                         name="name"
//                                         placeholder="Full Name"
//                                         autoComplete="name"
//                                         className="text-lg w-full bg-transparent py-2 border-b border-gray-600 text-gray-400 outline-none"

//                                         onChange={handleChange}
//                                     />
//                                     {formErrors.name && <p className="text-red-500 mt-1 font-bold text-sm ">{formErrors.name}</p>}
//                                 </div>
//                             </div>

//                             <div className=''>

//                             </div>
//                         </div>

//                         {/* Email */}
//                         <div className='flex gap-8'>
//                             <p className="text-white text-lg text-end py-2  min-w-1/3">You can reach me at*</p>
//                             <div className='flex-1'>
//                             <input
//                                 type="email"
//                                 name="email"
//                                 placeholder="Email ID"
//                                 autoComplete="email"
//                                 className="text-lg w-full bg-transparent py-2 border-b border-gray-600 text-gray-400 outline-none"

//                                 onChange={handleChange}
//                             />
//                             {formErrors.email && <p className="text-red-500 text-sm font-bold mt-1">{formErrors.email}</p>}

//                             </div>
//                         </div>

//                         {/* Phone */}
//                         <div className='flex gap-8'>
//                             <p className="text-white text-lg text-end py-2 self-end min-w-1/3">or Call me at</p>
//                             <input
//                                 type="tel"
//                                 name="phone"
//                                 placeholder="Phone No."
//                                 autoComplete="tel"
//                                 className="text-lg w-full bg-transparent py-2 border-b border-gray-600 text-gray-400 outline-none"
//                             />
//                         </div>

//                         {/* Message */}
//                         <div className='flex gap-8'>
//                             <p className="text-white text-lg text-end min-w-1/3 self-end">Also, I would like to add</p>
//                             <textarea
//                                 name="message"
//                                 placeholder="Message"
//                                 rows="3"
//                                 autoComplete="off"
//                                 className="text-lg w-full bg-transparent py-2 border-b border-gray-600 text-gray-400 outline-none"
//                             ></textarea>
//                         </div>

//                         <div className='flex justify-end mt-10'>
//                             <Button
//                                 type="submit"
//                                 mybtn={formStatus.loading ? "Sending..." : "Let's Us Begin"}
//                                 disabled={formStatus.loading}
//                             />
//                         </div>
//                     </div>

//                     {/* Services (Tags) */}
//                     <div className="form-check-btns col-span-12 xl:col-span-4 order-1 xl:order-2">
//                         <p className="text-white text-lg mb-6">I'm interested in...*</p>
//                         <ul className="flex flex-wrap gap-2 mb-2">
//                             {tags.map((tag, index) => (
//                                 <li key={index}>
//                                     <input
//                                         type="checkbox"
//                                         id={tag}
//                                         className="peer hidden"
//                                         checked={checkedTags.includes(tag)}
//                                         onChange={() => handleTagClick(tag)}
//                                     />
//                                     <label
//                                         htmlFor={tag}
//                                         className={`contactFrom-custom-gradient border px-4 inline-block rounded-full font-medium py-1 cursor-pointer transition-all duration-300 
//                       ${checkedTags.includes(tag)
//                                                 ? 'bg-gradient-to-r from-blue-400 to-green-400 text-white'
//                                                 : 'hover:bg-gray-700'}`}
//                                     >
//                                         {tag}
//                                     </label>
//                                 </li>
//                             ))}
//                         </ul>
//                         {formErrors.services && <p className="text-red-500 text-sm font-bold mt-1">{formErrors.services}</p>}
//                     </div>
//                 </form>
//             </div>
//         </section>
//     );
// };

// export default ServiceFrom;
