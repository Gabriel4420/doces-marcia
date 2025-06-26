import { LucideInfo, LucideShoppingCart } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="inicio"
      className="hero-pattern py-16 md:py-24"
      role="region"
      aria-labelledby="hero-title"
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2
            id="hero-title"
            className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4"
          >
            Doces caseiros feitos com <span className="text-pink-500">amor</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-white mb-6">
            Experimente os doces mais saborosos da região, preparados com ingredientes selecionados e receitas tradicionais da Dona Márcia.
          </p>
          <div className="flex space-x-4">
            <a
              href="#produtos"
              className="bg-pink-500 flex items-center justify-center hover:bg-pink-600 text-white font-medium py-3 px-6 rounded-full transition duration-300 shadow-lg hover:shadow-xl flex-1/2"
              aria-label="Ir para a seção de produtos"
              tabIndex={0}
            >
              <LucideShoppingCart className="mr-2" aria-hidden="true" />Ver Produtos
            </a>
            <a
              href="#sobre"
              className="border-2 border-pink-500 flex items-center justify-center text-pink-500 hover:bg-pink-50 font-medium py-3 px-6 rounded-full transition duration-300 flex-1/2"
              aria-label="Conheça a Dona Márcia"
              tabIndex={0}
            >
              <LucideInfo className="mr-2" aria-hidden="true" />Conheça a Dona Márcia
            </a>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx2fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=627&q=80"
            alt="Bandeja de doces caseiros variados, feitos artesanalmente por Dona Márcia"
            className="rounded-xl shadow-xl w-full max-w-md animate-zoom-in"
            tabIndex={0}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;