import TestimonialCard from "./testimonial-card";

const Testimonial = () => {
  return (
    <section className="py-16 bg-white">
    <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">O que dizem nossos <span className="text-pink-500">clientes</span></h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">A satisfação dos nossos clientes é nossa maior recompensa</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard />        
        </div>
    </div>
</section>
  );
};

export default Testimonial;