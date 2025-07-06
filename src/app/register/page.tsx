"use client"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { ModeToggle } from "@/components/theme-toggle";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

const RegisterPage = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (senha !== confirmarSenha) {
      toast({
        title: "Senhas não coincidem ❌",
        description: "As senhas digitadas não são iguais. Tente novamente.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const success = await register(nome, email, senha);
      
      if (success) {
        toast({
          title: "Cadastro realizado com sucesso! 🎉",
          description: "Sua conta foi criada. Redirecionando para painel admin...",
          variant: "default",
        });
        setNome("");
        setEmail("");
        setSenha("");
        setConfirmarSenha("");
      } else {
        toast({
          title: "Erro no cadastro ❌",
          description: "Não foi possível criar sua conta. Tente novamente.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro inesperado ❌",
        description: "Ocorreu um erro ao criar sua conta. Tente novamente.",
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
          <Button variant="outline" size="icon" className="rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Botão flutuante redondo de tema */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
          <ModeToggle />
        </div>
      </div>

      <form onSubmit={handleRegister} className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-xl w-full max-w-[280px] md:max-w-sm">
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Criar conta
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
            Junte-se à família da Dona Márcia
          </p>
        </div>

        <div className="space-y-4 md:space-y-6">
          <div className="space-y-2">
            <Label htmlFor="nome" className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300">
              Nome completo
            </Label>
            <Input
              id="nome"
              type="text"
              placeholder="Seu nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full text-sm md:text-base"
              required
              disabled={isLoading}
            />
          </div>

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
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="senha" className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300">
              Senha
            </Label>
            <div className="relative">
              <Input
                id="senha"
                type={showPassword ? "text" : "password"}
                placeholder="Sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full pr-10 text-sm md:text-base"
                required
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmarSenha" className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300">
              Confirmar senha
            </Label>
            <div className="relative">
              <Input
                id="confirmarSenha"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirme sua senha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                className="w-full pr-10 text-sm md:text-base"
                required
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
                disabled={isLoading}
              >
                {showConfirmPassword ? (
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
            {isLoading ? "Criando conta..." : "Criar conta"}
          </Button>
        </div>

        <div className="mt-6 md:mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
            Já tem uma conta?{" "}
            <Link
              href="/login"
              className="text-pink-500 hover:text-pink-600 font-medium transition-colors duration-300"
            >
              Faça login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage; 