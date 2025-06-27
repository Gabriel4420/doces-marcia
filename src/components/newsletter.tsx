"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Send } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email obrigatório",
        description: "Por favor, insira seu email para se inscrever.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simular envio
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Inscrição realizada!",
        description: "Você receberá nossas novidades em breve.",
      });
      
      setEmail("");
    } catch (error) {
      toast({
        title: "Erro ao inscrever",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="py-8 md:py-16 bg-gradient-to-r from-pink-500 to-pink-600 text-white"
      role="region"
      aria-labelledby="newsletter-title"
    >
      <div className="container mx-auto px-4 max-w-[312px] md:max-w-none">
        <div className="text-center max-w-2xl mx-auto">
          <div className="flex justify-center mb-3 md:mb-4">
            <Mail className="w-8 h-8 md:w-12 md:h-12 text-white" aria-hidden="true" />
          </div>
          
          <h2 id="newsletter-title" className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
            Fique por dentro das <span className="text-white">novidades</span>
          </h2>
          
          <p className="text-base md:text-lg mb-6 md:mb-8 opacity-90 px-2">
            Inscreva-se para receber receitas exclusivas, promoções especiais e novidades da Dona Márcia
          </p>
          
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-md mx-auto"
            aria-label="Formulário de inscrição na newsletter"
          >
            <div className="flex-1">
              <Label htmlFor="newsletter-email" className="sr-only">
                Email
              </Label>
              <Input
                id="newsletter-email"
                type="email"
                placeholder="Seu melhor email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:border-white focus:ring-white text-sm md:text-base"
                aria-required="true"
                aria-describedby="newsletter-description"
              />
            </div>
            
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-white text-pink-600 hover:bg-gray-100 font-medium py-2 md:py-3 px-4 md:px-6 rounded-lg transition duration-300 flex items-center justify-center space-x-2 text-sm md:text-base whitespace-nowrap"
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-pink-600 border-t-transparent rounded-full animate-spin" />
                  <span>Enviando...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>Inscrever</span>
                </>
              )}
            </Button>
          </form>
          
          <p id="newsletter-description" className="text-xs md:text-sm opacity-75 mt-3 md:mt-4 px-2">
            Não se preocupe, não enviamos spam. Apenas conteúdo relevante sobre nossos doces!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;