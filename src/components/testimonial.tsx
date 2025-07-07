'use client'
import { useEffect, useState } from "react";
import { TestimonialCard } from "@/components/testimonial-card";
import { Star } from "lucide-react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openModalId, setOpenModalId] = useState<number | null>(null);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    breakpoints: {
      "(max-width: 500px)": {
        slides: { perView: 1, spacing: 8 },
      },
      "(max-width: 900px)": {
        slides: { perView: 2, spacing: 12 },
      },
    },
    slides: { perView: 3, spacing: 16 },
  });

  useEffect(() => {
    const fetchTestimonials = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/testimonials");
        if (!res.ok) {
          setError("Erro ao carregar depoimentos.");
          setTestimonials([]);
        } else {
          const data = await res.json();
          setTestimonials(Array.isArray(data) ? data : []);
        }
      } catch (e) {
        setError("Erro ao carregar depoimentos.");
        setTestimonials([]);
      }
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

        <div className="flex flex-col items-center justify-center">
          {loading ? (
            <p className="text-center">Carregando depoimentos...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : testimonials.length === 0 ? (
            <p className="text-center">Em breve ...</p>
          ) : (
            <>
                <div ref={sliderRef} className="keen-slider w-full max-w-3xl">
              {testimonials.map((testimonial, idx) => {
                const isOpen = openModalId === testimonial.id;
                return (
                    <div
                      key={testimonial.id}
                      className={`flex justify-center items-center ${isOpen ? '' : 'keen-slider__slide'} ${currentSlide === idx ? 'scale-105 z-10' : 'scale-95'} transition-transform`}
                      style={{ aspectRatio: '1/1', maxWidth: 260, minWidth: 120, width: '100%', height: '100%', padding: 8 }}
                    >
                      <TestimonialCard
                        image={testimonial.image}
                        id={testimonial.id}
                        isOpen={isOpen}
                        onOpenModal={() => setOpenModalId(testimonial.id)}
                        onCloseModal={() => setOpenModalId(null)}
                      />
                    </div>
                );
              })}
              </div>
              <div className="flex gap-4 mt-4 justify-center">
                <button
                  onClick={() => instanceRef.current?.prev()}
                  className="px-3 py-1 rounded-full bg-pink-200 hover:bg-pink-300 text-pink-800 font-bold shadow"
                >&#8592; </button>
                <button
                  onClick={() => instanceRef.current?.next()}
                  className="px-3 py-1 rounded-full bg-pink-200 hover:bg-pink-300 text-pink-800 font-bold shadow"
                > &#8594;</button>
              </div>
            </>
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