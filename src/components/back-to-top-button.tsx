'use client';
import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed z-50 bottom-24 right-6 bg-gray-800 hover:bg-gray-700 text-white rounded-full shadow-lg p-3 flex items-center justify-center transition-colors duration-200"
      aria-label="Voltar ao topo"
      style={{ outline: "none" }}
    >
      <FaArrowUp size={22} />
    </button>
  );
};

export default BackToTopButton; 