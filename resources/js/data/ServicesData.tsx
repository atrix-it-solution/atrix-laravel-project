import React from "react";
import { MdCategory } from "react-icons/md";
import img_1 from "/src/assets/DTS_Influencer.webp";
// import img_2 from '/assets/infulancer.png'
const Asset1 = "/assets/ServicesIcons/Asset 1.svg";
const Asset2 = "/assets/ServicesIcons/Asset 2.svg";
const Asset3 = "/assets/ServicesIcons/Asset 3.svg";
const Asset4 = "/assets/ServicesIcons/Asset 4.svg";
const Asset5 = "/assets/ServicesIcons/Asset 5.svg";
const Asset6 = "/assets/ServicesIcons/Asset 6.svg";
const Asset7 = "/assets/ServicesIcons/Asset 7.svg";
const graphic = "/assets/ServicesImage/graphic.svg";
const hover_img = "/assets/service-hover.jpg";
const hover_img2 = "/assets/service1.jpg";
const hover_img3 = "/assets/service2.jpg";
const hover_img4 = "/assets/service3.jpg";
const hover_img5 = "/assets/service4.jpg";

const image_1 = "/assets/DTS_Influencer.webp";
const image_2 = "/assets/infulancer.png";
// const graphic = "/assets/ServicesImage/graphic.svg";
const dev = "/assets/ServicesImage/dev.svg";
const log = "/assets/ServicesImage/log.svg";
const marketing = "/assets/ServicesImage/marketing.svg";
// const staffing = "/assets/ServicesImage/staffing.svg";
const visual = "/assets/ServicesImage/visual.svg";
const video = "/assets/ServicesImage/video.svg";

const ct_marketing = '/assets/services/ct_marketing.png'
const ct_Graphic = '/assets/services/ct_Graphic.png'
const ct_video = '/assets/services/ct_video.jpg'
const ct_web_dev = '/assets/services/ct_web_dev.png'
const ct_logostics = '/assets/ServicesImage/Logistics.png'
const ct_vfx = '/assets/services/VFX.jpg'



// new images  marketing
const marketing1 = '/assets/services/marketing-1.jpg'
const marketing2 = '/assets/services/marketing-2.jpg'
const marketing3 = '/assets/services/marketing-3.jpg'
const hover_1_content_creation = '/assets/services/marketing/content-creation.jpg'
const hover_2_digital = '/assets/services/marketing/digital-ads.jpg'
const hover_3_marketing = '/assets/services/marketing/marketing.jpg'
const hover_4_seo = '/assets/services/marketing/SEO.jpg'
const hover_5_smo = '/assets/services/marketing/SMO.jpg'
const hover_6_strategy = '/assets/services/marketing/strategy.jpg'
const hover_7_Influencer = '/assets/services/marketing/influencer-marketing.jpg'


// new images  web development
const web_development_1 = '/assets/services/wd-1.jpg'
const web_development_2 = '/assets/services/wd-2.jpg'
const web_development_3 = '/assets/services/web_development/web 2web.jpg'
const hover_1_ai = '/assets/services/web_development/AI.jpg'
const hover_2_crm = '/assets/services/web_development/CRM.jpg'
const hover_3_laravel = '/assets/services/web_development/Laravel.jpg'
const hover_4_metaverse = '/assets/services/web_development/metaverse.jpg'
const hover_5_node = '/assets/services/web_development/node_js.jpg'
const hover_6_php = '/assets/services/web_development/php.jpg'
const hover_7_salesforce = '/assets/services/web_development/salesforce.jpg'
const hover_8_react = '/assets/services/web_development/react.js.jpg'



// new image logistics 
const logistics_1 = '/assets/services/logistics-1.jpg'
const logistics_2 = '/assets/services/logistics-2.jpg'
const logistics_3 = '/assets/services/logistics-3.jpg'
const hover_1_drayage = '/assets/services/logistics/drayage.jpg'
const hover_2_otr = '/assets/services/logistics/OTR.jpg'
const hover_3_transport = '/assets/services/logistics/transportation.jpg'

// new image branding 
const branding_1 = '/assets/services/branding-1.jpg'
const branding_2 = '/assets/services/branding-2.jpg'
const branding_3 = '/assets/services/branding-3.jpg'
const hover_advertisement = '/assets/services/branding/advertisement.jpg'
const hover_branding = '/assets/services/branding/branding.jpg'
const hover_logo_design = '/assets/services/branding/logo-design.jpg'
const hover_packaging = '/assets/services/branding/packaging.jpg'
const hover_print_media = '/assets/services/branding/print-media.jpg'
const hover_product_design = '/assets/services/branding/product-design.jpg'
const hover_social_media = '/assets/services/branding/social-media.jpg'
const hover_ui_ux = '/assets/services/branding/UI-UX.jpg'

// new image  vfx
const vfx_1 = '/assets/services/620x620vfx_1.jpg'
const vfx_2 = '/assets/services/620x620vfx_2.jpg'
const vfx_3 = '/assets/services/434-vfx.jpg'
// const hover_1 = '/assets/services/vfx/vfx3D.jpg'
const hover_vfx_1 = '/assets/services/vfx/vfxArtboard 1.jpg'
const hover_vfx_2 = '/assets/services/vfx/vfxArtboard 2.jpg'
const hover_vfx_3 = '/assets/services/vfx/vfxArtboard 3.jpg'
const hover_vfx_4 = '/assets/services/vfx/vfxArtboard 4.jpg'
const hover_vfx_5 = '/assets/services/vfx/vfxArtboard 5.jpg'
const hover_vfx_6 = '/assets/services/vfx/vfxArtboard 6.jpg'
const hover_vfx_7 = '/assets/services/vfx/vfxArtboard 7.jpg'


// new image video 
const video_1 = '/assets/services/Photo_Video/photo1video.jpg'
const video_2 = '/assets/services/Photo_Video/photo 2Artboard 2.jpg'
const video_3 = '/assets/services/620x620video_3.jpg'
const hover_1_food = '/assets/services/Photo_Video/brandingArtboard 1.jpg'
const hover_2_meeraaj = '/assets/services/Photo_Video/brandingArtboard 2.jpg'
const hover_3 = '/assets/services/Photo_Video/brandingArtboard 3.jpg'
const hover_4 = '/assets/services/Photo_Video/brandingArtboard 4.jpg'






const ServicesData = [
  // Branding / Graphic Design-section
  {
    slug: "branding-graphic-design",
    service_title: "Branding / Graphic Design",
    main_desc:
      "Did you know? 94% of first impressions are design-related! That’s why strong visuals are key to brand success. Graphic design isn’t just about looks - it’s about delivering your message effectively. At Atrix IT Solutions, we bring your vision to life with top-notch designs tailored to your needs. Whether it’s branding, websites, infographics, or eBooks, our expert team creates visually captivating content that engages and inspires. Let’s design something impactful!",
    tags: [
      "Branding",
      "Logo Design",
      "Packaging",
      "Product Design",
      "Print Media",
      "Advertisement",
      "UI/UX",
      "Social Media Design",
    ],

    main_image: graphic,
    icon: Asset1,
    // category: "Branding / Graphic Design",
    category: "Graphic Designing",

    heading_1: "Crafting Memorable Brand Identities",
    description_1:
      "Did you know good design can instantly build trust with customers? Graphic design plays a huge role in the digital world. It's not only about things looking pretty; it's about communicating your message effectively and making a great first impression. A good design can make your business stand out, bring in more customers, and build a brand people remember. No matter if it's a logo, website, or social media post, smart design makes your business thrive. ",
    img_1: branding_1,
    heading_2: "Creating Strong Visuals",
    description_2:
      "Atrix IT Solutions designers create strong and clear designs that bring your ideas to life and help your business grow. We transform businesses into distinctive brands through strategic design solutions that communicate your unique value and resonate with your target audience across all touchpoints.",
    img_2: branding_2,
     img_3: branding_3,
    sub_service: [  
      {
        services_heading: "Branding Services",
        services_desc:
          "We create powerful, simple, and memorable branding that helps your business stand out. From logo design to full brand identity, we build everything you need to connect with your audience and grow with confidence.",
        all_services: [
          // {
          //   service_name: "Branding Services ",
          //   service_desc: "We create powerful, simple, and memorable branding that helps your business stand out. From logo design to full brand identity, we build everything you need to connect with your audience and grow with confidence.",
          //   hover_image: hover_img
          // },
          {
            service_name: "Branding",
            service_desc:
              "Branding is all about making your company appear distinctive and professional. It involves making a strong impression that people will remember. We assist you in creating a brand that tells your story, resonates with your audience, and makes a lasting impact on their minds.",
            hover_image: hover_branding,
          },
          {
            service_name: "Logo Design",
            service_desc:
              "A logo represents the face of your company. It should be simple, easy to recognize, and show what you stand for. We design logos that are creative, clear, and perfect for your brand, helping your business stand out from the crowd.",
            hover_image: hover_logo_design,
          },
          {
            service_name: "Packaging",
            service_desc:
              "Good packaging safeguards your product and grabs the attention of customers. It must be pretty, and tell them what the product is, and get them to want to buy it. We create packaging that is both stunning and smart, allowing you to make a lasting first impression.",
            hover_image: hover_packaging,
          },
          {
            service_name: " Product Design",
            service_desc:
              "Product design involves designing products that are fun to use and good-looking. We strive to create products that are not just according to customer needs but also make individuals passionate to use them. Our goal is to mix beauty with function perfectly.",
            hover_image: hover_product_design,
          },

          {
            service_name: "Print Media",
            service_desc:
              "Print media consists of materials such as brochures, flyers, and posters. Even online, printed materials are effective in reaching individuals. We design clean and eye-catching print materials that clearly share your message and leave a strong impact.",
            hover_image: hover_print_media,
          },
          {
            service_name: "Advertisement",
            service_desc:
              "Ads must grab attention immediately and convey your message quickly. We design ads that are bold, concise, and made to get results. Whether for print, social media, or websites, our ads bring more visibility to your business.",
            hover_image: hover_advertisement,
          },
          {
            service_name: "UI/UX",
            service_desc:
              "UI/UX is short for user interface and user experience. It refers to designing websites and applications that are simple and enjoyable to use. We design layouts that look clean, load fast, and guide users smoothly, helping you keep visitors happy and engaged.",
            hover_image: hover_ui_ux,
          },
          {
            service_name: "Social Media Design",
            service_desc:
              "Good social media designs give your brand a professional look online. We design posts, covers, and ads that suit your style and grab customer attention. Our designs get your brand noticed and build your presence across platforms like Facebook, Instagram, and more.",
            hover_image: hover_social_media,
          },
        ],
      },
    ],
    cards_sec_heading: "Why do you need branding",
    cards_sec_data: [
      {
        cardTitle: " Builds Trust",
        desc: "A good brand makes consumers feel secure and trusting of your company. When your brand appears professional and uniform, you represent that you pay attention to detail and respect quality. Consumers will trust you more and decide to use your products or services above others.",
      },
      {
        cardTitle: "Makes You Easy to Remember",
        desc: "Good branding makes people remember you. When your logo, colors, and style are consistent everywhere, it gets stuck in people's minds. This implies when they need something you provide, they are likely to remember your business first.",
      },
      {
        cardTitle: "Competitive Differentiation",
        desc: "There are many businesses out there, and strong branding helps you look different and special. It shows what makes you unique. When your brand clearly shares your story and values, it becomes easier for customers to connect with you.",
      },
    ],
    ctImage : ct_Graphic,
    why_atrix_heading: "Why Atrix",
    why_atrix_subheading:
      "Research-driven approach to Visual Identity Development",
    why_atrix_desc: [
      "We begin by learning about your business and goals. We then create design ideas that reflect your vision and connect with your audience. Once you choose a direction, we refine the designs, ensuring everything aligns with your brand’s message. We share the designs with you and make revisions based on your feedback. Finally, we deliver the full set of branding materials, including logos, colors, and fonts, ensuring consistency across all your platforms. With this process, we help you build a brand that speaks clearly and powerfully to your customers.",
    ],
    process_cards: [
      {
        title: "Research",
        desc: "We begin by learning about your business, objectives, and target market. We study your competitors and industry trends to develop a strategy that differentiates you. This enables us to establish a solid foundation for your brand.",
      },
      {
        title: " Concept Creation",
        desc: "After we have all the details, our designers develop concepts for the look and feel of your brand. We show you various ideas for your logo, color, and style. Your input enables us to improve and refine the design.",
      },
      {
        title: "Design Development",
        desc: "In this phase, we take our selected concept and develop a complete brand identity out of it. This involves making your logo, selecting fonts, colors, and other design materials that set you apart and give your brand individuality and identity.",
      },
      {
        title: "Feedback",
        desc: "We appreciate your feedback! We show you the designs and request your opinions. Depending on your feedback, we make the necessary adjustments to make sure the design meets your vision and functions for your readers.",
      },
      {
        title: "Design Handover",
        desc: "When your design is done, we hand over all your files to you in the required formats for use in print as well as online media. We also give you a comprehensive brand guide so your brand stays unified across every channel.",
      },
    ],
    quote:
      "A brand is the sum total of how someone perceives a particular organization. Branding is about shaping that perception.",
    faqs: [
      {
        category: "Branding FAQs",
        content: [
          {
            q: "How long does the branding process typically take?",
            a: "Most comprehensive branding projects take 6-10 weeks from kickoff to final delivery, depending on complexity and feedback cycles.",
          },
          {
            q: "What deliverables are included in branding projects?",
            a: "Our packages include primary/secondary logos, color system, typography, graphic elements, brand guidelines PDF, and production files.",
          },
          {
            q: "Do you create brand applications beyond the logo?",
            a: "Yes, we design full identity systems including business cards, letterheads, email signatures, packaging, and marketing collateral.",
          },
          {
            q: "How many logo concepts do you present?",
            a: "We typically develop 3-5 distinct creative directions in initial rounds, refined to 2-3 options for final selection.",
          },
          {
            q: "What file formats will we receive?",
            a: "Final deliverables include vector files (AI/EPS), high-res PNGs/JPGs, PDF guidelines, and web-optimized formats.",
          },
        ],
      },
    ],
    seotitle:"Graphic Design Services | Best Logo Design | Atrix IT Solutions",
    seodescription:"Looking for top-notch graphic design services? Atrix IT Solutions offers creative logo design and branding to elevate your brand’s identity. Contact us now!",
    keywords:"graphic design Agency,graphic design services,best logo design company,branding and creative agency,branding design company,custom logo design services,advertising graphic design services,brand development agency,branding services agency,graphic design services pricing,graphic design services for small business,graphic design agency services",
  },

  {
    slug: "web-development",
    service_title: "Web Development",
    main_desc:
      "Create stunning, user-friendly websites that captivate, engage, and drive real results with our experts! Whether you need a new website, a redesign, or custom development, we ensure a seamless experience with modern, responsive designs tailored to your brand. Our expert team focuses on creating visually appealing and high-performing websites that boost visibility, attract customers, and grow your business effortlessly. So, take your online presence to the next level!",
    tags: [
      "AI",
      "Metaverse",
      "Salesforce",
      "CRM",
      "CMS",
      "PHP",
      "Laravel",
      "React Js",
      "Node Js ",
    ],
    main_image: dev,
    icon: Asset2,
    category: "Web Development",
    heading_1: "Custom Digital Experiences that Drive Results",
    description_1:
      "Beyond aesthetic appeal, we design and develop high-performance websites and web applications that offer flawless operation, remarkable speed, and tangible business impact. Every project we take on is informed by our in-depth knowledge of contemporary user behavior, new developments in digital technology, and our clients’ particular goals. Our team creates secure, scalable, and responsive platforms that draw in visitors and turn them into devoted clients by fusing creativity with cutting-edge technical know-how.",
    img_1: web_development_1,
    heading_2: "Engineering Excellence behind Every Interface",

    description_2:
      "We ensure that every digital product, from enterprise-level web solutions to dynamic single-page apps, is precisely and purposefully engineered. We focus heavily on optimizing user journeys—ensuring intuitive navigation, fast load times, mobile responsiveness, and accessible design. Our solutions are designed to satisfy the highest requirements for usability, performance, and cross-browser compatibility while reflecting your brand identity. ",
    img_2: web_development_2,
    img_3: web_development_3,
    sub_service: [
      {
        services_heading: "Web Development Services",
        // services_desc:
        //   "Complete website solutions from simple brochure sites to complex web applications and ecommerce platforms.",
        all_services: [
          {
            service_name: "Artificial Intelligence",
            service_desc:
              "Boost your digital solutions with AI-powered intelligent features. AI facilitates task automation, enhances user engagement, and leads to more intelligent business decisions through the use of intelligent chatbots, virtual assistants, predictive analytics, and personalized content delivery. ",
            hover_image: hover_1_ai,
          },
          {
            service_name: "Metaverse",
            service_desc:
              "Take web experiences to the next level by integrating with the Metaverse. We create immersive 3D worlds, VR webshops, and interactive digital worlds where users can experience your brand in a revolutionary way-ideal for future-oriented brands that want to differentiate themselves.",
            hover_image: hover_4_metaverse,
          },
          {
            service_name: "Salesforce",
            service_desc:
              "Maximize your customer relationship with custom Salesforce integration. Be it with automating your sales pipelines, creating custom dashboards, or syncing web data, we want to make sure your platform aligns with your business objectives.",
            hover_image: hover_7_salesforce,
          },
          {
            service_name: "CRM (Customer Relationship Management)",
            service_desc:
              "We create and integrate Customer Relationship Management (CRM) systems that centralize your customer data, automate follow-ups, and streamline lead tracking so you can create more personalized and robust relationships with each client.",
            hover_image: hover_2_crm,
          },
          {
            service_name: "PHP",
            service_desc:
              "PHP is a strong, well-established scripting language that enables us to build feature-rich, fast, and reliable websites and dynamic web apps. PHP powers everything, from fully functional business systems to customized portals.",
            hover_image: hover_6_php,
          },
          {
            service_name: "Laravel",
            service_desc:
              " We build back-end architectures that are reliable, safe, and beautiful by using the latest PHP framework, Laravel. Perfect for organizations that desire clean code, fast development, and cutting-edge performance without compromising on quality.",
            hover_image: hover_3_laravel,
          },
          {
            service_name: "React JS",
            service_desc:
              "With React JS we can develop fast, interactive front-ends that are a pleasure to use. Dashboards, e-commerce stores, and server-driven interfaces-with React, you get a UI that feels faster, more intuitive, and more responsive than you’re used to. ",
            hover_image: hover_8_react,
          },
          {
            service_name: "Node.js",
            service_desc:
              "For real-time, scalable, and event-driven projects, we opt for Node.js as the backend technology. We deploy it to develop robust APIs, chat systems, and responsive applications that can serve millions of users performing multiple tasks without any glitches.",
            hover_image: hover_5_node,
          },

        ],
      },
    ],
    cards_sec_heading: "Why do you need branding",
    cards_sec_data: [
      {
        cardTitle: "Mobile-First Approach",
        desc: "Responsive designs that adapt perfectly to all devices, prioritizing mobile user experience.",
      },
      {
        cardTitle: "Performance Optimized",
        desc: "Fast-loading sites improve user experience and search rankings while reducing bounce rates.",
      },
      {
        cardTitle: "Future-Proof Architecture",
        desc: "Clean, modular codebase allows for easy updates and scalability as your business grows.",
      },
    ],
    ctImage : ct_web_dev,
    why_atrix_heading: "Why Atrix",
    why_atrix_subheading: "Engineering Excellence meets Business Objectives",
    why_atrix_desc: [
      "We approach development as problem-solving - creating technical solutions that address specific business challenges and opportunities. Our process emphasizes planning, quality assurance and long-term maintainability over quick fixes and technical debt. The team stays current with evolving web standards, security practices and emerging technologies to deliver future-ready solutions.",
    ],
    process_cards: [
      {
        title: "Discovery & Planning",
        desc: "In order to establish precise requirements, user journeys, and technical roadmaps that lay the groundwork for success, we thoroughly examine your objectives.",
      },
      {
        title: "Design & Prototyping",
        desc: "To visualize user experiences and get early feedback, our designers create captivating UI mockups and intuitive wireframes.",
      },
      {
        title: "Development",
        desc: "Using scalable architecture and clean, well-documented code, we bring your vision to life with performance and security in mind.",
      },
      {
        title: "Testing & QA",
        desc: "Before going live, we make sure everything is perfect, from cross-device compatibility to functional stress tests.",
      },
      {
        title: "Launch & Optimization",
        desc: "We track performance, deploy your product seamlessly, and continuously improve its speed, engagement, and outcomes after launch.",
      },
    ],
    quote:
      "A great website is the digital storefront of your business - we build experiences that welcome visitors and convert them into customers.",
    faqs: [
      {
        category: "Web Development FAQs",
        content: [
          {
            q: "What technologies do you typically use?",
            a: "Our stack includes React, Vue, Node.js, Laravel, WordPress, Shopify and various databases depending on project needs.",
          },
          {
            q: "Can you redesign our existing website?",
            a: "Yes, we frequently modernize legacy sites with improved design, functionality and technical architecture.",
          },
          {
            q: "How do you ensure website security?",
            a: "We implement security best practices including regular updates, secure coding standards, HTTPS, and protection against common vulnerabilities.",
          },
          {
            q: "What about website maintenance?",
            a: "We offer ongoing maintenance plans covering updates, backups, security monitoring and content changes as needed.",
          },
          {
            q: "How long does website development take?",
            a: "Timelines vary by complexity - simple sites take 4-6 weeks, while complex web apps may require 3-6 months of development.",
          },
        ],
      },
    ],
    seotitle:"Custom Website Development, Redesign, and Management Services by Atrix IT Solutions",
    seodescription:"Enhance your online presence with Atrix IT Solutions. We offer website redesign, management and custom website development services to meet your business needs.",
    keywords:"website redesign service,best website development company,website management services,custom website development services,website design services,responsive website design agency,custom web development company,website development services company,affordable website design packages,website maintenance services,professional web development services,b2b ecommerce website development,wordpress website maintenance services,responsive website development services,ecommerce website development services,custom web development agency,php web development services,custom ecommerce website development services,b2b ecommerce development agency"
  },
  {
    slug: "Digital-Marketing",
    service_title: "Digital Marketing",
    icon: Asset3,
    main_desc:
      "At Atrix IT Solutions, get your own digital marketing strategy built from scratch. Our expert team crafts tailored campaigns to drive traffic, engage customers, and convert leads into loyal clients. Whether it’s SEO, social media marketing, or content creation, we focus on delivering real, measurable results that help your brand stand out. Ready to take your business to the next level? Partner with us today and watch your online presence grow!",
    tags: [
      "Marketing",
      "Strategy",
      "SEO",
      "SMO",
      "Digital Ads",
      "Influencer Marketing",
      "Content Creation",
    ],
    main_image: marketing,
    category: "Digital Marketing",
    heading_1: "Maximize Growth Through Smarter Marketing Moves",
    description_1:
      "Want to expand your business online? That's where digital marketing steps in. It refers to using the internet to market your goods or services. This includes things such as websites, social media, online advertisements, emails, and more. Digital marketing assists you in reaching a greater number of people, creating trust, and converting visitors into buyers. Most people in today’s world look online before making any purchase, so if your company is not represented there, then you are missing out. With the correct digital strategy, you can get ahead of your competitors, get noticed by the right people, and build your brand quicker. ",
    img_1: marketing1,

    heading_2: "Boost your Online Presence",
    description_2:
      "At Atrix IT Solutions, we are experts in result-driven digital marketing! From enhancing your website's search engine visibility to developing effective social media campaigns, we use effective strategies that bring in more customers. Our experts collaborate with you to learn about your objectives and develop a strategy that best meets your business requirements. Regardless of whether you're looking to grow traffic, grow sales, or establish your web presence, we have the software and expertise to help you succeed. Let's get started now and drive your business to new heights!",
    img_2: marketing2,
    img_3: marketing3,

    sub_service: [
      {
        services_heading: "Digital Marketing Services",
        services_desc:
          "Digital marketing is strategizing and focused promotion of products and services to grow a business. However, here are a few points listed below:",
        all_services: [
          {
            service_name: "Marketing",
            service_desc:
              "Marketing is about getting in touch with the right people by providing the right information. It helps in showcasing your business, products, or services to a larger audience with various tools such as websites, advertisements, emails, and social media. Good marketing builds trust and helps your business grow.",
            hover_image: hover_3_marketing,
          },
          {
            service_name: "Strategy",
            service_desc:
              "A digital marketing strategy is a plan that shows how to achieve your business objectives online. It involves steps such as understanding your audience, selecting the appropriate platforms, and producing helpful content. A clear strategy assists you in staying on track and achieving better results from your marketing efforts.",
            hover_image: hover_6_strategy,
          },
          {
            service_name: "SEO",
            service_desc:
              "SEO (Search Engine Optimization) makes your website rank up higher in search engine results such as Google. It involves proper keyword usage, page speed optimization, and developing useful content. With proper SEO, more individuals can locate your website when they search for something related.",
            hover_image: hover_4_seo,
          },
          {
            service_name: "SMO",
            service_desc:
              "SMO (Social Media Optimization) improves your presence on social sites such as Facebook, Instagram, and LinkedIn. SMO involves publishing informative content, applying appropriate hashtags, and engaging with the audience. SMO assists you in reaching more people and making more intimate relationships with customers.",
            hover_image: hover_5_smo,
          },
          {
            service_name: "Digital Ads",
            service_desc:
              "Digital ads are internet advertisements shown on websites, search engines, or social media. They help in marketing your business to the right people. You can set your budget, select your audience, and check how effective the ads are to achieve better results.",
            hover_image: hover_2_digital,
          },
           {
            service_name: "Influencer Marketing",
            service_desc:
              "Tap into culture with creators who speak your audience’s language. We blend storytelling with strategy to craft influencer-led campaigns that convert. It’s not just reach — it’s real engagement with real people.",
            hover_image: hover_7_Influencer,
          },
          {
            service_name: "Content Creation",
            service_desc:
              "Content creation is all about making helpful and engaging materials such as blogs, videos, and photos for your site and social networks. Excellent content solves problems, creates trust, and brings people back. It's an essential component of any digital marketing strategy.",
            hover_image: hover_1_content_creation,
          },
        ],
      },
    ],
    cards_sec_heading: "Why Your Business Should Be Using Digital Marketing Services",
    cards_sec_data: [
      {
        cardTitle: "Reach More Customers",
        desc: "Digital marketing enables you to reach individuals anywhere in the world. If they are on Google, Facebook, or YouTube, your message can reach them quickly. This implies that more individuals are aware of your business and what you have to offer.",
      },
      {
        cardTitle: "Cost-Effective Promotion",
        desc: "Unlike print ads, digital marketing allows you to advertise cheaply. You can spend less and still reach many people. It's perfect for small businesses with the right budgets.",
      },
      {
        cardTitle: "Track Results Easily",
        desc: "One of the best aspects of digital marketing is that you can monitor what works. You can follow up on how many people viewed your ad, clicked it, or bought something. This allows you to get better over time",
      },
    ],
    ctImage : ct_marketing,
    why_atrix_heading: "Why Atrix",
    why_atrix_subheading: "Get Real Results with Proven Marketing Tactics",
    why_atrix_desc: [
      "Did you know over 5 billion people use the internet every day? Digital marketing helps your business grow by connecting you with more people online, right where they spend most of their time. At Atrix IT Solutions, we understand how to use the right tools and strategies to help your brand get noticed. From SEO and social media to content and ads, we cover everything you need to build a strong online presence. Partner with us and let’s grow your business together, the smart and effective way.",
    ],
    process_cards: [
      {
        title: "Audience Research",
        desc: "Identifying buyer personas, pain points and digital behaviors.",
      },
      {
        title: "Channel Strategy",
        desc: "Selecting optimal marketing mix based on goals and audience.",
      },
      {
        title: "Campaign Development",
        desc: "Creating targeted messaging and conversion paths.",
      },
      {
        title: "Execution & Monitoring",
        desc: "Launching campaigns with real-time performance tracking.",
      },
      {
        title: "Optimization",
        desc: "Continuous testing and refinement for better results.",
      },
    ],
    quote:
      "Digital marketing is about having the right conversation with the right person at the right time.",
    faqs: [
      {
        category: "Marketing FAQs",
        content: [
          {
            q: "How soon will we see results from SEO efforts?",
            a: "SEO typically takes 4-6 months to show measurable improvements, with compounding growth over 12-18 months of consistent effort.",
          },
          {
            q: "What's your approach to PPC campaign management?",
            a: "We focus on high-intent keywords, tightly themed ad groups, and continuous bid optimization to maximize conversion value.",
          },
          {
            q: "Do you specialize in specific industries?",
            a: "We have particular expertise in B2B technology, professional services, ecommerce, healthcare and financial services.",
          },
          {
            q: "How do you measure marketing success?",
            a: "We establish clear KPIs upfront based on business objectives, tracking metrics like CAC, LTV, ROAS and pipeline influence.",
          },
          {
            q: "Can you work with our internal marketing team?",
            a: "Absolutely - we frequently collaborate with in-house teams to provide specialized expertise or additional bandwidth.",
          },
        ],
      },
    ],
    seotitle:"Online Marketing Services | Boost Your Online Presence with Atrix IT Solutions",
    seodescription:"Looking for a small business marketing agency? Atrix IT Solutions offers expert branding and marketing services along with online marketing services.",
    keywords:"small business marketing agency,branding and marketing agency,best seo company for small businesses,online marketing services,online ad agency,social digital marketing agency,local business marketing agency,seo for professional services,affordable local seo services,seo and social media marketing services,b2b digital marketing services,Social media optimization agency,social media optimization services,social media optimization services,social media growth services,social media optimization company"
  },
  {
    slug: "Visual-Effects",
    service_title: "Visual Effects",
    icon: Asset4,
    main_desc:
      "Looking to bring your ideas to life with stunning visual effects? At Atrix IT Solutions, we specialize in creating eye-catching VFX that captivate and engage your audience. Whether it's for film, advertisements, or digital media, our expert team delivers cutting-edge effects that enhance your project and leave a lasting impact. Transform your vision into reality with Atrix IT Solutions today and make your visuals unforgettable!  ",
    tags: [
      "VFX",
      "SFX",
      "3D",
      "Editing",
      "Composition",
      "Grading",
      "Motion Graphics",
    ],
    main_image: visual,
    category: "Visual Effects (VFX)",
    // category: "Visual Effects",
    heading_1: "Cutting-Edge Visual Effects",
    description_1:
      "Modern storytelling depends on visual effects as its fundamental power, which our studio enhances through its advanced capabilities. Our state-of-the-art visual effects services unite creative vision with modern technological capabilities to enhance your content. Our team of expert VFX artists uses their precision and artistic skills to transform your imaginative concepts into realistic visual creations, whether you need dramatic cinematic sequences, hyper-realistic CGI environments, or subtle emotional depth enhancements.",

    img_1: vfx_1,
    heading_2: "Crafted to Captivate",

    description_2:
      "  Our team uses leading-edge tools and methods to merge digital components with live-action footage, which produces realistic and emotionally powerful visuals. Every frame we create combines dynamic particle effects with explosive simulations and detailed 3D modeling and compositing techniques to deliver captivating visuals that enhance your brand narrative. Our mission extends beyond visual impact to assist you in creating a narrative that both moves audiences deeply and remains in their minds after the screen goes dark.",
    img_2: vfx_2,
    img_3: vfx_3,
    sub_service: [
      {
        services_heading: "VFX Services",
       
        all_services: [
          {
            service_name: "VFX (Visual Effects)",
            service_desc:
              "Our team creates breathtaking digital visual effects which combine imaginative elements with realistic elements to boost narrative impact.",
            hover_image: hover_vfx_1,
          },
          {
            service_name: "SFX (Special Effects)",
            service_desc:
              "Practical on-set effects, including smoke, fire, and mechanical rigs, create real-time authenticity and dramatic effects in your scenes.",
            hover_image: hover_vfx_2,
          },
          {
            service_name: "3D",
            service_desc:
              "Our 3D work delivers realistic motion and depth to visual projects through the creation of lifelike characters and immersive environments.",
            hover_image: hover_vfx_3,
          },
          {
            service_name: "Editing",
            service_desc:
              "We transform raw footage into compelling visual narratives through strategic editing techniques that maintain audience interest.",
            hover_image: hover_vfx_4,
          },
          {
            service_name: "Composition",
            service_desc:
              "We achieve cohesive and polished cinematic effects by combining multiple visual elements through layering and blending techniques.",
            hover_image: hover_vfx_5,
          },
          {
            service_name: "Grading",
            service_desc:
              "Our expert color correction and grading process establishes visual tone and mood which intensifies the emotional power of each frame.",
            hover_image: hover_vfx_6,
          },
          {
            service_name: " Motion Graphics",
            service_desc:
              "Our team adds clarity and style to visuals through the integration of sleek titles and animated elements and transitions, which bring energy to your content.",
            hover_image: hover_vfx_7,
          },

        ],
      },
    ],
    cards_sec_heading: "Why do you need branding",
    cards_sec_data: [
      {
        cardTitle: "Enhanced Storytelling",
        desc: "Visual effects allow you to tell stories and explain concepts that would be impossible with live action alone.",
      },
      {
        cardTitle: "Cost Efficiency",
        desc: "VFX can often achieve results more affordably than practical effects, especially for complex scenarios.",
      },
      {
        cardTitle: "Creative Freedom",
        desc: "Break free from physical limitations and create anything imaginable through CGI and compositing.",
      },
    ],
    ctImage : ct_vfx,
    why_atrix_heading: "Why Atrix",
    why_atrix_subheading: "Seamless Integration of Effects and Reality",
    why_atrix_desc: [
      "We blend technical expertise with artistic vision to create effects that serve the story rather than distract from it. Our pipeline combines industry-standard software with proprietary techniques for efficient, high-quality results. The team includes veterans from film, television and advertising with deep experience across all VFX fields.",
    ],

    process_cards: [
      {
        title: "Understanding Your Business",
        desc: "Our first step involves learning about your brand identity together with your business targets and objectives to match our visual effects with your original vision.",
      },
      {
        title: "Planning the Strategy",
        desc: "We develop a strategic plan that includes both creative and technical aspects to select the most suitable style, techniques, and platforms that will achieve your goals.",
      },
      {
        title: "Creating Quality Content",
        desc: "Our team creates content that effectively demonstrates your business offerings to potential customers. The quality of your content determines how well it will attract viewers while maintaining their interest.",
      },
      {
        title: "Running Digital Ads",
        desc: "Through strategic ad placement on different platforms, we help increase content visibility to achieve better engagement and conversion rates.",
      },
      {
        title: "Tracking and Improving",
        desc: "Our team tracks performance data while collecting feedback to make ongoing improvements in VFX and marketing strategies, which produce maximum impact",
      },
    ],
    quote:
      "The best visual effects are invisible - they enhance reality without calling attention to themselves.",
    faqs: [
      {
        category: "VFX FAQs",
        content: [
          {
            q: "What software do you use for VFX work?",
            a: "Our toolkit includes Maya, Cinema 4D, Houdini, Nuke, After Effects, Substance and Unreal Engine.",
          },
          {
            q: "Can you match our existing visual style?",
            a: "Absolutely - we analyze and replicate existing styles to maintain brand consistency across projects.",
          },
          {
            q: "How long do VFX projects typically take?",
            a: "Timelines vary widely by complexity - simple motion graphics may take days, while complex CGI sequences can require months.",
          },
          {
            q: "Do you provide on-set supervision?",
            a: "Yes, we offer on-set VFX supervision to ensure proper filming for post-production integration.",
          },
          {
            q: "What file formats can you deliver?",
            a: "We provide industry-standard formats including EXR, DPX, MOV, and PNG sequences at any required resolution.",
          },
        ],
      },
    ],
    seotitle:"Motion Graphics & VFX Service by Atrix IT Solutions",
    seodescription:"Looking for a reliable motion graphics company? Atrix IT Solutions offers top-notch VFX services to create stunning visuals for videos, ads, and more.",
    keywords:"motion graphics company,motion design agency,motion graphics design company,motion graphics services,3d services,professional video production services,motion graphics agency,vfx service,video editor service,3d motion graphics service,professional video editing services,color grading services"
  },
  {
    slug: "Photo-Video-Production",
    service_title: "Photo/Video Production",
    icon: Asset5,
    main_desc:
      "Your moments deserve the spotlight! At Atrix IT Solutions, we specialize in photo and videography that showcases your vision in the most stunning way. From events and branding to creative projects, our team ensures every shot is perfect. With high-quality photography and dynamic videography, we make your ideas come to life. Ready to capture the perfect shot? Partner with Atrix IT Solutions and let’s create something amazing together! ",
    tags: [
      "Corporate Shoot",
      "Product Shoot",
      "Food Photography",
      "Commercial Shoot ",
    ],
    main_image: video,
    category: "Photo/Videography",
    // category: "Media Production",
    heading_1: "Professional Visual Storytelling",
    description_1:
      "At Atrix, we're experts at creating stunning images and videos that vividly convey your brand. Our team creates content that not only looks amazing but also perfectly fits your marketing objectives by fusing strategic messaging with cinematic techniques.",
    img_1: video_1,
    heading_2: "Creating Visuals that Build Trust",
    description_2:
      "We make sure every frame conveys value, trust, and professionalism, whether you're showcasing your goods, summarising your services, or sharing the backstory of your company. Our visual content, which ranges from corporate films and promotional videos to product photography and event coverage, is made to captivate viewers, strengthen your brand, and produce outcomes on digital media.",
    img_2: video_2,
    img_3: video_3,
    sub_service: [
      {
        services_heading: "Photo/Video Production Services",
        services_desc:
          "End-to-end production solutions tailored to your brand's needs—from concept development to final delivery across photography, videography and multimedia formats.",
        all_services: [
          {
            service_name: "Corporate Shoot",
            service_desc:
              "Our corporate photography sessions are intended to elegantly and professionally capture the spirit of your company. We visually represent your company's values, atmosphere, and professionalism through everything from team interactions and leadership portraits to behind-the-scenes operations and office culture. These images support internal brand identity, draw in top talent, and increase client trust. Whether it's formal, creative, or dynamic, we make sure every shot captures the essence of your brand and works well on digital platforms, presentations, and marketing collateral.",
            hover_image: hover_4,
          },
          {
            service_name: " Product Shoot",
            service_desc:
              "Our speciality is producing visually striking product photography and videos that accurately showcase the features, functionality, and design of your product. Our photo shoots are designed to make your products stand out, whether they are for social media, catalogues, e-commerce, or advertising. We take pictures that convey quality and usefulness in addition to aesthetic appeal by utilising expert lighting, imaginative angles, and well-styled setups. In a crowded market, we want to increase consumer interest, encourage conversions, and visually enhance your brand's offerings.",
            hover_image: hover_2_meeraaj,
          },
          {
            service_name: "Food Photography",
            service_desc:
              "With artistic accuracy, our food photography captures the flavours, textures, and freshness of your dishes. We create images that make your culinary creations enticing, making them ideal for food brands, cafés, restaurants, and cloud kitchens. To arouse your audience's emotions and appetite, we concentrate on colourful compositions, eye-catching styling, and tantalising close-ups. You can create a powerful food brand and draw in hungry customers with these images, which are perfect for menus, websites, social media, and advertising campaigns.",
            hover_image: hover_1_food,
          },
          {
            service_name: "Commercial Shoot",
            service_desc:
              "The purpose of commercial shoots is to use excellent, ad-ready images to market your company, service, or product. We design, plan, and implement impactful visuals that emotionally engage your target audience, whether they are for digital billboards, TV, online ads, or social campaigns. Our team makes sure that every frame has a strategic marketing purpose, from creative direction and scripting to shooting and post-production. These photo/video shoots are designed to increase brand recognition, sway consumer choices, and produce quantifiable business outcomes.",
            hover_image: hover_3,
          },
        ],
      },
    ],
    cards_sec_heading: "Why do you need branding",
    cards_sec_data: [
      {
        cardTitle: "Brand Perception",
        desc: "High-quality visuals immediately elevate how customers perceive your brand quality and professionalism.",
      },
      {
        cardTitle: "Engagement Impact",
        desc: "Video content generates significantly more shares and engagement than text or images alone.",
      },
      {
        cardTitle: "Content Versatility",
        desc: "Professional assets can be repurposed across websites, social media, ads and print materials.",
      },
    ],
    ctImage : ct_video,
    why_atrix_heading: "Why Atrix",
    why_atrix_subheading: "Cinematic Quality meets Commercial Objectives",
    why_atrix_desc: [
      "We combine artistic vision with technical expertise to create visuals that capture attention while clearly communicating your key messages. Our productions are strategically planned with your marketing goals and distribution channels in mind from the outset. The team includes award-winning directors, cinematographers and editors using professional cinema equipment for broadcast-quality results.",
    ],
    process_cards: [
      {
        title: "Creative Briefing",
        desc: "The project begins with understanding your vision while defining the objectives, target market and essential points. The initial phase ensures that your brand objectives match the visual outcome of the project.",
      },
      {
        title: "Pre-Production",
        desc: "Our team develops detailed scripts and storyboards and shot lists in addition to arranging locations and talent and scheduling. The planning phase establishes the foundation for a smooth and productive shooting process.",
      },
      {
        title: "Production",
        desc: "Our team uses high-quality cameras together with advanced lighting and audio equipment to create exceptional visual content. The direction of each scene is done with precision to achieve both visual consistency and narrative power.",
      },
      {
        title: "Post-Production",
        desc: "Our editors use professional editing techniques along with colour grading, sound design and visual enhancements to finalize the video. The final product receives expert refinement to achieve both visual appeal and professional quality.",
      },
      {
        title: "Delivery",
        desc: "We deliver the final content in optimized formats for web, social media, broadcast, and other platforms. Timely delivery and quality assurance ensure you're ready to go live with confidence.",
      },
    ],
    quote:
      "Great visual content doesn't just capture attention - it captures hearts, minds and market share.",
    faqs: [
      {
        category: "Production FAQs",
        content: [
          {
            q: "What equipment do you use for video production?",
            a: "We shoot with professional cinema cameras (RED, ARRI, Blackmagic), prime lenses, and professional lighting/audio gear for broadcast-quality results.",
          },
          {
            q: "Can you help develop concepts and scripts?",
            a: "Absolutely - our creative team develops strategic concepts and complete scripts tailored to your marketing objectives and brand voice.",
          },
          {
            q: "How long does a typical video project take?",
            a: "Most corporate video projects take 4-6 weeks from concept to final delivery, depending on complexity, locations and revisions.",
          },
          {
            q: "Do you provide actors/models or locations?",
            a: "Yes, we have access to professional talent pools and location resources to meet all production needs.",
          },
          {
            q: "What file formats do you deliver?",
            a: "We provide web-optimized files (MP4, MOV) along with high-resolution masters suitable for broadcast or print use.",
          },
        ],
      },
    ],
    seotitle:"Video Production Company & Editing Services by Atrix IT Solutions",
    seodescription:"Looking for a reliable video production company? Atrix IT Solutions specializes in commercial production and expert video editing services. Contact us for professional video solutions!",
    keywords:"video production company,commercial production company,video editing services,corporate video production company,animated video production companies,youtube video editing services,product photography services,social media video services,commercial photography company,ecommerce product photography services,video production agency,photography editing services,food photography services"
  },
  //   {
  //     slug: "Staffing",
  //     service_title: "Staffing",
  //     icon: Asset6,
  //     main_desc:
  //       "Ready to boost your business with a flexible workforce? Our solution helps you create a staffing plan that adapts to your needs, saving you money and ensuring compliance. With our platform, you can improve efficiency, reduce costs, and stay ahead in today’s fast-paced market. Empower your business with a staffing strategy designed to grow and succeed!",
  //     tags: [
  //       "Us Staffing",
  //       "Us Recruiter",
  //       "Payroll",
  //       "Talent Acquisition ",
  //       "Us Hiring",
  //     ],
  //     main_image: staffing,
  //     category: "Staffing Solutions",
  //     heading_1: " Strategic Talent Acquisition",
  //     description_1:
  //       "We are experts in hiring people strategically, which goes beyond simply covering open positions. Our approach is designed to satisfy your company's particular hiring requirements, ensuring that you will not only find exceptional talent but also create a long-lasting, sustainable workforce. We collaborate closely with you to get your company's culture, goals, and future vision, ensuring the candidates we offer adjust together with your vital targets. ",
  //     img_1: image_1,
  //     heading_2: " Smart Staffing Solutions",
  // description_2: "In order to help you remain competitive in a changing market, our staffing solutions are made for both your immediate needs and your long-term expansion. Our expertise in identifying, screening, and assigning highly qualified workers enables your company to grow effectively, sustain output, and experience continuous success.",

  //     img_2: image_2,
  //     sub_service: [
  //       {
  //         // services_heading: "U.S Recruitment",
  //         // services_desc:
  //         //   "Finding and placing elite professionals for clients across the US is our area of expertise. Only the most capable and culturally compatible applicants are chosen as a result of our industry-specific hiring procedure. We handle every step of the process, from initial sourcing to the final placement, quickly, accurately, and in accordance with US service regulations.",
  //         all_services: [
  //           {
  //             service_name: "U.S Recruitment", 
  //             service_desc:
  //               "Finding and placing elite professionals for clients across the US is our area of expertise. Only the most capable and culturally compatible applicants are chosen as a result of our industry-specific hiring procedure. We handle every step of the process, from initial sourcing to the final placement, quickly, accurately, and in accordance with US service regulations.",
  //             hover_image: hover_img,
  //           },
  //           {
  //             service_name: "Payroll",
  //             service_desc:
  //               "Finding the right long-term candidates through targeted search and comprehensive vetting processes to ensure perfect cultural and skills fit.",
  //             hover_image: hover_img,
  //           },
  //           {
  //             service_name: "Talent Acquisition",
  //             service_desc:
  //               "Our talent acquisition process extends past standard recruitment methods. Our talent acquisition process focuses on finding exceptional professionals who match your company objectives and cultural values and share your long-term organizational direction. Our approach of strategic sourcing combined with data assessments and thorough candidate evaluations enables you to build a workforce that drives growth and innovation. Our customized approach helps you acquire suitable talent exactly when you need them regardless of your current growth stage or specific hiring needs.",
  //             hover_image: hover_img,
  //           },
  //           {
  //             service_name: "U.S. Hiring",
  //             service_desc:
  //               "We deliver complete hiring solutions for businesses operating in the United States which ensures complete compliance with federal and state employment regulations. Our U.S. hiring services include job posting, applicant tracking, screening, background verification, and onboarding. Our expertise in various industries and local labor markets helps you discover suitable candidates quickly while reducing risks and boosting operational efficiency",
  //             hover_image: hover_img2,
  //           },
  //           {
  //             service_name: "Client Engagement",
  //             service_desc:
  //               "Our staffing services depend on building strong relationships with our clients. We invest time to grasp your specific hiring difficulties along with your organizational targets and team relationships. Our partnership delivers continuous communication along with performance feedback and dedicated account management to provide a smooth and responsive experience. Our mission is to function as an additional component of your HR department by delivering flexible and effective staffing solutions that drive your business expansion.",
  //             hover_image: hover_img3,
  //           },
  //         ],
  //       },
  //     ],
  //     cards_sec_heading: "Why do you need branding",
  //     cards_sec_data: [
  //       {
  //         cardTitle: "Reduced Hiring Time",
  //         desc: "Our extensive networks and processes fill positions 40% faster than traditional hiring methods.",
  //       },
  //       {
  //         cardTitle: "Quality Candidates",
  //         desc: "Rigorous screening ensures only the most qualified, culture-fit candidates are presented.",
  //       },
  //       {
  //         cardTitle: "Cost Efficiency",
  //         desc: "Reduce bad hires and turnover costs while optimizing recruitment spend.",
  //       },
  //     ],
  //     why_atrix_heading: "Why Atrix",
  //     why_atrix_subheading: "Quality-focused talent acquisition",
  //     why_atrix_desc: [
  //       "We go beyond resumes to understand both candidate capabilities and cultural fit with your organization.",
  //       "Our recruiters specialize in specific industries and functions, bringing deep market knowledge to each search.",
  //       "Proprietary assessment tools and interview techniques ensure candidates meet both technical and soft skill requirements.",
  //     ],
  //     process_cards: [
  //       {
  //         title: "Needs Assessment",
  //         desc: "Our team works with clients to determine the exact requirements of the role along with team organization and business objectives to establish the perfect candidate profile.",
  //       },
  //       {
  //         title: "Talent Sourcing",
  //         desc: "Our strategic sourcing methods allow us to access high-quality candidates through our professional networks and job portals and talent databases.",
  //       },
  //       {
  //         title: "Screening & Evaluation",
  //         desc: "The evaluation process includes complete interviews and background checks and skill assessments to verify candidates fulfill both technical standards and cultural requirements.",
  //       },
  //       {
  //         title: "Candidate Presentation",
  //         desc: "Our service provides you with a selection of pre-screened qualified candidates who receive complete profile information to simplify your recruitment process.",
  //       },
  //       {
  //         title: "Onboarding Support",
  //         desc: "We provide assistance with documentation and communication and integration services to create a smooth onboarding process for both clients and candidates.",
  //       },
  //     ],
  //     quote:
  //       "The right talent transforms organizations - we don't just fill positions, we build high-performing teams.",
  //     faqs: [
  //       {
  //         category: "Staffing FAQs",
  //         content: [
  //           {
  //             q: "What industries do you specialize in?",
  //             a: "We have particular expertise in technology, healthcare, finance, engineering and professional services.",
  //           },
  //           {
  //             q: "How do you source candidates?",
  //             a: "We use proprietary databases, professional networks, referrals and targeted outreach to passive candidates.",
  //           },
  //           {
  //             q: "What's your placement guarantee?",
  //             a: "We offer 90-day replacement guarantees on most permanent placements at no additional cost.",
  //           },
  //           {
  //             q: "Can you handle high-volume hiring?",
  //             a: "Yes, we've managed recruitment campaigns for 100+ positions simultaneously through scalable processes.",
  //           },
  //           {
  //             q: "How do you assess cultural fit?",
  //             a: "We analyze your culture through interviews and tools, then evaluate candidates against those criteria.",
  //           },
  //         ],
  //       },
  //     ],
  //   },

  
  // {
  //   slug: "Logistics",
  //   service_title: "Logistics",
  //   icon: Asset7,
  //   main_desc:
  //     "Atrix is a modern logistics firm dedicated to providing our clients throughout the world with outstanding service and cutting-edge solutions. Having worked in the transportation and logistics industry for five years, we have made a name for ourselves as a reliable partner. Road freight is in our extensive service offering, which enables us to satisfy the varied demands of companies in a number of sectors.",
  //   tags: ["OTR", "Drayage", "Jctrans"],
  //   main_image: log,
  //   category: "Logistics",
  //   // category: "Logistics Solutions",
  //   heading_1: "Optimized Supply Chain Solutions",
  //   description_1:
  //     "We specialize in developing complete logistics strategies that help businesses achieve operational efficiency and market competitiveness. Our solutions adapt to individual client requirements to minimize operational expenses while shortening delivery times and improving service quality.",
  //   img_1: logistics_1,
  //   heading_2: "Intelligent Logistics Network Design",
  //   description_2:
  //     "Our solutions transform basic supply chains into agile, data-driven ecosystems through intelligent network design and transportation optimization and seamless technology integration. Our team ensures that all components of your logistics framework operate harmoniously through their expertise in inventory management, route planning, and last-mile delivery.",
  //   img_2: logistics_2,
  //   img_3: logistics_3,
  //   sub_service: [
  //     {
  //       services_heading: "Logistics Services",
  //       services_desc:
  //         "End-to-end supply chain solutions tailored to your product characteristics, customer requirements and business objectives.",
  //       all_services: [
  //         {
  //           service_name: "OTR (Over-the-Road)",
  //           service_desc:
  //             "Our highway network enables efficient long-distance transportation, which delivers your shipments promptly and reliably between starting and ending points.",
  //           hover_image: hover_2_otr,
  //         },
  //         {
  //           service_name: "Drayage",
  //           service_desc:
  //             "Our company provides essential short-haul transportation services between ports, rail yards, and warehouses to maintain supply chain efficiency through fast and accurate operations.",
  //           hover_image: hover_1_drayage,
  //         },
  //         {
  //           service_name: "Transportation",
  //           service_desc:
  //             "Optimizing routing, carrier selection and freight consolidation to reduce costs while improving delivery reliability.",
  //           hover_image: hover_3_transport,
  //         },
  //       ],
  //     },
  //   ],
  //   cards_sec_heading: "Why do you need branding",
  //   cards_sec_data: [
  //     {
  //       cardTitle: "Cost Reduction",
  //       desc: "Our solutions typically reduce logistics costs by 15-30% through network optimization.",
  //     },
  //     {
  //       cardTitle: "Service Improvement",
  //       desc: "Enhance customer satisfaction through faster, more reliable deliveries.",
  //     },
  //     {
  //       cardTitle: "Scalability",
  //       desc: "Flexible solutions grow with your business needs and expansion.",
  //     },
  //   ],
  //   ctImage : ct_logostics,
  //   why_atrix_heading: "Why Atrix",
  //   why_atrix_subheading: "Data-driven supply chain optimization",
  //   why_atrix_desc: [
  //     "We analyze your current operations to identify inefficiencies and opportunities for improvement across the entire supply chain.",
  //     "Technology integration provides real-time visibility and control over inventory, shipments and costs.",
  //     "Customized solutions balance cost, service and flexibility based on your specific business requirements.",
  //   ],
  //   process_cards: [
  //     {
  //       title: "Current State Analysis",
  //       desc: "Our team conducts a thorough examination of your current logistics system to determine both successful elements and limiting factors.",
  //     },
  //     {
  //       title: "Opportunity Assessment",
  //       desc: "Our data analysis reveals both existing gaps and unexplored potential within your supply chain operations.",
  //     },
  //     {
  //       title: "Solution Design",
  //       desc: "Our team creates flexible logistics models that precisely match your business objectives",
  //     },
  //     {
  //       title: "Implementation",
  //       desc: "Our team of experts executes the strategy with exactness and rapidity while maintaining complete continuity.",
  //     },
  //     {
  //       title: "Continuous Improvement",
  //       desc: "Our real-time tracking system combined with agile adjustments enables your logistics operations to stay ahead of demand through continuous improvement.",
  //     },
  //   ],
  //   quote:
  //     "Efficient logistics operations are the invisible backbone of successful businesses - when they work well, no one notices, but when they fail, everyone feels the impact.",
  //   faqs: [
  //     {
  //       category: "Logistics FAQs",
  //       content: [
  //         {
  //           q: "What geographic areas do you cover?",
  //           a: "We provide logistics solutions for local, national and international supply chains across all major markets.",
  //         },
  //         {
  //           q: "How do you measure logistics performance?",
  //           a: "Key metrics include order fulfillment time, inventory turns, transportation cost per unit and perfect order percentage.",
  //         },
  //         {
  //           q: "Can you help implement logistics technology?",
  //           a: "Yes, we have experience with leading TMS, WMS and visibility platforms and can manage selection and implementation.",
  //         },
  //         {
  //           q: "What industries do you specialize in?",
  //           a: "We have deep expertise in retail, manufacturing, healthcare and ecommerce logistics.",
  //         },
  //         {
  //           q: "How long do logistics projects typically take?",
  //           a: "Initial assessments take 2-4 weeks, with implementation timelines varying by scope from 3-12 months.",
  //         },
  //       ],
  //     },
  //   ],
  // },
];

export default ServicesData;
