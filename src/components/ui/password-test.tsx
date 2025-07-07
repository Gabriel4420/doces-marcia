import React, { useState } from 'react';
import { Input } from './input';
import { Label } from './label';
import { PasswordStrength } from './password-strength';
import { usePasswordValidation } from '@/hooks/use-password-validation';

export const PasswordTest: React.FC = () => {
  const [password, setPassword] = useState('');
  const { validationResult, updateValidation } = usePasswordValidation();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    updateValidation(newPassword);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        Teste de Validação de Senha
      </h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="test-password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Digite uma senha para testar:
          </Label>
          <Input
            id="test-password"
            type="text"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Digite sua senha aqui..."
            className="mt-1"
          />
        </div>

        {password && (
          <>
            <PasswordStrength password={password} />
            
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status da Validação:
              </h3>
              <div className="space-y-1">
                <p className={`text-xs ${validationResult.isValid ? 'text-green-600' : 'text-red-600'}`}>
                  {validationResult.isValid ? '✅ Senha válida' : '❌ Senha inválida'}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Força: {validationResult.strengthText} ({Math.round(validationResult.strength)}%)
                </p>
                {validationResult.errors.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs font-medium text-red-600 mb-1">Erros encontrados:</p>
                    <ul className="text-xs text-red-500 space-y-1">
                      {validationResult.errors.map((error, index) => (
                        <li key={index}>• {error}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}; 