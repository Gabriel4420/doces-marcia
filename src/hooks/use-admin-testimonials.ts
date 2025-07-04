import { useState, useCallback } from "react";

export function useAdminTestimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [testimonialImage, setTestimonialImage] = useState<File | null>(null);
  const [testimonialPreview, setTestimonialPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
    const formData = new FormData();
    formData.append("image", testimonialImage);
    await fetch("/api/testimonials", {
      method: "POST",
      body: formData,
    });
    setTestimonialImage(null);
    setTestimonialPreview(null);
    setShowTestimonialForm(false);
    fetchTestimonials();
  };

  const handleDeleteTestimonial = async (id: number) => {
    await fetch("/api/testimonials", {
      method: "DELETE",
      body: JSON.stringify({ id }),
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
    loading,
    fetchTestimonials,
    handleTestimonialSubmit,
    handleDeleteTestimonial,
    handleTestimonialImageChange,
  };
} 