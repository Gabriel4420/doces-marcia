import React from "react";
import { FaWhatsapp } from "react-icons/fa";
const WHATSAPP_NUMBER = "5517991271906"; // Número atualizado com DDI e DDD
const WHATSAPP_MESSAGE = "Olá! Gostaria de saber mais sobre os produtos.";

export const WhatsappButton = () => {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-50 bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg p-4 flex items-center justify-center transition-colors duration-200"
      aria-label="Fale conosco no WhatsApp"
    >
      <FaWhatsapp size={30} />
    </a>
  );
};

export default WhatsappButton; 