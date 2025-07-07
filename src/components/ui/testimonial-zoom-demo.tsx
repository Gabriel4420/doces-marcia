import React from 'react';
import { TestimonialCard } from '@/components/testimonial-card';

export const TestimonialZoomDemo: React.FC = () => {
  // Imagem de exemplo para demonstração
  const demoImage = "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx2fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=627&q=80";

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        Teste de Zoom - Depoimentos
      </h2>
      
      <div className="space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Clique na imagem abaixo para abrir o modal com zoom:
        </p>
        
        <TestimonialCard 
          image={demoImage} 
          id={1}
        />
        
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Instruções:
          </h3>
          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Clique na imagem para abrir o modal</li>
            <li>• Use o scroll do mouse para dar zoom</li>
            <li>• Clique fora da imagem para fechar</li>
            <li>• Use o botão "Voltar tamanho original" para resetar o zoom</li>
          </ul>
        </div>
      </div>
    </div>
  );
}; 