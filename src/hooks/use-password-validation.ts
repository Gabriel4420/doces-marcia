import { useState, useCallback } from 'react';
import { passwordSchema } from '@/helpers/zodSchemas';

interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
  strength: number;
  strengthText: string;
  requirements: {
    minLength: boolean;
    maxLength: boolean;
    hasUpperCase: boolean;
    hasLowerCase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
  };
}

export const usePasswordValidation = () => {
  const [validationResult, setValidationResult] = useState<PasswordValidationResult>({
    isValid: false,
    errors: [],
    strength: 0,
    strengthText: 'Senha fraca',
    requirements: {
      minLength: false,
      maxLength: false,
      hasUpperCase: false,
      hasLowerCase: false,
      hasNumber: false,
      hasSpecialChar: false,
    }
  });

  const validatePassword = useCallback((password: string): PasswordValidationResult => {
    if (!password) {
      return {
        isValid: false,
        errors: [],
        strength: 0,
        strengthText: 'Senha fraca',
        requirements: {
          minLength: false,
          maxLength: false,
          hasUpperCase: false,
          hasLowerCase: false,
          hasNumber: false,
          hasSpecialChar: false,
        }
      };
    }

    const requirements = {
      minLength: password.length >= 6,
      maxLength: password.length <= 12,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    };

    const metRequirements = Object.values(requirements).filter(Boolean).length;
    const strength = (metRequirements / 6) * 100;

    let strengthText = 'Senha fraca';
    if (strength === 100) strengthText = 'Senha forte';
    else if (strength >= 80) strengthText = 'Senha boa';
    else if (strength >= 60) strengthText = 'Senha média';

    try {
      passwordSchema.parse(password);
      return {
        isValid: true,
        errors: [],
        strength,
        strengthText,
        requirements
      };
    } catch (error: any) {
      const errors = error.errors?.map((err: any) => err.message) || [];
      return {
        isValid: false,
        errors,
        strength,
        strengthText,
        requirements
      };
    }
  }, []);

  const updateValidation = useCallback((password: string) => {
    const result = validatePassword(password);
    setValidationResult(result);
    return result;
  }, [validatePassword]);

  return {
    validationResult,
    validatePassword,
    updateValidation
  };
}; 