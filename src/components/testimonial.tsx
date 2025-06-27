import { TestimonialCard } from "@/components/testimonial-card";
import { Star } from "lucide-react";

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      name: "Maria Silva",
      role: "Cliente fiel",
      content: "Os doces da Dona Márcia são simplesmente divinos! Sempre peço para festas da família e todos adoram. O brigadeiro é o melhor que já provei!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx2fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    },
    {
      id: 2,
      name: "João Santos",
      role: "Cliente desde 2020",
      content: "Qualidade excepcional! Os doces são frescos, saborosos e sempre feitos com carinho. Recomendo para todos os eventos especiais.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx2fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    },
    {
      id: 3,
      name: "Ana Costa",
      role: "Cliente satisfeita",
      content: "Pedido especial para o aniversário da minha filha e ficou perfeito! Dona Márcia é muito atenciosa e os doces ficaram lindos e deliciosos.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx2fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    }
  ];

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
            Depoimentos de quem já experimentou os doces da Dona Márcia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} {...testimonial} />
          ))}
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