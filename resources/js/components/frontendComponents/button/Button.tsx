import React, { useRef, useEffect } from "react";
import { RxArrowTopRight } from "react-icons/rx";

interface ButtonProps {
  mybtn: string;
  btnLink?: string;
  targetRef?: React.RefObject<HTMLElement>;
}

const Button: React.FC<ButtonProps> = ({ mybtn, targetRef }) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);

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

  const handleClick = () => {
    if (targetRef?.current) {
      const top = targetRef.current.getBoundingClientRect().top + window.pageYOffset - 140;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleClick}
      ref={btnRef}
      className="bg-[#262626] font-bold text-(--white) px-4 py-2 duration-300 rounded-lg hover:bg-(--green) cursor-pointer flex items-center gap-2 hover:scale-104 group service-cta-btn"
    >
      {mybtn}
      <span>
        <RxArrowTopRight
          id="btnArrow"
          className="group-hover:rotate-45 group-hover:scale-140 duration-250"
        />
      </span>
    </button>
  );
};

export default Button;
