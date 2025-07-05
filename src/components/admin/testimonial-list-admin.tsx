import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { useAdmin } from "@/contexts/admin-context";

export function TestimonialListAdmin() {
  const {
    testimonials,
    loading,
    setShowTestimonialForm,
    handleDeleteTestimonial,
  } = useAdmin();

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-between w-full mb-6">
        <h2 className="text-xl font-semibold text-center">Depoimentos</h2>
        <Button 
          onClick={() => setShowTestimonialForm(true)}
          className="bg-pink-600 hover:bg-pink-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Depoimento
        </Button>
      </div>
      
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ul className="space-y-2 flex flex-wrap gap-4 justify-center w-full">
          {testimonials.map((t: any) => (
            <li key={t.id} className="bg-white dark:bg-gray-800 rounded p-3 flex flex-col items-center">
              <img src={t.image} alt="Depoimento" className="w-32 h-32 object-cover rounded mb-2 border" />
              <Button 
                className="text-red-600 border border-red-500 bg-white hover:bg-red-50 text-sm py-1 px-3" 
                onClick={() => handleDeleteTestimonial(t.id, t.image)}
              >
                <Trash className="w-4 h-4" />
                Excluir
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 