"use client"

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/theme-toggle";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await login(email, password, router);
      toast({
        title: "Login realizado!",
        description: "Bem-vindo de volta!",
      });
      router.push("/admin");
    } catch (error) {
      toast({
        title: "Erro no login",
        description: "Email ou senha incorretos. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-pink-200 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      {/* Botão flutuante de retorno */}
      <div className="fixed top-6 left-6 z-50">
        <Link href="/">
          <button
            type="button"
            className="rounded-full shadow-lg border border-gray-200 dark:border-gray-700 p-2 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Voltar"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
        </Link>
      </div>

      {/* Botão flutuante redondo de tema */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
          <ModeToggle />
        </div>
      </div>

      <form onSubmit={handleLogin} className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-xl w-full max-w-[280px] md:max-w-sm">
        <div className="text-center mb-6 md:mb-8">
          <img src="/images/logo.jpg" alt="Logo Delicias da Márcia" className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-pink-200 shadow" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Bem-vindo de volta!
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
            Faça login para acessar sua conta
          </p>
        </div>

        <div className="space-y-4 md:space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-sm md:text-base"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300">
              Senha
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pr-10 text-sm md:text-base"
                required
              />
              <Button
                type="button"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 md:py-3 px-4 md:px-6 rounded-lg transition duration-300 text-sm md:text-base"
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
        </div>

        <div className="mt-6 md:mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
            Não tem uma conta?{" "}
            <Link
              href="/register"
              className="text-pink-500 hover:text-pink-600 font-medium transition-colors duration-300"
            >
              Cadastre-se
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
} 