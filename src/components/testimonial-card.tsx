import { LucideStar } from "lucide-react";

export default function TestimonialCard() {
  return (
    <div className="bg-pink-50 rounded-xl p-6 shadow-md">
      <div className="flex items-center mb-4">
        <img src="https://randomuser.me/api/portraits/women/43.jpg" alt="Cliente" className="w-12 h-12 rounded-full mr-4" />
        <div>
          <h4 className="font-bold text-gray-800">Ana Clara</h4>
          <div className="flex text-yellow-400">
            <LucideStar fill="currentColor" stroke="currentColor" className="w-4 h-4" />
            <LucideStar fill="currentColor" stroke="currentColor" className="w-4 h-4" />
            <LucideStar fill="currentColor" stroke="currentColor" className="w-4 h-4" />
            <LucideStar fill="currentColor" stroke="currentColor" className="w-4 h-4" />
            <LucideStar fill="currentColor" stroke="currentColor" className="w-4 h-4" />
            
          </div>
        </div>
      </div>
      <p className="text-gray-600">"Os brigadeiros da Dona Márcia são os melhores que já provei! Compro toda semana para minha família e sempre pedem mais."</p>
    </div>
    );
}