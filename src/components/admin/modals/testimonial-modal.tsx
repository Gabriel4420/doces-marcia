import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useAdmin } from "@/contexts/admin-context";

export function TestimonialModal() {
  const {
    showTestimonialForm,
    setShowTestimonialForm,
    testimonialImages,
    setTestimonialImages,
    testimonialPreviews,
    setTestimonialPreviews,
    handleTestimonialSubmit,
    handleTestimonialImageChange,
    handleTestimonialDrop,
  } = useAdmin();

  const handleClose = () => {
    setShowTestimonialForm(false);
    setTestimonialImages([]);
    setTestimonialPreviews([]);
  };

  if (!showTestimonialForm) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md animate-zoom-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Cadastrar Depoimento
          </h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleTestimonialSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Imagem do Depoimento
            </label>
            <div
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center"
              onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
              onDrop={(e) => {
                e.preventDefault();
                const files = Array.from(e.dataTransfer.files || []) as File[];
                handleTestimonialDrop(files);
              }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleTestimonialImageChange}
                className="hidden"
                id="testimonial-image"
                multiple
              />
              <label
                htmlFor="testimonial-image"
                className="cursor-pointer text-pink-600 hover:text-pink-700 font-medium"
              >
                Arraste e solte ou clique para selecionar imagens
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                PNG, JPG, JPEG até 5MB por imagem
              </p>
            </div>
            {testimonialPreviews && testimonialPreviews.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {testimonialPreviews.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`Preview ${idx + 1}`}
                    className="w-full aspect-square object-cover rounded-lg border"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-pink-600 hover:bg-pink-700 text-white"
              disabled={!testimonialImages || testimonialImages.length === 0}
            >
              Cadastrar
            </Button>
            <Button
              type="button"
              onClick={handleClose}
              variant="outline"
              className="flex-1"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}