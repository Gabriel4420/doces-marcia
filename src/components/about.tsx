import { LucideAward, LucideHeart, LucideMedal, LucideSprout } from "lucide-react";

const About = () => {
    return (
      <section
        id="sobre"
        className="py-8 md:py-16 bg-pink-100 dark:bg-gray-900"
        role="region"
        aria-labelledby="about-title"
      >
        <div className="container mx-auto px-4 max-w-[312px] md:max-w-none">
            <div className="flex flex-col md:flex-row items-center">
                <div className="w-full md:w-1/3 mb-6 md:mb-0 flex justify-center">
                    <div className="relative">
                          <img
                            src="images/author-dona-marcia-delicias-da-marcia.jpg"
                            alt="Retrato de Dona Márcia, confeiteira experiente e fundadora da doceria."
                            className="rounded-full w-48 h-48 md:w-64 md:h-64 md:object-right shadow-xl border-4 border-white mx-auto"
                            tabIndex={0}
                            aria-label="Retrato de Dona Márcia, confeiteira experiente e fundadora da doceria."
                          />
                        
                    </div>
                </div>
                <div className="w-full md:w-2/3 md:pl-8 lg:pl-12">
                    <h2 id="about-title" className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-4 md:mb-6 text-center md:text-left">Conheça a <span className="text-pink-500">Dona Márcia</span></h2>
                    <p className="text-base md:text-lg text-gray-600 dark:text-white mb-3 md:mb-4 text-center md:text-left">Há mais de 25 anos, Dona Márcia transforma ingredientes simples em verdadeiras obras de arte açucaradas. Sua paixão pela confeitaria começou cedo, ajudando sua avó na cozinha, e hoje se transformou em um negócio que encanta toda a região.</p>
                    <p className="text-base md:text-lg text-gray-600 dark:text-white mb-4 md:mb-6 text-center md:text-left">Cada doce é preparado com cuidado artesanal, seguindo receitas tradicionais que passaram por gerações em sua família. A qualidade dos ingredientes e o carinho no preparo fazem toda a diferença no sabor inconfundível dos doces da Dona Márcia.</p>
                    <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 justify-center md:justify-start">
                          <div className="flex items-center bg-white px-3 md:px-4 py-2 rounded-full shadow text-sm md:text-base">
                              <LucideHeart className="text-pink-500 mr-2 w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
                            <span className="text-gray-600 dark:text-pink-500">Feito com amor</span>
                          </div>
                          <div className="flex items-center bg-white px-3 md:px-4 py-2 rounded-full shadow text-sm md:text-base">
                              <LucideSprout className="text-pink-500 mr-2 w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
                              <span className="text-gray-600 dark:text-pink-500">Ingredientes naturais</span>
                          </div>
                          <div className="flex items-center bg-white px-3 md:px-4 py-2 rounded-full shadow text-sm md:text-base">
                              <LucideMedal className="text-pink-500 mr-2 w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
                              <span className="text-gray-600 dark:text-pink-500">Qualidade garantida</span>
                          </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}

export default About;