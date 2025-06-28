'use client'
import { useEffect, useState } from "react";
import { TestimonialCard } from "@/components/testimonial-card";
import { Star } from "lucide-react";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      setLoading(true);
      const res = await fetch("/api/testimonials");
      const data = await res.json();
      setTestimonials(data);
      setLoading(false);
    };
    fetchTestimonials();
  }, []);

  return (
    <section
      className="py-8 md:py-16 bg-gray-50 dark:bg-gray-800"
      role="region"
      aria-labelledby="testimonials-title"
    >
      <div className="container mx-auto px-4 max-w-[312px] md:max-w-none">
        <div className="text-center mb-8 md:mb-12">
          <h2 id="testimonials-title" className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-3 md:mb-4">
            O que nossos <span className="text-pink-500">clientes</span> dizem
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-2">
            Depoimentos de quem já experimentou os doces da Márcia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {loading ? (
            <p className="col-span-full text-center">Carregando depoimentos...</p>
          ) : testimonials.length === 0 ? (
            <p className="col-span-full text-center">Em breve ...</p>
          ) : (
            testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} {...testimonial} />
            ))
          )}
        </div>

        <div className="text-center mt-8 md:mt-12">
          <div className="flex items-center justify-center space-x-1 mb-3 md:mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 md:w-6 md:h-6 text-yellow-400 fill-current" aria-hidden="true" />
            ))}
          </div>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
            <span className="font-semibold text-pink-500">4.9/5</span> - Média de avaliação dos clientes
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;