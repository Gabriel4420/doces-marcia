import { Button } from "@/components/ui/button";
import { Pencil, Trash, Plus } from "lucide-react";
import { useAdmin } from "@/contexts/admin-context";

export function ProductListAdmin() {
  const {
    products,
    categories,
    loading,
    setShowProductForm,
    handleEditProduct,
    handleDeleteProduct,
  } = useAdmin();

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-between w-full mb-6">
        <h2 className="text-xl font-semibold text-center">Produtos</h2>
        <Button 
          onClick={() => setShowProductForm(true)}
          className="bg-pink-600 hover:bg-pink-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Produto
        </Button>
      </div>
      
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ul className="space-y-2 w-full">
          {products.map((p: any) => {
            const category: any = categories.find((c: any) => c.id === p.categoryId);
            return (
              <li key={p.id} className="bg-white dark:bg-gray-800 rounded p-3 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  {p.image && (
                    <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded border" />
                  )}
                  <div>
                    <span className="font-semibold text-base text-gray-900 dark:text-white">{p.name}</span>
                    <span className="text-xs text-gray-400 ml-2">({category?.name})</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    className="border border-pink-600 text-pink-600 bg-white hover:bg-pink-50" 
                    onClick={() => handleEditProduct(p)} 
                    type="button"
                  >
                    <Pencil className="w-4 h-4" />
                    Editar
                  </Button>
                  <Button 
                    className="border border-red-600 text-white bg-red-600 hover:bg-red-700" 
                    onClick={() => handleDeleteProduct(p.id)} 
                    type="button"
                  >
                    <Trash className="w-4 h-4" />
                    Excluir
                  </Button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  );
} 