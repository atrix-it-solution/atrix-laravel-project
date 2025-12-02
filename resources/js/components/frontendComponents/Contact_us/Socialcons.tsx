import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "@inertiajs/react";
import "./Socialcons.css";
import { FaBehance } from "react-icons/fa";

const Socialcons = () => {
  return (
    <div className="py-2.5">
      <ul className="flex gap-3 mt-3 md:justify-start">
        {[
          {
            icon: <FaFacebookF />,
            id: "fb",
            link: "https://www.facebook.com/people/Atrix-it-Solutions/61575371777365/",
          },
          {
            icon: <FaXTwitter />,
            id: "twitter",
            link: "https://x.com/AtrixIT_S",
          },
          {
            icon: <FaLinkedinIn />,
            id: "linkedin",
            link: "https://www.linkedin.com/company/atrixitsolutions/",
          },
          {
            icon: <FaInstagram />,
            id: "instas",
            link: "https://www.instagram.com/atrixit.solutions/",
          },
          {
            icon: <FaBehance />,
            id: "insta",
            link: "https://www.behance.net/atrixit",
          },
        ].map((item) => (
          <li
            key={item.id}
            className="relative w-10 h-10 p-1 rounded-full cursor-pointer flex justify-center items-center text-white"
          >
            <Link
              href={item.link}
              target="_blank"
              className="absolute inset-0 rounded-full hover:border-transparent hover:scale-120  p-[1px]"
            >
              <div className="social-icons w-full h-full flex justify-center items-center  hover:bg-gradient-to-r from-blue-400 to-green-400 rounded-full">
                {item.icon}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Socialcons;
