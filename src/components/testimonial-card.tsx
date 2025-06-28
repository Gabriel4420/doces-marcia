import React from "react";
import Image from "next/image";
import { TestimonialCardProps } from "@/types/testimonial-card";

export const TestimonialCard = ({ image }: TestimonialCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-4 flex flex-col items-center justify-center">
      <Image
        src={image}
        alt="Depoimento de cliente"
        width={256}
        height={256}
        className="w-60 h-60 object-cover rounded-sm mb-3 border"
      />
    </div>
  );
};