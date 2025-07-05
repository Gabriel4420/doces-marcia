import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useAdmin } from "@/contexts/admin-context";

export function TestimonialModal() {
  const {
    showTestimonialForm,
    setShowTestimonialForm,
    testimonialImage,
    setTestimonialImage,
    testimonialPreview,
    setTestimonialPreview,
    handleTestimonialSubmit,
    handleTestimonialImageChange,
  } = useAdmin();

  const handleClose = () => {
    setShowTestimonialForm(false);
    setTestimonialImage(null);
    setTestimonialPreview(null);
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
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleTestimonialImageChange}
                className="hidden"
                id="testimonial-image"
                required
              />
              <label
                htmlFor="testimonial-image"
                className="cursor-pointer text-pink-600 hover:text-pink-700 font-medium"
              >
                Clique para selecionar uma imagem
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                PNG, JPG, JPEG até 5MB
              </p>
            </div>
            {testimonialPreview && (
              <div className="mt-4 text-center">
                <img
                  src={testimonialPreview}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded-lg border mx-auto"
                />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-pink-600 hover:bg-pink-700 text-white"
              disabled={!testimonialImage}
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