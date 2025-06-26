import { LucideAward, LucideHeart, LucideMedal, LucideSprout } from "lucide-react";

const About = () => {
    return (
      <section
        id="sobre"
        className="py-16 bg-pink-100 dark:bg-gray-900"
        role="region"
        aria-labelledby="about-title"
      >
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/3 mb-8 md:mb-0 flex justify-center">
                    <div className="relative">
                          <img
                            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx2fGVufDB8fHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=761&amp;q=80"
                            alt="Retrato de Dona Márcia, confeiteira experiente e fundadora da doceria."
                            className="rounded-full w-64 h-64 object-cover shadow-xl border-4 border-white"
                            tabIndex={0}
                            aria-label="Retrato de Dona Márcia, confeiteira experiente e fundadora da doceria."
                          />
                        <div className="absolute -bottom-2 -right-2 bg-pink-500 dark:bg-gray-800 text-white font-bold py-2 px-5 w-[135px] flex items-center justify-center rounded-full shadow-lg">
                            <LucideAward className="text-white  mr-2" /> 25 anos
                        </div>
                    </div>
                </div>
                <div className="md:w-2/3 md:pl-12">
                    <h2 id="about-title" className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">Conheça a <span className="text-pink-500">Dona Márcia</span></h2>
                    <p className="text-lg text-gray-600 dark:text-white mb-4">Há mais de 25 anos, Dona Márcia transforma ingredientes simples em verdadeiras obras de arte açucaradas. Sua paixão pela confeitaria começou cedo, ajudando sua avó na cozinha, e hoje se transformou em um negócio que encanta toda a região.</p>
                    <p className="text-lg text-gray-600 dark:text-white mb-6">Cada doce é preparado com cuidado artesanal, seguindo receitas tradicionais que passaram por gerações em sua família. A qualidade dos ingredientes e o carinho no preparo fazem toda a diferença no sabor inconfundível dos doces da Dona Márcia.</p>
                    <div className="flex flex-wrap gap-4">
                          <div className="flex items-center bg-white px-4 py-2 rounded-full shadow">
                              <LucideHeart className="text-pink-500 mr-2" />
                            <span className="text-gray-600 dark:text-pink-500">Feito com amor</span>
                          </div>
                          <div className="flex items-center bg-white px-4 py-2 rounded-full shadow">
                              <LucideSprout className="text-pink-500 mr-2" />
                              <span className="text-gray-600 dark:text-pink-500">Ingredientes naturais</span>
                          </div>
                          <div className="flex items-center bg-white px-4 py-2 rounded-full shadow">
                              <LucideMedal className="text-pink-500 mr-2" />
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