import { useState, useCallback } from "react";
import { useSupabaseUpload } from "./use-supabase-upload";
import { toast } from "./use-toast";

export function useAdminTestimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [testimonialImages, setTestimonialImages] = useState<File[]>([]);
  const [testimonialPreviews, setTestimonialPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const { uploadImage, uploadMultipleImages, deleteImage, loading: uploadLoading } = useSupabaseUpload();

  const fetchTestimonials = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/testimonials");
    setTestimonials(await res.json());
    setLoading(false);
  }, []);

  // CRUD Depoimento
  const handleTestimonialSubmit = async (e: any) => {
    e.preventDefault();
    if (!testimonialImages || testimonialImages.length === 0) return;

    try {
      // Upload das imagens (múltiplas)
      const uploadResults = await uploadMultipleImages(testimonialImages, "images");
      if (!uploadResults || uploadResults.length === 0) {
        throw new Error("Erro no upload das imagens");
      }

      // Salvar cada depoimento com sua URL
      await Promise.all(
        uploadResults.map((res) =>
          fetch("/api/testimonials", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ image: res.url }),
          })
        )
      );

      toast({
        title: "Depoimentos cadastrados",
        description: `Foram salvos ${uploadResults.length} depoimento(s)!`,
        duration: 3000,
      });

      // Limpar formulário
      setTestimonialImages([]);
      setTestimonialPreviews([]);
      setShowTestimonialForm(false);

      // Recarregar depoimentos
      fetchTestimonials();
    } catch (error) {
      console.error("Erro ao salvar depoimentos:", error);
      alert("Erro ao salvar depoimentos. Tente novamente.");
    }
  };

  const handleDeleteTestimonial = async (id: number, imageUrl?: string) => {
    // Excluir imagem do bucket se existir
    if (imageUrl) {
      try {
        // Extrair o path do arquivo a partir da URL pública
        const urlParts = imageUrl.split("/");
        const fileName = urlParts[urlParts.length - 1];
        await deleteImage(fileName, "images");
      } catch (e) {
        console.warn("Erro ao excluir imagem do bucket:", e);
      }
    }
    await fetch("/api/testimonials", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    toast({
      title: "Depoimento excluído",
      description: "O depoimento foi removido com sucesso!",
      duration: 3000
    });
    fetchTestimonials();
  };

  const handleTestimonialImageChange = (e: any) => {
    const files: File[] = Array.from(e.target.files || []);
    if (files && files.length > 0) {
      const validFiles = files.filter((f) => f.type.startsWith("image/") && f.size <= 5 * 1024 * 1024);
      setTestimonialImages(validFiles);
      setTestimonialPreviews(validFiles.map((f) => URL.createObjectURL(f)));
    }
  };

  const handleTestimonialDrop = (files: File[]) => {
    const validFiles = files.filter((f) => f.type.startsWith("image/") && f.size <= 5 * 1024 * 1024);
    if (validFiles.length > 0) {
      setTestimonialImages(validFiles);
      setTestimonialPreviews(validFiles.map((f) => URL.createObjectURL(f)));
    }
  };

  return {
    testimonials,
    setTestimonials,
    showTestimonialForm,
    setShowTestimonialForm,
    testimonialImages,
    setTestimonialImages,
    testimonialPreviews,
    setTestimonialPreviews,
    loading: loading || uploadLoading,
    fetchTestimonials,
    handleTestimonialSubmit,
    handleDeleteTestimonial,
    handleTestimonialImageChange,
    handleTestimonialDrop,
  };
}