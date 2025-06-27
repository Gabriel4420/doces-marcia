import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

export const TestimonialCard = ({ name, role, content, rating, avatar }: TestimonialCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-700 rounded-xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-start space-x-3 md:space-x-4 mb-3 md:mb-4">
        <img
          src={avatar}
          alt={`Foto de ${name}`}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover flex-shrink-0"
          aria-hidden="true"
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-800 dark:text-white text-sm md:text-base truncate">
            {name}
          </h4>
          <p className="text-gray-500 dark:text-gray-300 text-xs md:text-sm">
            {role}
          </p>
          <div className="flex items-center space-x-1 mt-1">
            {[...Array(rating)].map((_, i) => (
              <Star
                key={i}
                className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 fill-current"
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </div>
      
      <blockquote className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
        "{content}"
      </blockquote>
    </div>
  );
};