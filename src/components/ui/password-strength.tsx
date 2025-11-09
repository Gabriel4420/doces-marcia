"use client"

import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type PasswordStrengthProps = {
  password: string;
  className?: string;
};

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password, className }) => {
  const lengthOk = password.length >= 6 && password.length <= 12;
  const upperOk = /[A-Z]/.test(password);
  const lowerOk = /[a-z]/.test(password);
  const numberOk = /[0-9]/.test(password);
  const specialOk = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  const checks = [lengthOk, upperOk, lowerOk, numberOk, specialOk];
  const score = checks.filter(Boolean).length;
  const percent = Math.round((score / 5) * 100);

  const strengthLabel = (() => {
    if (score <= 1) return "Força: muito fraca";
    if (score === 2) return "Força: fraca";
    if (score === 3) return "Força: média";
    if (score === 4) return "Força: forte";
    return "Força: excelente";
  })();

  return (
    <div className={cn("rounded-md border p-3", className)}>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{strengthLabel}</span>
        <span className="text-xs text-muted-foreground">{percent}%</span>
      </div>
      <Progress value={percent} />

      <ul className="mt-3 space-y-2 text-sm">
        <li className="flex items-center gap-2">
          {lengthOk ? (
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          ) : (
            <XCircle className="h-4 w-4 text-red-600" />
          )}
          <span>
            Comprimento entre <span className="font-medium">6</span> e <span className="font-medium">12</span> caracteres
          </span>
        </li>
        <li className="flex items-center gap-2">
          {upperOk ? (
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          ) : (
            <XCircle className="h-4 w-4 text-red-600" />
          )}
          <span>Contém pelo menos uma letra maiúscula (A-Z)</span>
        </li>
        <li className="flex items-center gap-2">
          {lowerOk ? (
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          ) : (
            <XCircle className="h-4 w-4 text-red-600" />
          )}
          <span>Contém pelo menos uma letra minúscula (a-z)</span>
        </li>
        <li className="flex items-center gap-2">
          {numberOk ? (
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          ) : (
            <XCircle className="h-4 w-4 text-red-600" />
          )}
          <span>Contém pelo menos um número (0-9)</span>
        </li>
        <li className="flex items-center gap-2">
          {specialOk ? (
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          ) : (
            <XCircle className="h-4 w-4 text-red-600" />
          )}
          <span>
            Contém pelo menos um caractere especial (!@#$%^&*()_+-=[]{}|;:,.&lt;&gt;?)
          </span>
        </li>
      </ul>

      {score === 5 && (
        <div className="mt-3 rounded-md bg-green-50 px-3 py-2 text-xs text-green-700 dark:bg-green-950 dark:text-green-300">
          A senha atende a todos os requisitos de segurança.
        </div>
      )}
    </div>
  );
};