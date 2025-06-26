import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram, LucideCandyCane, PhoneCall } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gray-100 dark:bg-gray-900 py-8" role="contentinfo">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-6 md:mb-0">
                        <div className="flex items-center space-x-2">
                            <LucideCandyCane className="fas fa-candy-cane text-2xl text-pink-500" />
                            <h2 className="logo-text text-2xl" aria-label="Delícias da Márcia">Delicias da Márcia</h2>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">Delícias caseiras desde 1998</p>
                    </div>

                    <div className="flex space-x-6">
                        {/* Para links externos, usar <a> com rel e target. Para links internos, usar <Link>. */}
                        <a
                            href="#"
                            aria-label="Facebook da Doces da Dona Márcia"
                            tabIndex={0}
                            className="text-gray-600 dark:text-gray-400 hover:text-pink-500 transition duration-300"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Facebook />
                        </a>
                        <a
                            href="#"
                            aria-label="Instagram da Doces da Dona Márcia"
                            tabIndex={0}
                            className="text-gray-600 dark:text-gray-400 hover:text-pink-500 transition duration-300"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Instagram />
                        </a>
                        <a
                            href="tel:+5511999999999"
                            aria-label="Ligar para Doces da Dona Márcia"
                            tabIndex={0}
                            className="text-gray-600 dark:text-gray-400 hover:text-pink-500 transition duration-300"
                        >
                            <PhoneCall />
                        </a>
                    </div>
                </div>

                <div className="border-t border-gray-300 dark:border-gray-700 mt-8 pt-8 text-center text-gray-600 dark:text-gray-400">
                    <p>&copy; 2025 Doces da Dona Márcia. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
}