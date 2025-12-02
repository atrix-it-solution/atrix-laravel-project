import React, { useEffect, useRef } from 'react';
import { RxArrowTopRight } from 'react-icons/rx';
import { Link } from '@inertiajs/react';

interface LinkButtonProps {
  mybtn: React.ReactNode;
  btnLink: string;
  bgColor?: string;
  hoverColor?: string;
  children?: React.ReactNode;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  mybtn,
  btnLink,
  bgColor = "bg-[#262626]",
  hoverColor = "hover:bg-[--green]",
}) => {
  const btnRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const btn = btnRef.current;
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

  return (
    <Link
      href={btnLink}
      ref={btnRef}
      aria-label={typeof mybtn === "string" ? mybtn : "button"}
      className={`${bgColor} font-bold text-white px-2 py-[6px] ps-4 lg:px-4 lg:py-2 
                  duration-300 rounded-lg ${hoverColor} cursor-pointer flex items-center gap-2 
                  hover:scale-104 group service-cta-btn flex-in text-[14px]`}
    >
      {mybtn}
      <span>
        <RxArrowTopRight
          id="btnArrow"
          className="group-hover:rotate-45 group-hover:scale-140 duration-250"
        />
      </span>
    </Link>
  );
};

export default LinkButton;
