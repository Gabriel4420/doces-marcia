import { useState, useCallback } from "react";
import { useSupabaseUpload } from "./use-supabase-upload";
import { toast } from "./use-toast";

export function useAdminTestimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [testimonialImage, setTestimonialImage] = useState<File | null>(null);
  const [testimonialPreview, setTestimonialPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { uploadImage, deleteImage, loading: uploadLoading } = useSupabaseUpload();

  const fetchTestimonials = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/testimonials");
    setTestimonials(await res.json());
    setLoading(false);
  }, []);

  // CRUD Depoimento
  const handleTestimonialSubmit = async (e: any) => {
    e.preventDefault();
    if (!testimonialImage) return;

    try {
      // Upload da imagem
      const uploadResult = await uploadImage(testimonialImage, "images");
      if (!uploadResult) {
        throw new Error("Erro no upload da imagem");
      }

      // Salvar depoimento com a URL da imagem
      await fetch("/api/testimonials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          image: uploadResult.url 
        }),
      });
      toast({
        title: "Depoimento cadastrado",
        description: "O depoimento foi salvo com sucesso!",
        duration: 3000
      });

      // Limpar formulário
      setTestimonialImage(null);
      setTestimonialPreview(null);
      setShowTestimonialForm(false);
      
      // Recarregar depoimentos
      fetchTestimonials();

    } catch (error) {
      console.error("Erro ao salvar depoimento:", error);
      alert("Erro ao salvar depoimento. Tente novamente.");
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
    const file = e.target.files[0];
    if (file) {
      setTestimonialImage(file);
      setTestimonialPreview(URL.createObjectURL(file));
    }
  };

  return {
    testimonials,
    setTestimonials,
    showTestimonialForm,
    setShowTestimonialForm,
    testimonialImage,
    setTestimonialImage,
    testimonialPreview,
    setTestimonialPreview,
    loading: loading || uploadLoading,
    fetchTestimonials,
    handleTestimonialSubmit,
    handleDeleteTestimonial,
    handleTestimonialImageChange,
  };
} 