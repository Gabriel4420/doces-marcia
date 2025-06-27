"use client";

import { Mail, MapPin, Phone, Clock, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { contactFormSchema } from "@/helpers/zodSchemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

type ContactFormData = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Simular envio do formulário
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Mensagem enviada!",
        description: "Obrigada pelo contato. Retornaremos em breve!",
      });
      
      reset();
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    }
  };

  return (
    <section
      id="contato"
      className="py-8 md:py-16 bg-gradient-to-br from-pink-500 to-pink-600 text-white"
      role="region"
      aria-labelledby="contact-title"
    >
      <div className="container mx-auto px-4 max-w-[312px] md:max-w-none">
        <div className="text-center mb-8 md:mb-12">
          <h2 id="contact-title" className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
            Fale com a <span className="text-white">Dona Márcia</span>
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto opacity-90 px-2">
            Tire suas dúvidas ou faça seu pedido especial
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
            {/* Informações de Contato */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20">
              <div className="space-y-6 md:space-y-8">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center justify-center md:justify-start">
                    <MapPin className="w-5 h-5 md:w-6 md:h-6 mr-2" aria-hidden="true" />
                    Informações de Contato
                  </h3>
                  
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-4 h-4 md:w-5 md:h-5 mt-1 text-pink-200" aria-hidden="true" />
                      <div>
                        <p className="font-medium text-sm md:text-base">Endereço</p>
                        <p className="text-pink-100 text-sm md:text-base">Rua dos Doces, 123 - Centro</p>
                        <p className="text-pink-100 text-sm md:text-base">São Paulo/SP</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 md:w-5 md:h-5 text-pink-200" aria-hidden="true" />
                      <div>
                        <p className="font-medium text-sm md:text-base">Telefone</p>
                        <a
                          href="tel:+5511987654321"
                          className="text-pink-100 underline focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm md:text-base"
                          aria-label="Ligar para (11) 98765-4321"
                          tabIndex={0}
                        >
                          (11) 98765-4321
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 md:w-5 md:h-5 text-pink-200" aria-hidden="true" />
                      <div>
                        <p className="font-medium text-sm md:text-base">Email</p>
                        <a
                          href="mailto:contato@donamarcia.com.br"
                          className="text-pink-100 underline focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm md:text-base"
                          aria-label="Enviar email para contato@donamarcia.com.br"
                          tabIndex={0}
                        >
                          contato@donamarcia.com.br
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator className="bg-white/20" />
                
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center justify-center md:justify-start">
                    <Clock className="w-5 h-5 md:w-6 md:h-6 mr-2" aria-hidden="true" />
                    Horário de Atendimento
                  </h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm md:text-base">
                      <span className="text-pink-100">Segunda a Sexta</span>
                      <span className="font-medium">8h às 18h</span>
                    </div>
                    <div className="flex justify-between items-center text-sm md:text-base">
                      <span className="text-pink-100">Sábado</span>
                      <span className="font-medium">9h às 13h</span>
                    </div>
                    <div className="flex justify-between items-center text-sm md:text-base">
                      <span className="text-pink-100">Domingo</span>
                      <span className="font-medium text-pink-200">Fechado</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Formulário */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6 text-center md:text-left">
                Envie sua mensagem
              </h3>
              
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 md:space-y-6"
                aria-label="Formulário de contato"
              >
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 font-medium text-sm md:text-base">
                    Nome completo
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Digite seu nome"
                    className="border-gray-300 focus:border-pink-500 focus:ring-pink-500 text-sm md:text-base"
                    aria-required="true"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium text-sm md:text-base">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="border-gray-300 focus:border-pink-500 focus:ring-pink-500 text-sm md:text-base"
                    aria-required="true"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-700 font-medium text-sm md:text-base">
                    Mensagem
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Digite sua mensagem..."
                    rows={4}
                    className="border-gray-300 focus:border-pink-500 focus:ring-pink-500 resize-none text-sm md:text-base"
                    aria-required="true"
                    {...register("message")}
                  />
                  {errors.message && (
                    <p className="text-sm text-red-500">{errors.message.message}</p>
                  )}
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 md:py-3 px-4 md:px-6 rounded-lg transition duration-300 flex items-center justify-center space-x-2 text-sm md:text-base"
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" aria-hidden="true" />
                      <span>Enviar Mensagem</span>
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;