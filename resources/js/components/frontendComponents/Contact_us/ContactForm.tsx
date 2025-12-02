import React, { useState, useEffect,useRef } from 'react';
import { Link, router } from '@inertiajs/react';
import Socialcons from './Socialcons';
import { IoIosArrowForward } from "react-icons/io";
import Button from '../../frontendComponents/button/Button';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

interface MyFormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  email: HTMLInputElement;
  services: HTMLInputElement;
  phone: HTMLInputElement;
  message: HTMLTextAreaElement;
}

interface MyForm extends HTMLFormElement {
  elements: MyFormElements;
}


const ContactForm = () => {
    const [checkedTags, setCheckedTags] = useState<string[]>([]);
    const [isVisible, setIsVisible] = useState<boolean>(false);

     const [formStatus, setFormStatus] = useState({
        loading: false,
        success: false,
        error: '',
    });

    const [formErrors, setFormErrors] = useState({
        name: '',
        email: '',
        // phone: '',
        // message: '',
        services: ''
    });
    const form = useRef<MyForm>(null);

    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CONTECTFORM_TEMPLATE_ID;


    // Field validation functions
    const validateName = (name: string): string => {
        if (!name.trim()) return 'Name is required';
        if (name.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
    };

    const validateEmail = (email: string): string => {
        if (!email.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email';
        return '';
    };

    const validateServices = (services: string[]): string => {
        if (services.length === 0) return 'Please select at least one service';
        return '';
    };

    // Validate entire form
    const validateForm = (): boolean => {
        if (!form.current) return false; 
        
         const { name, email } = form.current.elements;

        const errors = {
            name: validateName(name.value),
            email: validateEmail(email.value),
            services: validateServices(checkedTags)
        };
        
        setFormErrors(errors);

        return !Object.values(errors).some(error => error !== '');
    };

    // Validate individual field on blur
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let error = '';
        
        switch (name) {
            case 'name':
                error = validateName(value);
                break;
            case 'email':
                error = validateEmail(value);
                break;
            default:
                break;
        }
        
        setFormErrors(prev => ({ ...prev, [name]: error }));
    };


    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

         if (!validateForm()) {
            return;
        }

        setFormStatus({ loading: true, success: false, error: '' });

        emailjs
        .sendForm(SERVICE_ID, TEMPLATE_ID, form.current!, {
            publicKey: PUBLIC_KEY,
        })
        .then(
                () => {
                    setFormStatus({ loading: false, success: true, error: '' });
                    form.current!.reset();
                    setCheckedTags([]);
                    setTimeout(() => router.visit('/thankyou'), 1000);
                },
                (error) => {
                    setFormStatus({ 
                        loading: false, 
                        success: false, 
                        error: 'Failed to send message. Please try again later.' 
                    });
                    console.error('Email sending failed:', error);
                }
            );
    };
    useEffect(() => {
        setIsVisible(true);
        
        // Animation for form elements
        const timer = setTimeout(() => {
            const inputs = document.querySelectorAll('.form-element');
            inputs.forEach((input, index) => {
                (input as HTMLElement).style.opacity = '1';
                (input as HTMLElement).style.transform = 'translateY(0)';
                (input as HTMLElement).style.transition = `all 0.5s ease ${index * 0.1}s`;
            });
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    const handleTagClick = (tag: string) => {
        if (checkedTags.includes(tag)) {
            setCheckedTags(checkedTags.filter(t => t !== tag));
        } else {
            setCheckedTags([...checkedTags, tag]);
        }

         // Clear services error when a tag is selected
        if (checkedTags.length === 0) {
            setFormErrors(prev => ({ ...prev, services: '' }));
        }
    };

    const tags = ['Branding', 'Website Design', 'Digital Marketing', 'Website Development', 'Video Production', 'Product Design', 'Social Media Design','Influencer marketing'];

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div 
                    className="contact-sec mb-24"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="container mx-auto ">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Contact Heading Section */}
                            <motion.div 
                                className="contact-heading md:pr-40 pt-8"
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.6 }}
                            >
                                <motion.h2 
                                    className="sec-heading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 0.6 }}
                                >
                                    Stay Ahead in the Digital World with Us!
                                </motion.h2>
                                
                                <motion.p 
                                    className="mt-5 mb-6 max-w-[450px]"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4, duration: 0.6 }}
                                >
                                    Attain a top brand position with smart and effective IT services. Partner with us to boost brand awareness, improve your online presence, and stay ahead in the fast-changing digital world.
                                </motion.p>
                                
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6, duration: 0.6 }}
                                >
                                    <Link href="/faqs" className="text-[var(--blue)] font-medium flex gap-1 hover:gap-2 transition-all duration-300">
                                        Read Our FAQ <div className="icon pt-0.5 text-xl"> <IoIosArrowForward /> </div>
                                    </Link>
                                </motion.div>
                                
                                <motion.div 
                                    className='mt-6'
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8, duration: 0.6 }}
                                >
                                    <Socialcons />
                                </motion.div>
                            </motion.div>

                            {/* Contact Form Section */}
                            <motion.div 
                                className="contact-form rounded-3xl p-8 md:p-12 shadow-lg bg-(--black)"
                                initial={{ scale: 0.95, opacity: 0 }}   
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                                // whileHover={{ scale: 1.01 }}
                            >
                                <form ref={form} onSubmit={sendEmail} noValidate>
                                    <motion.div 
                                        className="form-element"
                                        style={{ opacity: 0, transform: 'translateY(20px)' }}
                                    >
                                        <div className=' mb-6'>
                                        <p className="text-white text-lg mb-2">Hi! My name is*</p>
                                        <input 
                                            type="text" 
                                            name='name'
                                            placeholder="Full Name" 
                                            className="text-lg w-full bg-transparent py-2 border-b border-gray-600 text-gray-400 outline-none hover:border-blue-400 transition-colors duration-300"
                                            onBlur={handleBlur}
                                        />
                                          {formErrors.name && (
                                            <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                                        )}
                                        </div>
                                    </motion.div>

                                    <motion.div 
                                        className="form-element"
                                        style={{ opacity: 0, transform: 'translateY(20px)' }}
                                    >
                                        <div className='mb-6'>
                                        <p className="text-white text-lg mb-2">I'm interested in...*</p>
                                        <ul className="flex flex-wrap gap-2 mb-2">
                                            {tags.map((tag, index) => (
                                                <motion.li 
                                                    key={index}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <input 
                                                        type="checkbox" 
                                                        name={tag}
                                                         
                                                        id={tag} 
                                                        className="peer hidden" 
                                                        checked={checkedTags.includes(tag)}
                                                        onChange={() => handleTagClick(tag)}
                                                    />
                                                    <label 
                                                        htmlFor={tag} 
                                                        className={`contactFrom-custom-gradient border px-4 inline-block rounded-full font-medium py-1 cursor-pointer transition-all duration-300
                                                            ${checkedTags.includes(tag) ? 'bg-gradient-to-r from-blue-400 to-green-400 text-white' : 'hover:bg-gray-700'}`}
                                                    >
                                                        {tag}
                                                    </label>
                                                </motion.li>
                                            ))}
                                        </ul>
                                            {formErrors.services && (
                                            <p className="text-red-500 text-sm mt-1">{formErrors.services}</p>
                                        )}
                                        </div>
                                    </motion.div>

                                    <motion.div 
                                        className="form-element"
                                        style={{ opacity: 0, transform: 'translateY(20px)' }}
                                    >
                                        <div className='mb-6'>
                                        <p className="text-white text-lg mb-2">You can reach me at*</p>
                                        <input 
                                            type="email" 
                                            name='email'
                                            placeholder="Email ID" 
                                            className="text-lg w-full bg-transparent py-2 border-b border-gray-600 text-gray-400 outline-none  hover:border-blue-400 transition-colors duration-300"
                                            onBlur={handleBlur}
                                        />
                                        {formErrors.email && (
                                            <p className="text-red-500 text-sm mt-1 ">{formErrors.email}</p>
                                        )}
                                        </div>
                                    </motion.div>

                                    <motion.div 
                                        className="form-element"
                                        style={{ opacity: 0, transform: 'translateY(20px)' }}
                                    >
                                        <div className=' mb-6'>
                                        <p className="text-white text-lg mb-2">or Call me at</p>
                                        <input 
                                            type="tel" 
                                            name='phone'
                                            placeholder="Phone No." 
                                            className="text-lg w-full bg-transparent py-2 border-b border-gray-600 text-gray-400 outline-none  hover:border-blue-400 transition-colors duration-300"
                                        />

                                        </div>
                                    </motion.div>

                                    <motion.div 
                                        className="form-element"
                                        style={{ opacity: 0, transform: 'translateY(20px)' }}
                                    >
                                        <div className=' mb-6'>
                                        <p className="text-white text-lg mb-2">Also, I would like to add</p>
                                        <textarea 
                                            name='message' 
                                            placeholder="Message"
                                            rows={3} 
                                            className="text-lg w-full bg-transparent py-2 border-b border-gray-600 text-gray-400 outline-none  hover:border-blue-400 transition-colors duration-300"
                                            
                                        ></textarea>
                                         
                                        </div>
                                    </motion.div>

                                    <input
                                        type="hidden"
                                        name="interested"
                                        value={checkedTags.join(', ')}
                                    />

                                    <motion.div 
                                        className="formbtn form-element"
                                        style={{ opacity: 0, transform: 'translateY(20px)' }}
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                    >
                                         <Button 
                                            type="submit" 
                                            mybtn={formStatus.loading ? "Sending..." : "Get A Quote"} 
                                            disabled={formStatus.loading}
                                        />
                                    </motion.div>
                                </form>
                            </motion.div>
                        </div>
                    </div>


                    <style >{`
                        .form-element {
                            transition: all 0.5s ease;
                        }
                        
                        .contactFrom-custom-gradient {
                            transition: all 0.3s ease;
                        }
                        
                        .contactFrom-custom-gradient:hover {
                            transform: translateY(-2px);
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        }
                    `}</style>
                </motion.div>
            )}
        </AnimatePresence>

               
         

    );
};

export default ContactForm;








// import React, { useState, useEffect, useRef } from 'react';
// import { Link, router } from '@inertiajs/react';
// import Socialcons from './Socialcons';
// import { IoIosArrowForward } from "react-icons/io";
// import Button from '../../frontendComponents/button/Button';
// import { motion, AnimatePresence } from 'framer-motion';
// import "../../CSS/One.css";

// const ContactForm = () => {
//     const [checkedTags, setCheckedTags] = useState([]);
//     const [isVisible, setIsVisible] = useState(false);
//     const [formStatus, setFormStatus] = useState({ 
//         loading: false, 
//         success: false, 
//         error: '' 
//     });
//     const [formErrors, setFormErrors] = useState({
//         name: '',
//         email: '',
//         phone: '',
//         message: '',
//         services: '',
        
//     });
//     const form = useRef();
//     const navigate = useNavigate();
//     const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

//     // Field validation functions
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

//     // Validate entire form
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

//     // Validate individual field on blur
//     const handleBlur = (e) => {
//         const { name, value } = e.target;
//         let error = '';
        
//         switch (name) {
//             case 'name':
//                 error = validateName(value);
//                 break;
//             case 'email':
//                 error = validateEmail(value);
//                 break;
//             default:
//                 break;
//         }
        
//         setFormErrors(prev => ({ ...prev, [name]: error }));
//     };

//     useEffect(() => {
//         setIsVisible(true);
        
//         // Animation for form elements
//         const timer = setTimeout(() => {
//             const inputs = document.querySelectorAll('.form-element');
//             inputs.forEach((input, index) => {
//                 input.style.opacity = '1';
//                 input.style.transform = 'translateY(0)';
//                 input.style.transition = `all 0.5s ease ${index * 0.1}s`;
//             });
//         }, 300);

//         return () => clearTimeout(timer);
//     }, []);

//     const handleTagClick = (tag) => {
//         if (checkedTags.includes(tag)) {
//             setCheckedTags(checkedTags.filter(t => t !== tag));
//         } else {
//             setCheckedTags([...checkedTags, tag]);
//         }

//         // Clear services error when a tag is selected
//         if (checkedTags.length === 0) {
//             setFormErrors(prev => ({ ...prev, services: '' }));
//         }
//     };

//     const tags = ['Branding', 'Website Design', 'Digital Marketing', 'Website Development', 'Video Production', 'Product Design', 'Social Media Design','Influencer marketing'];

//     // Handle form submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         // Validate form
//         if (!validateForm()) return;
        
//         setFormStatus({ loading: true, success: false, error: '' });
        
//         try {
//             // Prepare form data
//             const formData = {
//                 name: form.current.name.value,
//                 services: checkedTags,
//                 email: form.current.email.value,
//                 phone: form.current.phone.value || '',
//                 message: form.current.message.value || '',
//                 formType: 'contact'
//             };
            
//             // Send to backend
//             const response = await axios.post(
//                 // `${BACKEND_URL}api/formRouter/sendQuote`, 
//                 `${BACKEND_URL}api/formRouter/sendQuote`,
//                 formData,
//                 {
//                     headers: {
//                         'Content-Type': 'application/json'
//                     }
//                 }
//             );
            
//             if (response.data.success) {
//                 setFormStatus({ 
//                     loading: false, 
//                     success: true, 
//                     error: '' 
//                 });
                
//                 // Reset form after successful submission
//                 form.current.reset();
//                 setCheckedTags([]);
                 
//                 // Navigate to thank you page after a short delay
//                 setTimeout(() => navigate('/thankyou'), 1000);
//                 // Clear success message after 5 seconds
//                 setTimeout(() => {
//                     setFormStatus(prev => ({ ...prev, success: false }));
//                 }, 5000);
//             }
//         } catch (error) {
//             console.error("Form submission error:", error);
//             setFormStatus({
//                 loading: false,
//                 success: false,
//                 error: error.response?.data?.message || "Failed to send your request"
//             });
//         }
//     };

//     return (
//         <AnimatePresence>
//             {isVisible && (
//                 <motion.div 
//                     className="contact-sec mb-24"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 0.8 }}
//                 >
//                     <div className="container mx-auto ">
//                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                             {/* Contact Heading Section */}
//                             <motion.div 
//                                 className="contact-heading md:pr-40 pt-8"
//                                 initial={{ x: -50, opacity: 0 }}
//                                 animate={{ x: 0, opacity: 1 }}
//                                 transition={{ duration: 0.6 }}
//                             >
//                                 <motion.h2 
//                                     className="sec-heading"
//                                     initial={{ opacity: 0 }}
//                                     animate={{ opacity: 1 }}
//                                     transition={{ delay: 0.2, duration: 0.6 }}
//                                 >
//                                     Stay Ahead in the Digital World with Us!
//                                 </motion.h2>
                                
//                                 <motion.p 
//                                     className="mt-5 mb-6 max-w-[450px]"
//                                     initial={{ opacity: 0 }}
//                                     animate={{ opacity: 1 }}
//                                     transition={{ delay: 0.4, duration: 0.6 }}
//                                 >
//                                     Attain a top brand position with smart and effective IT services. Partner with us to boost brand awareness, improve your online presence, and stay ahead in the fast-changing digital world.
//                                 </motion.p>
                                
//                                 <motion.div
//                                     initial={{ opacity: 0 }}
//                                     animate={{ opacity: 1 }}
//                                     transition={{ delay: 0.6, duration: 0.6 }}
//                                 >
//                                     <Link to="/faqs" className="text-[var(--blue)] font-medium flex gap-1 hover:gap-2 transition-all duration-300">
//                                         Read Our FAQ <div className="icon pt-0.5 text-xl"> <IoIosArrowForward /> </div>
//                                     </Link>
//                                 </motion.div>
                                
//                                 <motion.div 
//                                     className='mt-6'
//                                     initial={{ opacity: 0 }}
//                                     animate={{ opacity: 1 }}
//                                     transition={{ delay: 0.8, duration: 0.6 }}
//                                 >
//                                     <Socialcons />
//                                 </motion.div>
//                             </motion.div>

//                             {/* Contact Form Section */}
//                             <motion.div 
//                                 className="contact-form rounded-3xl p-8 md:p-12 shadow-lg bg-(--black)"
//                                 initial={{ scale: 0.95, opacity: 0 }}   
//                                 animate={{ scale: 1, opacity: 1 }}
//                                 transition={{ delay: 0.3, duration: 0.6 }}
//                             >
//                                 <form ref={form} onSubmit={handleSubmit} noValidate>
//                                     {/* Status Messages */}
//                                     {formStatus.success && (
//                                         <motion.div 
//                                             className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg"
//                                             initial={{ opacity: 0, y: -20 }}
//                                             animate={{ opacity: 1, y: 0 }}
//                                         >
//                                             Thank you! Your request has been sent successfully.
//                                         </motion.div>
//                                     )}
                                    
//                                     {formStatus.error && (
//                                         <motion.div 
//                                             className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg"
//                                             initial={{ opacity: 0, y: -20 }}
//                                             animate={{ opacity: 1, y: 0 }}
//                                         >
//                                             Error: {formStatus.error}
//                                         </motion.div>
//                                     )}

//                                     <motion.div 
//                                         className="form-element"
//                                         style={{ opacity: 0, transform: 'translateY(20px)' }}
//                                     >
//                                         <div className=' mb-6'>
//                                         <p className="text-white text-lg mb-2">Hi! My name is*</p>
//                                         <input 
//                                             type="text" 
//                                             name='name'
//                                             placeholder="Full Name" 
//                                             className="text-lg w-full bg-transparent py-2 border-b border-gray-600 text-gray-400 outline-none hover:border-blue-400 transition-colors duration-300"
//                                             onBlur={handleBlur}
//                                         />
//                                           {formErrors.name && (
//                                             <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
//                                         )}
//                                         </div>
//                                     </motion.div>

//                                     <motion.div 
//                                         className="form-element"
//                                         style={{ opacity: 0, transform: 'translateY(20px)' }}
//                                     >
//                                         <div className='mb-6'>
//                                         <p className="text-white text-lg mb-2">I'm interested in...*</p>
//                                         <ul className="flex flex-wrap gap-2 mb-2">
//                                             {tags.map((tag) => (
//                                                 <motion.li 
//                                                     key={tag}
//                                                     whileHover={{ scale: 1.05 }}
//                                                     whileTap={{ scale: 0.95 }}
//                                                 >
//                                                     <input 
//                                                         type="checkbox" 
//                                                         name={tag}
//                                                         id={tag} 
//                                                         className="peer hidden" 
//                                                         checked={checkedTags.includes(tag)}
//                                                         onChange={() => handleTagClick(tag)}
//                                                     />
//                                                     <label 
//                                                         htmlFor={tag} 
//                                                         className={`contactFrom-custom-gradient border px-4 inline-block rounded-full font-medium py-1 cursor-pointer transition-all duration-300
//                                                             ${checkedTags.includes(tag) ? 'bg-gradient-to-r from-blue-400 to-green-400 text-white' : 'hover:bg-gray-700'}`}
//                                                     >
//                                                         {tag}
//                                                     </label>
//                                                 </motion.li>
//                                             ))}
//                                         </ul>
//                                             {formErrors.services && (
//                                             <p className="text-red-500 text-sm mt-1">{formErrors.services}</p>
//                                         )}
//                                         </div>
//                                     </motion.div>

//                                     <motion.div 
//                                         className="form-element"
//                                         style={{ opacity: 0, transform: 'translateY(20px)' }}
//                                     >
//                                         <div className='mb-6'>
//                                         <p className="text-white text-lg mb-2">You can reach me at*</p>
//                                         <input 
//                                             type="email" 
//                                             name='email'
//                                             placeholder="Email ID" 
//                                             className="text-lg w-full bg-transparent py-2 border-b border-gray-600 text-gray-400 outline-none  hover:border-blue-400 transition-colors duration-300"
//                                             onBlur={handleBlur}
//                                         />
//                                         {formErrors.email && (
//                                             <p className="text-red-500 text-sm mt-1 ">{formErrors.email}</p>
//                                         )}
//                                         </div>
//                                     </motion.div>

//                                     <motion.div 
//                                         className="form-element"
//                                         style={{ opacity: 0, transform: 'translateY(20px)' }}
//                                     >
//                                         <div className=' mb-6'>
//                                         <p className="text-white text-lg mb-2">or Call me at</p>
//                                         <input 
//                                             type="tel" 
//                                             name='phone'
//                                             placeholder="Phone No." 
//                                             className="text-lg w-full bg-transparent py-2 border-b border-gray-600 text-gray-400 outline-none  hover:border-blue-400 transition-colors duration-300"
//                                         />
//                                         </div>
//                                     </motion.div>

//                                     <motion.div 
//                                         className="form-element"
//                                         style={{ opacity: 0, transform: 'translateY(20px)' }}
//                                     >
//                                         <div className=' mb-6'>
//                                         <p className="text-white text-lg mb-2">Also, I would like to add</p>
//                                         <textarea 
//                                             name='message' 
//                                             placeholder="Message"
//                                             rows="3" 
//                                             className="text-lg w-full bg-transparent py-2 border-b border-gray-600 text-gray-400 outline-none  hover:border-blue-400 transition-colors duration-300"
//                                         ></textarea>
//                                         </div>
//                                     </motion.div>

//                                     <input
//                                         type="hidden"
//                                         name="interested"
//                                         value={checkedTags.join(', ')}
//                                     />

//                                     <motion.div 
//                                         className="formbtn form-element"
//                                         style={{ opacity: 0, transform: 'translateY(20px)' }}
//                                         whileHover={{ scale: 1.03 }}
//                                         whileTap={{ scale: 0.97 }}
//                                     >
//                                          <Button 
//                                             type="submit" 
//                                             mybtn={formStatus.loading ? "Sending..." : "Get A Quote"} 
//                                             disabled={formStatus.loading}
//                                         />
//                                     </motion.div>
//                                 </form>
//                             </motion.div>
//                         </div>
//                     </div>
//                 </motion.div>
//             )}
//         </AnimatePresence>
//     );
// };

// export default ContactForm;