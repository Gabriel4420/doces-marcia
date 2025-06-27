import { LucideInfo, LucideShoppingCart } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  return (
    <section
      id="inicio"
      className="hero-pattern py-8 md:py-16 lg:py-24"
      role="region"
      aria-labelledby="hero-title"
    >
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1.8fr] gap-8 items-center">
          <div className="md:-ml-40 dark:bg-gray-900 w-[700px] p-8 bg-pink-100 rounded-lg shadow-md">
            <h2
              id="hero-title"
              className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 dark:text-white mb-3 md:mb-4 text-center md:text-left"
            >
              Doces caseiros feitos com <span className="text-pink-500">amor</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 dark:text-white mb-4 md:mb-6 text-center md:text-left">
              Experimente os doces mais saborosos da região, preparados com ingredientes selecionados e receitas tradicionais da Dona Márcia.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start">
              <a
                href="#produtos"
                className="bg-pink-500 flex items-center justify-center hover:bg-pink-600 text-white font-medium py-2 md:py-3 px-4 md:px-6 rounded-full transition duration-300 shadow-lg hover:shadow-xl text-sm md:text-base"
                aria-label="Ir para a seção de produtos"
                tabIndex={0}
              >
                <LucideShoppingCart className="mr-2 w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />Ver Produtos
              </a>
              <a
                href="#sobre"
                className="border-2 border-pink-500 flex items-center justify-center text-pink-500 hover:bg-pink-50 font-medium py-2 md:py-3 px-4 md:px-6 rounded-full transition duration-300 text-sm md:text-base"
                aria-label="Conheça a Dona Márcia"
                tabIndex={0}
              >
                <LucideInfo className="mr-2 w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />Conheça a Dona Márcia
              </a>
            </div>
          </div>
          <div className="flex justify-center items-center h-full">
            <Image
              src="https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx2fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=627&q=80"
              alt="Bandeja de doces caseiros variados, feitos artesanalmente por Dona Márcia"
              className="rounded-xl shadow-xl w-full h-auto object-cover"
              tabIndex={0}
              width={627}
              height={418}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;