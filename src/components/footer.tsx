'use client'
import { LucideCandy, LucideClock, LucideHeart, LucideMail, LucideMapPin, LucidePhone } from "lucide-react";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { CookieSettings } from "@/components/cookie-settings";

const Footer = () => {
    const [hoverHeart, setHoverHeart] = useState(false);
    return (
        <footer className="dark:bg-gray-900 bg-gray-100 dark:text-white text-gray-900 py-8 md:py-12" role="contentinfo">
            <div className="container mx-auto px-1 xs:px-2 sm:px-4 max-w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                    {/* Logo e Descrição */}
                    <div className="text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start mb-3 md:mb-4">
                            <Logo width={120} height={120} className="mr-2" />
                        </div>
                        <p className="text-xs sm:text-sm md:text-base dark:text-gray-300 text-gray-900 mb-4 leading-relaxed">
                            Doces caseiros feitos com amor e ingredientes selecionados. Há mais de 25 anos levando sabor e alegria para sua mesa.
                        </p>
                        <div className="flex justify-center md:justify-start space-x-3">
                            <a
                                href="#"
                                className="dark:text-gray-400 text-gray-900 hover:text-pink-500 transition-colors duration-300"
                                aria-label="Facebook da Delicias da Márcia"
                                tabIndex={0}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a
                                href="https://www.instagram.com/deliciasdamarcia_rp"
                                className="dark:text-gray-400 text-gray-900 hover:text-pink-500 transition-colors duration-300"
                                aria-label="Instagram da Delicias da Márcia"
                                tabIndex={0}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a
                                href="https://wa.me/5517991271906"
                                className="dark:text-gray-400 text-gray-900 hover:text-pink-500 transition-colors duration-300"
                                aria-label="WhatsApp da Delicias da Márcia"
                                tabIndex={0}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Links Rápidos */}
                    <div className="text-center md:text-left">
                        <h4 className="text-base sm:text-lg md:text-xl font-semibold mb-3 md:mb-4 text-pink-500">Links Rápidos</h4>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#inicio"
                                    className="dark:text-gray-300 text-gray-900 hover:text-pink-500 transition-colors duration-300 text-xs sm:text-sm md:text-base"
                                    aria-label="Ir para o início da página"
                                    tabIndex={0}
                                >
                                    Início
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#produtos"
                                    className="dark:text-gray-300 text-gray-900 hover:text-pink-500 transition-colors duration-300 text-xs sm:text-sm md:text-base"
                                    aria-label="Ver produtos"
                                    tabIndex={0}
                                >
                                    Produtos
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#sobre"
                                    className="dark:text-gray-300 text-gray-900 hover:text-pink-500 transition-colors duration-300 text-xs sm:text-sm md:text-base"
                                    aria-label="Sobre a Dona Márcia"
                                    tabIndex={0}
                                >
                                    Sobre
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#contato"
                                    className="dark:text-gray-300 text-gray-900 hover:text-pink-500 transition-colors duration-300 text-xs sm:text-sm md:text-base"
                                    aria-label="Entre em contato"
                                    tabIndex={0}
                                >
                                    Contato
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contato */}
                    <div className="text-center md:text-left">
                        <h4 className="text-base sm:text-lg md:text-xl font-semibold mb-3 md:mb-4 text-pink-500">Contato</h4>
                        <div className="space-y-2 md:space-y-3">
                            <div className="flex items-center justify-center md:justify-start">
                                <LucideMapPin className="w-4 h-4 md:w-5 md:h-5 text-pink-500 mr-2" aria-hidden="true" />
                                <span className="dark:text-gray-300 text-gray-900 text-xs sm:text-sm md:text-base"> João Pedro Martins Rodrigues 675
                                Fraternidade 2</span>
                            </div>
                            <div className="flex items-center justify-center md:justify-start">
                                <LucidePhone className="w-4 h-4 md:w-5 md:h-5 text-pink-500 mr-2" aria-hidden="true" />
                                <a
                                    href="https://wa.me/5517991271906"
                                    className="dark:text-gray-300 text-gray-900 hover:text-pink-500 transition-colors duration-300 text-xs sm:text-sm md:text-base"
                                    aria-label="Ligar para (17) 99127-1906"
                                    tabIndex={0}
                                >
                                    (17) 99127-1906
                                </a>
                            </div>
                            <div className="flex items-center justify-center md:justify-start">
                                <LucideMail className="w-4 h-4 md:w-5 md:h-5 text-pink-500 mr-2" aria-hidden="true" />
                                <a
                                    href="mailto:mconteperez@gmail.com"
                                    className="dark:text-gray-300 text-gray-900 hover:text-pink-500 transition-colors duration-300 text-xs sm:text-sm md:text-base"
                                    aria-label="Enviar email para mconteperez@gmail.com"
                                    tabIndex={0}
                                >
                                    mconteperez@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="border-t border-gray-800 mt-6 md:mt-8 pt-6 md:pt-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-xs sm:text-sm md:text-base dark:text-gray-400 text-gray-900 text-center sm:text-left">
                            © 2024 Delicias da Márcia. Todos os direitos reservados. Feito com{" "}
                            <span
                                onMouseEnter={() => setHoverHeart(true)}
                                onMouseLeave={() => setHoverHeart(false)}
                                className="inline align-middle cursor-pointer transition-colors"
                            >
                                {hoverHeart ? (
                                    <FaHeart className="inline w-4 h-4 text-pink-500 animate-pulse" aria-hidden="true" />
                                ) : (
                                    <LucideHeart className="inline w-4 h-4 text-pink-500" aria-hidden="true" />
                                )}
                            </span>{" "}por{" "}
                            <a
                                href="https://gabrielrodrigues.vercel.app"
                                className="text-pink-500 hover:text-pink-400 hover:underline  transition-colors duration-300"
                                aria-label="Desenvolvedor do site"
                                tabIndex={0}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                @Gabriel4420
                            </a>
                        </p>
                        <div className="flex items-center gap-4">
                            <CookieSettings />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;