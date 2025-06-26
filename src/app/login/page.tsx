"use client"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { ModeToggle } from "@/components/theme-toggle";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de login (substituir por lógica real)
    if (email === "teste@teste.com" && senha === "123456") {
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "/";
    } else {
      setErro("Email ou senha inválidos");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Botão flutuante redondo de tema */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="rounded-full shadow-lg bg-white dark:bg-gray-800 p-3 flex items-center justify-center border border-gray-200 dark:border-gray-700">
          <ModeToggle />
        </div>
      </div>
      <form onSubmit={handleLogin} className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4 relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500"
            tabIndex={-1}
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {erro && <p className="text-red-500 text-sm mb-4">{erro}</p>}
        <Button type="submit" className="w-full mb-2">Entrar</Button>
        <p className="text-center text-sm mt-4">
          Não tem uma conta? <Link href="/register" className="text-pink-500 hover:underline">Registre-se</Link>
        </p>
      </form>
    </div>
  );
} 