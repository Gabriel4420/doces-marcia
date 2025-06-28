"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { ModeToggle } from "@/components/theme-toggle";
import { ShoppingCart, Folder, MessageCircle, Menu, LogOut } from "lucide-react";

const TABS = ["Produtos", "Categorias", "Depoimentos"];

export default function AdminPage() {
  const { isLoggedIn, user, logout } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState("Produtos");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Formulário de categoria
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);

  // Formulário de produto
  const [showProductForm, setShowProductForm] = useState(false);
  const [productData, setProductData] = useState<any>({ name: "", category: "", image: "", imageFile: null });
  const [editProductId, setEditProductId] = useState<number | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Formulário de depoimento
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [testimonialImage, setTestimonialImage] = useState<File | null>(null);
  const [testimonialPreview, setTestimonialPreview] = useState<string | null>(null);

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    const res = await fetch("/api/products");
    setProducts(await res.json());
    setLoading(false);
  };

  // Fetch categories
  const fetchCategories = async () => {
    setLoading(true);
    const res = await fetch("/api/categories");
    setCategories(await res.json());
    setLoading(false);
  };

  // Fetch testimonials
  const fetchTestimonials = async () => {
    setLoading(true);
    const res = await fetch("/api/testimonials");
    setTestimonials(await res.json());
    setLoading(false);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchTestimonials();
  }, []);

  // CRUD Categoria
  const handleCategorySubmit = async (e: any) => {
    e.preventDefault();
    if (!categoryName) return;
    if (editCategoryId) {
      await fetch("/api/categories", {
        method: "PUT",
        body: JSON.stringify({ id: editCategoryId, name: categoryName }),
      });
    } else {
      await fetch("/api/categories", {
        method: "POST",
        body: JSON.stringify({ name: categoryName }),
      });
    }
    setCategoryName("");
    setEditCategoryId(null);
    setShowCategoryForm(false);
    fetchCategories();
  };

  const handleEditCategory = (cat: any) => {
    setCategoryName(cat.name);
    setEditCategoryId(cat.id);
    setShowCategoryForm(true);
  };

  const handleDeleteCategory = async (id: number) => {
    await fetch("/api/categories", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    fetchCategories();
  };

  // CRUD Produto
  const handleProductSubmit = async (e: any) => {
    e.preventDefault();
    if (!productData.name || !productData.category) return;
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("category", productData.category);
    if (productData.imageFile) {
      formData.append("image", productData.imageFile);
    } else if (productData.image) {
      formData.append("imageUrl", productData.image);
    }
    if (editProductId) {
      formData.append("id", String(editProductId));
      await fetch("/api/products", {
        method: "PUT",
        body: formData,
      });
    } else {
      await fetch("/api/products", {
        method: "POST",
        body: formData,
      });
    }
    setProductData({ name: "", category: "", image: "", imageFile: null });
    setEditProductId(null);
    setShowProductForm(false);
    setImagePreview(null);
    fetchProducts();
  };

  const handleEditProduct = (prod: any) => {
    setProductData({ name: prod.name, category: prod.category, image: prod.image || "", imageFile: null });
    setEditProductId(prod.id);
    setShowProductForm(true);
    setImagePreview(prod.image || null);
  };

  const handleDeleteProduct = async (id: number) => {
    await fetch("/api/products", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    fetchProducts();
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setProductData((prev: any) => ({ ...prev, imageFile: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

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

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-pink-200 dark:from-gray-900 dark:to-gray-800 animate-fade-in">
        <div className="w-full max-w-md space-y-4 animate-zoom-in">
          <Skeleton className="h-8 w-1/2 mx-auto" />
          <Skeleton className="h-6 w-3/4 mx-auto" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-40 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 dark:bg-gray-900 flex relative">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-60 min-h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 py-8 px-4 fixed left-0 top-0 z-40 shadow-lg">
        <div className="flex flex-col items-center mb-10">
          <img src="/images/logo.jpg" alt="Logo" className="w-32 h-32 rounded-full border-4 border-pink-200 shadow mb-2" />
          <h2 className="text-lg font-bold text-pink-600 text-center font-pacifico">Delicias da Márcia</h2>
          <span className="text-xs font-bold text-gray-500 dark:text-gray-300 mt-1">usuário: {user?.name}</span>
        </div>
        <nav className="flex flex-col gap-2 flex-1">
          {TABS.map((t) => (
            <button
              key={t}
              className={`flex items-center gap-3 py-2 px-4 rounded-lg font-medium transition-colors duration-200 text-base group
                ${tab === t ? 'bg-pink-600 text-white shadow' : 'bg-white dark:bg-gray-700 text-pink-600 dark:text-white border border-pink-100 dark:border-gray-700 hover:bg-pink-100 dark:hover:bg-pink-700 hover:text-pink-700'}`}
              onClick={() => setTab(t)}
              type="button"
            >
              {t === "Produtos" && <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />}
              {t === "Categorias" && <Folder className="w-5 h-5 group-hover:scale-110 transition-transform" />}
              {t === "Depoimentos" && <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />}
              <span>{t}</span>
            </button>
          ))}
        </nav>
        <button
          onClick={() => { logout(); router.push("/login"); }}
          className="mt-8 flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-200 font-medium hover:bg-red-200 dark:hover:bg-red-800 transition-colors border border-red-200 dark:border-red-700"
        >
          <LogOut className="w-5 h-5" /> Sair
        </button>
      </aside>
      {/* Sidebar Mobile Drawer */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-full bg-white dark:bg-gray-800 border border-pink-200 dark:border-gray-700 shadow">
          <Menu className="w-6 h-6 text-pink-600" />
        </button>
      </div>
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex">
          <aside className="w-64 bg-white dark:bg-gray-800 h-full flex flex-col py-8 px-4 animate-zoom-in relative">
            <button onClick={() => setSidebarOpen(false)} className="absolute top-2 right-2 p-2 rounded-full bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-white"><span className="text-lg">×</span></button>
            <div className="flex flex-col items-center mb-10">
              <img src="/images/author-dona-marcia-delicias-da-marcia.jpg" alt="Logo" className="w-16 h-16 rounded-full border-4 border-pink-200 shadow mb-2" />
              <h2 className="text-lg font-bold text-pink-600 text-center font-pacifico">Doces da Márcia</h2>
              <span className="text-xs text-gray-500 dark:text-gray-300 mt-1">{user?.name}</span>
            </div>
            <nav className="flex flex-col gap-2 flex-1">
              {TABS.map((t) => (
                <button
                  key={t}
                  className={`flex items-center gap-3 py-2 px-4 rounded-lg font-medium transition-colors duration-200 text-base group
                    ${tab === t ? 'bg-pink-600 text-white shadow' : 'bg-white dark:bg-gray-700 text-pink-600 dark:text-white border border-pink-100 dark:border-gray-700 hover:bg-pink-100 dark:hover:bg-pink-700 hover:text-pink-700'}`}
                  onClick={() => { setTab(t); setSidebarOpen(false); }}
                  type="button"
                >
                  {t === "Produtos" && <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                  {t === "Categorias" && <Folder className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                  {t === "Depoimentos" && <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                  <span>{t}</span>
                </button>
              ))}
            </nav>
            <button
              onClick={() => { setSidebarOpen(false); logout(); router.push("/login"); }}
              className="mt-8 flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-200 font-medium hover:bg-red-200 dark:hover:bg-red-800 transition-colors border border-red-200 dark:border-red-700"
            >
              <LogOut className="w-5 h-5" /> Sair
            </button>
          </aside>
          <div className="flex-1" onClick={() => setSidebarOpen(false)} />
        </div>
      )}
      {/* Conteúdo principal */}
      <main className="flex-1 flex flex-col items-center justify-start md:ml-60 p-4 md:p-10 w-full min-h-screen">
        {/* Botão flutuante de tema */}
        <div className="fixed bottom-6 right-6 z-50">
          <div className="rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
            <ModeToggle />
          </div>
        </div>
        <div className="w-full max-w-2xl mx-auto">
          <div className="flex gap-2 mb-6 md:hidden justify-center">
            {TABS.map((t) => (
              <Button
                key={t}
                className={tab === t ? "bg-pink-600 text-white" : "bg-white text-pink-600 border border-pink-600"}
                onClick={() => setTab(t)}
                type="button"
              >
                {t}
              </Button>
            ))}
          </div>
          {tab === "Produtos" && (
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-4 text-center">Produtos</h2>
              {loading ? (
                <p>Carregando...</p>
              ) : (
                <ul className="space-y-2 w-full">
                  {products.map((p: any) => (
                    <li key={p.id} className="bg-white dark:bg-gray-800 rounded p-3 flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        {p.image && (
                          <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded border" />
                        )}
                        <div>
                          <span className="font-semibold text-base text-gray-900 dark:text-white">{p.name}</span>
                          <span className="text-xs text-gray-400 ml-2">({p.category})</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button className="border border-pink-600 text-pink-600 bg-white hover:bg-pink-50" onClick={() => handleEditProduct(p)} type="button">Editar</Button>
                        <Button className="border border-red-600 text-white bg-red-600 hover:bg-red-700" onClick={() => handleDeleteProduct(p.id)} type="button">Excluir</Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              {showProductForm ? (
                <form onSubmit={handleProductSubmit} className="bg-white dark:bg-gray-800 rounded p-4 mt-4 space-y-2 w-full" encType="multipart/form-data">
                  <Input placeholder="Nome do produto" value={productData.name} onChange={e => setProductData({ ...productData, name: e.target.value })} />
                  <select className="w-full rounded border p-2" value={productData.category} onChange={e => setProductData({ ...productData, category: e.target.value })}>
                    <option value="">Selecione a categoria</option>
                    {categories.map((c: any) => <option key={c.id} value={c.name}>{c.name}</option>)}
                  </select>
                  <div>
                    <label className="block text-sm font-medium mb-1">Imagem do produto</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {imagePreview && (
                      <img src={imagePreview} alt="Preview" className="mt-2 rounded w-32 h-32 object-cover border" />
                    )}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button type="submit">Salvar</Button>
                    <Button
                      type="button"
                      className="border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                      onClick={() => {
                        setShowProductForm(false);
                        setEditProductId(null);
                        setProductData({ name: "", category: "", image: "", imageFile: null });
                        setImagePreview(null);
                      }}
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              ) : (
                <Button className="mt-4" onClick={() => setShowProductForm(true)}>
                  Cadastrar novo produto
                </Button>
              )}
            </div>
          )}
          {tab === "Categorias" && (
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-4 text-center">Categorias</h2>
              {loading ? (
                <p>Carregando...</p>
              ) : (
                <ul className="space-y-2 w-full">
                  {categories.map((c: any) => (
                    <li key={c.id} className="bg-white dark:bg-gray-800 rounded p-3 flex justify-between items-center">
                      <span>{c.name}</span>
                      <div className="flex gap-2">
                        <Button className="border border-gray-300 text-gray-700 bg-white hover:bg-gray-50" onClick={() => handleEditCategory(c)}>Editar</Button>
                        <Button className="border border-red-500 text-red-600 bg-white hover:bg-red-50" onClick={() => handleDeleteCategory(c.id)}>Excluir</Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              {showCategoryForm ? (
                <form onSubmit={handleCategorySubmit} className="bg-white dark:bg-gray-800 rounded p-4 mt-4 space-y-2 w-full">
                  <Input placeholder="Nome da categoria" value={categoryName} onChange={e => setCategoryName(e.target.value)} />
                  <div className="flex gap-2 mt-2">
                    <Button type="submit">Salvar</Button>
                    <Button
                      type="button"
                      className="border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                      onClick={() => {
                        setShowCategoryForm(false);
                        setEditCategoryId(null);
                        setCategoryName("");
                      }}
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              ) : (
                <Button className="mt-4" onClick={() => setShowCategoryForm(true)}>
                  Cadastrar nova categoria
                </Button>
              )}
            </div>
          )}
          {tab === "Depoimentos" && (
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-4 text-center">Depoimentos</h2>
              {loading ? (
                <p>Carregando...</p>
              ) : (
                <ul className="space-y-2 flex flex-wrap gap-4 justify-center w-full">
                  {testimonials.map((t: any) => (
                    <li key={t.id} className="bg-white dark:bg-gray-800 rounded p-3 flex flex-col items-center">
                      <img src={t.image} alt="Depoimento" className="w-32 h-32 object-cover rounded mb-2 border" />
                      <Button className="text-red-600 border border-red-500 bg-white hover:bg-red-50 text-sm py-1 px-3" onClick={() => handleDeleteTestimonial(t.id)}>
                        Excluir
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
              {showTestimonialForm ? (
                <form onSubmit={handleTestimonialSubmit} className="bg-white dark:bg-gray-800 rounded p-4 mt-4 space-y-2 w-full" encType="multipart/form-data">
                  <div>
                    <label className="block text-sm font-medium mb-1">Imagem do depoimento</label>
                    <input type="file" accept="image/*" onChange={handleTestimonialImageChange} />
                    {testimonialPreview && (
                      <img src={testimonialPreview} alt="Preview" className="mt-2 rounded w-32 h-32 object-cover border" />
                    )}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button type="submit">Salvar</Button>
                    <Button
                      type="button"
                      className="border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                      onClick={() => {
                        setShowTestimonialForm(false);
                        setTestimonialImage(null);
                        setTestimonialPreview(null);
                      }}
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              ) : (
                <Button className="mt-4" onClick={() => setShowTestimonialForm(true)}>
                  Cadastrar novo depoimento
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 