"use client"

import { ModeToggle } from "./theme-toggle";
import { useAuth } from "@/contexts/auth-context";
import { useState } from "react";
import { Logo } from "@/components/logo";

const Header = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 max-w-full md:max-w-none">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Logo width={120} height={120} />
              <ModeToggle />
            </div>

            <nav className="hidden md:flex space-x-8">
              <a href="#inicio" className="text-gray-700 dark:text-gray-200  dark:hover:text-pink-500 hover:text-pink-500 font-medium transition-colors duration-300 active:text-pink-500">Início</a>
              <a href="#produtos" className="text-gray-700 dark:text-gray-200 dark:hover:text-pink-500 hover:text-pink-500 font-medium transition-colors duration-300 active:text-pink-500">Produtos</a>
              <a href="#sobre" className="text-gray-700 dark:text-gray-200 dark:hover:text-pink-500 hover:text-pink-500 font-medium transition-colors duration-300 active:text-pink-500">Sobre</a>
              <a href="#contato" className="text-gray-700 dark:text-gray-200 dark:hover:text-pink-500 hover:text-pink-500 font-medium transition-colors duration-300 active:text-pink-500 dark:active:text-pink-500 ">Contato</a>
            </nav>

            <button
              className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Abrir menu"
            >
              <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>

            
          </div>
        </div>

        {mobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden bg-white dark:bg-gray-900 py-2 px-4 shadow-lg w-full absolute left-0 top-full z-40 animate-fade-in-down">
            <a href="#inicio" className="block py-3 text-gray-700 dark:text-gray-200 hover:text-pink-500 text-base font-medium">Início</a>
            <a href="#produtos" className="block py-3 text-gray-700 dark:text-gray-200 hover:text-pink-500 text-base font-medium">Produtos</a>
            <a href="#sobre" className="block py-3 text-gray-700 dark:text-gray-200 hover:text-pink-500 text-base font-medium">Sobre</a>
            <a href="#contato" className="block py-3 text-gray-700 dark:text-gray-200 hover:text-pink-500 text-base font-medium">Contato</a>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;