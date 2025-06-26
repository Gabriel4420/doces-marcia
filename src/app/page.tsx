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
    <div className="w-full  mx-auto">
      <Header />
      <Hero />
      <div id="produtos">
      <div className="mx-3 my-10 flex flex-col items-center justify-center max-w-full " >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold dark:text-white text-gray-800 mb-4">Nossos <span className="text-pink-500">Doces</span></h2>
          <p className="text-lg dark:text-gray-200 text-gray-600 max-w-2xl mx-auto">Delicie-se com nossas especialidades feitas artesanalmente</p>
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
