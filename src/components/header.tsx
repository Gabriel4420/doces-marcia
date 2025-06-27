"use client"
import { Logo } from "@/components/logo";
import { ModeToggle } from "./theme-toggle";
import { CartSidebar } from "@/components/cart/sidebar";
import { LucideCandy } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

const Header = () => {
  const { user, isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 max-w-[312px] md:max-w-none">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <LucideCandy className="text-xl md:text-2xl text-pink-500" />
              <h2 className="logo-text text-lg md:text-2xl lg:text-3xl text-pink-500">Delicias da Márcia</h2>
              <ModeToggle />
            </div>

            <nav className="hidden md:flex space-x-8">
              <a href="#inicio" className="text-gray-700 dark:text-gray-200  dark:hover:text-pink-500 hover:text-pink-500 font-medium transition-colors duration-300 active:text-pink-500">Início</a>
              <a href="#produtos" className="text-gray-700 dark:text-gray-200 dark:hover:text-pink-500 hover:text-pink-500 font-medium transition-colors duration-300 active:text-pink-500">Produtos</a>
              <a href="#sobre" className="text-gray-700 dark:text-gray-200 dark:hover:text-pink-500 hover:text-pink-500 font-medium transition-colors duration-300 active:text-pink-500">Sobre</a>
              <a href="#contato" className="text-gray-700 dark:text-gray-200 dark:hover:text-pink-500 hover:text-pink-500 font-medium transition-colors duration-300 active:text-pink-500 dark:active:text-pink-500 ">Contato</a>
            </nav>

            <div className="flex items-center gap-2 md:gap-3">
              <CartSidebar />
              {isLoggedIn ? (
                <div className="flex items-center gap-1 md:gap-2">
                  <span className="text-xs md:text-sm text-gray-600 dark:text-gray-300 hidden sm:block">
                    Olá, {user?.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-pink-500 hover:underline text-xs md:text-sm"
                    aria-label="Fazer logout"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <a
                  href="/login"
                  className="text-pink-500 hover:underline text-xs md:text-sm"
                  aria-label="Fazer login"
                >
                  Login
                </a>
              )}
            </div>
          </div>
        </div>

        <div id="mobile-menu" className="hidden md:hidden bg-white py-2 px-4 shadow-lg">
          <a href="#inicio" className="block py-2 text-gray-700 dark:text-gray-200 hover:text-pink-500">Início</a>
          <a href="#produtos" className="block py-2 text-gray-700 dark:text-gray-200 hover:text-pink-500">Produtos</a>
          <a href="#sobre" className="block py-2 text-gray-700 dark:text-gray-200 hover:text-pink-500">Sobre</a>
          <a href="#contato" className="block py-2 text-gray-700 dark:text-gray-200 hover:text-pink-500">Contato</a>
        </div>
      </header>
    </>
  );
};

export default Header;