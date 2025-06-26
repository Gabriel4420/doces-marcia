const Newsletter = () => {
  return (
    <section className="py-12 dark:bg-pink-800 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-pink-800 dark:bg-gray-800 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold  text-white mb-2">Receba nossas novidades</h3>
          <p className="text-white mb-6">Cadastre-se para receber promoções e novas receitas</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input type="email" placeholder="Seu melhor email" className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" />
            <button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-6 rounded-lg transition duration-300">Cadastrar</button>
          </form>
        </div>
      </div>
    </section>
  )
};

export default Newsletter;