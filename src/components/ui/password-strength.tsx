import React from 'react';
import { Check, X } from 'lucide-react';

interface PasswordRequirement {
  label: string;
  test: (password: string) => boolean;
}

interface PasswordStrengthProps {
  password: string;
  className?: string;
}

const requirements: PasswordRequirement[] = [
  {
    label: "Mínimo 6 caracteres",
    test: (password: string) => password.length >= 6
  },
  {
    label: "Máximo 12 caracteres",
    test: (password: string) => password.length <= 12
  },
  {
    label: "Pelo menos uma letra maiúscula",
    test: (password: string) => /[A-Z]/.test(password)
  },
  {
    label: "Pelo menos uma letra minúscula",
    test: (password: string) => /[a-z]/.test(password)
  },
  {
    label: "Pelo menos um número",
    test: (password: string) => /[0-9]/.test(password)
  },
  {
    label: "Pelo menos um caractere especial",
    test: (password: string) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  }
];

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({ 
  password, 
  className = "" 
}) => {
  const metRequirements = requirements.map(req => ({
    ...req,
    met: req.test(password)
  }));

  const allMet = metRequirements.every(req => req.met);
  const strengthPercentage = (metRequirements.filter(req => req.met).length / requirements.length) * 100;

  const getStrengthColor = () => {
    if (strengthPercentage === 100) return "bg-green-500";
    if (strengthPercentage >= 80) return "bg-yellow-500";
    if (strengthPercentage >= 60) return "bg-orange-500";
    return "bg-red-500";
  };

  const getStrengthText = () => {
    if (strengthPercentage === 100) return "Senha forte";
    if (strengthPercentage >= 80) return "Senha boa";
    if (strengthPercentage >= 60) return "Senha média";
    return "Senha fraca";
  };

  if (!password) return null;

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Barra de força da senha */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">Força da senha:</span>
          <span className={`font-medium ${
            strengthPercentage === 100 ? 'text-green-600 dark:text-green-400' :
            strengthPercentage >= 80 ? 'text-yellow-600 dark:text-yellow-400' :
            strengthPercentage >= 60 ? 'text-orange-600 dark:text-orange-400' :
            'text-red-600 dark:text-red-400'
          }`}>
            {getStrengthText()}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
            style={{ width: `${strengthPercentage}%` }}
          />
        </div>
      </div>

      {/* Lista de requisitos */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Requisitos da senha:
        </p>
        <div className="space-y-1">
          {metRequirements.map((requirement, index) => (
            <div 
              key={index} 
              className={`flex items-center gap-2 text-xs transition-colors duration-200 ${
                requirement.met 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {requirement.met ? (
                <Check className="h-3 w-3 flex-shrink-0" />
              ) : (
                <X className="h-3 w-3 flex-shrink-0" />
              )}
              <span>{requirement.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mensagem de sucesso quando todos os requisitos são atendidos */}
      {allMet && (
        <div className="p-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
          <p className="text-xs text-green-700 dark:text-green-300 font-medium">
            ✅ Senha atende a todos os requisitos de segurança!
          </p>
        </div>
      )}
    </div>
  );
}; 