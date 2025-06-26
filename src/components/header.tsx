"use client"
import { Logo } from "@/components/logo";
import { ModeToggle } from "./theme-toggle";
import { CartSidebar } from "@/components/cart/sidebar";
import { LucideCandy } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLogged(localStorage.getItem("isLoggedIn") === "true");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLogged(false);
    window.location.href = "/";
  };

  return (
    <>
      <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <LucideCandy className="text-2xl text-pink-500" />
            <h2 className="logo-text text-2xl md:text-3xl text-pink-500">Delicias da Márcia</h2>
            <ModeToggle />
          </div>

          <nav className="hidden md:flex space-x-8">
            <a href="#inicio" className="text-gray-700 dark:text-gray-200  dark:hover:text-pink-500 hover:text-pink-500 font-medium transition-colors duration-300 active:text-pink-500">Início</a>
            <a href="#produtos" className="text-gray-700 dark:text-gray-200 dark:hover:text-pink-500 hover:text-pink-500 font-medium transition-colors duration-300 active:text-pink-500">Produtos</a>
            <a href="#sobre" className="text-gray-700 dark:text-gray-200 dark:hover:text-pink-500 hover:text-pink-500 font-medium transition-colors duration-300 active:text-pink-500">Sobre</a>
            <a href="#contato" className="text-gray-700 dark:text-gray-200 dark:hover:text-pink-500 hover:text-pink-500 font-medium transition-colors duration-300 active:text-pink-500 dark:active:text-pink-500 ">Contato</a>
          </nav>

          <div className="flex items-center space-x-4"></div>
          <button className="md:hidden" id="mobile-menu-button">
            <i className="fas fa-bars text-xl text-gray-700 dark:text-gray-200"></i>
          </button>
          <div className="flex items-center gap-3">
            <CartSidebar />
            {isLogged ? (
              <button onClick={handleLogout} className="text-pink-500 hover:underline">Logout</button>
            ) : (
              <Link href="/login" className="text-pink-500 hover:underline">Login</Link>
            )}
          </div>
        </div>

        <div id="mobile-menu" className="hidden md:hidden bg-white py-2 px-4 shadow-lg">
          <a href="#inicio" className="block py-2 text-gray-700 dark:text-gray-200 dark:hover:text-pink-500 hover:text-pink-500 transition-colors duration-300">Início</a>
          <a href="#produtos" className="block py-2 text-gray-700 dark:text-gray-200 dark:hover:text-pink-500 hover:text-pink-500 transition-colors duration-300">Produtos</a>
          <a href="#sobre" className="block py-2 text-gray-700 dark:text-gray-200 dark:hover:text-pink-500 hover:text-pink-500 transition-colors duration-300">Sobre</a>
          <a href="#contato" className="block py-2 text-gray-700 dark:text-gray-200 dark:hover:text-pink-500 hover:text-pink-500 transition-colors duration-300">Contato</a>
        </div>
      </header>
    </>
  );
}