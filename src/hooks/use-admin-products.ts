import { useState, useCallback } from "react";
import { useSupabaseUpload } from "./use-supabase-upload";
import { toast } from "./use-toast";

export function useAdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [productData, setProductData] = useState<any>({ name: "", category: "", image: "", imageFile: null });
  const [editProductId, setEditProductId] = useState<number | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { uploadImage, deleteImage, loading: uploadLoading } = useSupabaseUpload();

  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
  ];
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB

  const convertToWebPIfNeeded = async (file: File): Promise<File> => {
    // Não converter GIF para preservar animação; manter WebP
    if (file.type === 'image/gif' || file.type === 'image/webp') return file;

    // Converter JPEG/PNG para WebP via canvas
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve(file);
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (!blob) return resolve(file);
          const webpFile = new File([blob], file.name.replace(/\.[^.]+$/, '.webp'), { type: 'image/webp' });
          resolve(webpFile);
        }, 'image/webp', 0.92);
      };
      img.onerror = () => resolve(file);
      img.src = URL.createObjectURL(file);
    });
  };

  const prepareProductImage = async (file: File): Promise<{ error?: string }> => {
    // Validações
    if (!file || !file.type.startsWith('image/')) {
      return { error: 'Arquivo inválido: selecione uma imagem (JPEG, PNG, GIF, WebP).' };
    }
    if (!allowedTypes.includes(file.type)) {
      return { error: 'Formato não suportado. Use JPEG, PNG, GIF ou WebP.' };
    }
    if (file.size > MAX_SIZE) {
      return { error: 'Arquivo muito grande. Tamanho máximo: 5MB.' };
    }

    // Converter se necessário
    const processed = await convertToWebPIfNeeded(file);
    setProductData((prev: any) => ({ ...prev, imageFile: processed }));
    setImagePreview(URL.createObjectURL(processed));
    return {};
  };

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/products");
    setProducts(await res.json());
    setLoading(false);
  }, []);

  // CRUD Produto
  const handleProductSubmit = async (e: any) => {
    e.preventDefault();
    if (!productData.name || !productData.category) return;

    try {
      let imageUrl = productData.image; // URL existente se estiver editando

      // Se há um arquivo novo para upload
      if (productData.imageFile) {
        const uploadResult = await uploadImage(productData.imageFile, "images");
        if (!uploadResult) {
          throw new Error("Erro no upload da imagem. Verifique o console para mais detalhes.");
        }
        imageUrl = uploadResult.url;
      }

      // Preparar dados do produto
      const productPayload = {
        name: productData.name,
        categoryId: productData.category,
        image: imageUrl
      };


      if (editProductId) {
        // Atualizar produto existente
        const response = await fetch("/api/products", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: editProductId,
            ...productPayload
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Erro ao atualizar produto: ${errorData.error || response.statusText}`);
        }
        toast({
          title: "Produto atualizado",
          description: "O produto foi atualizado com sucesso!",
          duration: 3000
        });
      } else {
        // Criar novo produto
        const response = await fetch("/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productPayload),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Erro ao criar produto: ${errorData.error || response.statusText}`);
        }
        toast({
          title: "Produto cadastrado",
          description: "O produto foi criado com sucesso!",
          duration: 3000
        });
      }

      // Limpar formulário
      setProductData({ name: "", category: "", image: "", imageFile: null });
      setEditProductId(null);
      setShowProductForm(false);
      setImagePreview(null);

      // Recarregar produtos
      fetchProducts();

    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      alert(`Erro ao salvar produto: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  };

  const handleEditProduct = (prod: any) => {
    setProductData({
      name: prod.name,
      category: prod.categoryId?.toString() || "",
      image: prod.image || "",
      imageFile: null
    });
    setEditProductId(prod.id);
    setShowProductForm(true);
    setImagePreview(prod.image || null);
  };

  const handleDeleteProduct = async (id: number, imageUrl?: string) => {
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
    await fetch("/api/products", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    toast({
      title: "Produto excluído",
      description: "O produto foi removido com sucesso!",
      duration: 3000
    });
    fetchProducts();
  };

  const handleImageChange = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await prepareProductImage(file);
  };

  return {
    products,
    setProducts,
    showProductForm,
    setShowProductForm,
    productData,
    setProductData,
    editProductId,
    setEditProductId,
    imagePreview,
    setImagePreview,
    loading: loading || uploadLoading,
    fetchProducts,
    handleProductSubmit,
    handleEditProduct,
    handleDeleteProduct,
    handleImageChange,
    prepareProductImage,
  };
}