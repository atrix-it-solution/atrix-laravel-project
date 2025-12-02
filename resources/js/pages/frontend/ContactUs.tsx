import React from 'react'
import ContactForm from '../../components/frontendComponents/Contact_us/ContactForm'
import ContactDetails from '../../components/frontendComponents/Contact_us/ContactDetails'
import HeroCommon from '../../components/frontendComponents/herocommon/HeroCommon'
import SeoTags from '../../components/frontendComponents/seoTags/SeoTags';
import MasterLayout from '@/layouts/frontendLayouts/MasterLayouts';
import { Head } from '@inertiajs/react';

const herodata = [
    { title: "Contact Us" }
];

const ContactUs = () => {
    return (
        <>
        <MasterLayout>
            <Head>
                <title>{"Contact Us | Get in Touch with Atrix IT Solutions Experts"}</title>
                <meta name="description" content={"Have questions or need support? Contact Atrix IT Solutions today! Our team of experts is ready to assist with web development, digital marketing, branding, and more."} />
            </Head>
            
            <HeroCommon heroData={herodata[0]} />
            <ContactForm></ContactForm>
            <ContactDetails></ContactDetails>
        </MasterLayout>
        </>
    )
}

export default ContactUs