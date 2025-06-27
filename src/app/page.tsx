import About from "@/components/about";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import { TabsSkeleton } from "@/components/products/skeleton";
import { ProductsTab } from "@/components/products/tab";
import Newsletter from "@/components/newsletter";
import Testimonial from "@/components/testimonial";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="w-full mx-auto max-w-[312px] md:max-w-none">
      <Header />
      <Hero />
      <div id="produtos">
        <div className="px-4 md:mx-3 my-10 flex flex-col items-center justify-center">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold dark:text-white text-gray-800 mb-4">
              Nossos <span className="text-pink-500">Doces</span>
            </h2>
            <p className="text-base md:text-lg dark:text-gray-200 text-gray-600 max-w-2xl mx-auto px-2">
              Delicie-se com nossas especialidades feitas artesanalmente
            </p>
          </div>
          <Suspense fallback={<TabsSkeleton />}>
            <ProductsTab />
          </Suspense>
        </div>
      </div>
      <About />
      <Testimonial />
      <Contact />
      <Newsletter />
      <Footer />
    </div>
  );
}
