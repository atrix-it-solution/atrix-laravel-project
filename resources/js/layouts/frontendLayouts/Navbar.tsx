import React, { useState, useRef, useEffect } from "react";
import { Link,router  } from '@inertiajs/react';
import LinkButton from '../../components/frontendComponents/button/LinkButton';
// import { useLoader } from "../context/LoaderContext";

// import logo
const logo = "/assets/logo/logo-white.svg";

// Define menu item type
interface MenuItem {
  id: string;
  text: string;
  path: string;
}

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isExiting, setIsExiting] = useState(false);

  const iconRef = useRef<HTMLButtonElement | null>(null);
  const menuBtnRef = useRef<HTMLButtonElement | null>(null);
  const menuOverlayRef = useRef<HTMLDivElement | null>(null);


  const PRELOAD_DURATION = 1200; 
  const MENU_CLOSE_ANIM = 400;

  const menuItems: MenuItem[] = [
    { id: "home", text: "Home", path: "/" },
    { id: "about", text: "About", path: "/about" },
    { id: "services", text: "Services", path: "/services" },
    { id: "portfolio", text: "Portfolio", path: "/portfolio" },
    { id: "blog", text: "Blog", path: "/Blog" },
    { id: "contact", text: "Contact", path: "/contact-us" },
  ];

  const handleMenuToggle = () => {
    if (menuOpen) {
      setIsExiting(true);
      setTimeout(() => {
        setMenuOpen(false);
        setIsExiting(false);
      }, MENU_CLOSE_ANIM);
    } else {
      setMenuOpen(true);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === menuOverlayRef.current) {
      handleMenuToggle();
    }
  };

  const handleNavClick = (path: string) => {
    // setLoading(true);
    setIsExiting(true);
    setTimeout(() => {
      // router.visit(path);
      setMenuOpen(false);
      setIsExiting(false);
        // setTimeout(() => setLoading(false), 50);
   
    }, MENU_CLOSE_ANIM);
  };

  // Button hover effect
  useEffect(() => {
    const btn = menuBtnRef.current;
    if (!btn) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 4;
      btn.style.transform = `translate(${x * 0.4}px, ${y * 0.4}px)`;
    };

    const resetTransform = () => {
      btn.style.transform = "translate(0px, 0px)";
    };

    btn.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", resetTransform);

    return () => {
      btn.removeEventListener("mousemove", handleMouseMove);
      btn.removeEventListener("mouseleave", resetTransform);
    };
  }, []);

  // Disable body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  // Scroll detection for sticky header
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight / 125); // adjust threshold
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="nav-container">
      <nav className={`justify-between nav py-5 px-4 ${menuOpen ? "menu-open" : ""} ${scrolled ? "scrolled" : ""}`}>
        
        {/* Logo */}
        <div className="logo ml-4 md:ml-0">
          <Link href="/" onClick={() => { if (menuOpen) handleMenuToggle(); }}>
            <img src={logo} alt="Logo" className="h-[40px]" />
          </Link>
        </div>

        {/* Menu Right Side */}
        <div className="menuRightSide flex items-center">
          {!menuOpen && (
            <div className="mr-6 lets-talk-btn-mobile">
              <LinkButton mybtn={"Let's Talk"} btnLink="/contact-us" />
            </div>
          )}

          <button
            className="menu-btn"
            onClick={handleMenuToggle}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            ref={(el) => {
              iconRef.current = el;
              menuBtnRef.current = el;
            }}
          >
            <span className={`hamburger ${menuOpen ? "open" : ""}`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`HumbergurMenu ${menuOpen || isExiting ? "" : "hidden"}`}>
          <div
            className={`menu-overlay ${menuOpen && !isExiting ? "open" : ""}`}
            onClick={handleOverlayClick}
            ref={menuOverlayRef}
          ></div>
          <div className="h-screen flex justify-center items-center">
            <div className="menu-content grid grid-cols-12 md:grid-cols-12">
              {/* Menu Items */}
              <div className="navbar-menu-list col-span-12 md:col-span-8">
                <ul className="menu-items">
                  {menuItems.map((item, index) => (
                    <li
                      key={item.id}
                      className={`menu-item-wrapper ${menuOpen && !isExiting ? "fade-in" : isExiting ? "fade-out-left" : ""}`}
                      style={{ animationDelay: `${isExiting ? 0 : 0.4 + index * 0.2}s` }}
                    >
                      <Link
                        href={item.path}
                        type="button"
                        className={`menu-link overflow-hidden ${hoveredItem === item.id ? "hovered" : hoveredItem !== null ? "not-hovered" : ""}`}
                        onMouseEnter={() => setHoveredItem(item.id)}
                        onMouseLeave={() => setHoveredItem(null)}
                        onClick={() => handleNavClick(item.path)}
                      >
                        {item.text}
                      </Link>
                      <span className="item-number">0{index + 1}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact / Social */}
              <div className={`mb-6 flex col-span-12 md:col-span-4 md:items-end flex-col justify-end contact-social ${menuOpen && !isExiting ? "animate-in" : isExiting ? "animate-out" : ""}`}>
                <div className="md:w-full flex flex-col gap-1 max-w-[300px] mt-5 md:mt-0">
                  <p className="break-words text-[var(--blue)] font-bold underline mb-2 text-start md:text-end">
                    <a href="mailto:info@atrixitsolutions.com">info@atrixitsolutions.com</a>
                  </p>
                  <p className="location pb-12 text-start md:text-end">
                    D-179 Phase, 8B Industrial Area, Sector 74, SAS Nagar, Punjab 140501
                  </p>
                </div>
                <div className="flex flex-wrap justify-start gap-4 md:gap-5">
                  <a href="#"><i className="fab fa-facebook-f"></i></a>
                  <a href="#"><i className="fab fa-instagram"></i></a>
                  <a href="#"><i className="fab fa-behance"></i></a>
                  <a href="#"><i className="fab fa-twitter"></i></a>
                  <a href="#"><i className="fab fa-youtube"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </nav>
    </header>
  );
}
