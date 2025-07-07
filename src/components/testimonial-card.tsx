import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Image from "next/image";
import { X } from "lucide-react";

export interface TestimonialCardProps {
  image: string;
  id?: number;
  isOpen?: boolean;
  onOpenModal?: () => void;
  onCloseModal?: () => void;
  legend?: string;
}

export const TestimonialCard = ({ image, id, isOpen, onOpenModal, onCloseModal, legend }: TestimonialCardProps) => {
  const [showModal, setShowModal] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [zoomOrigin, setZoomOrigin] = useState<'center' | string>('center');

  // Sincroniza o estado do modal com o controle do pai
  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
    } else {
      setShowModal(false);
      setZoom(1);
    }
  }, [isOpen]);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

  // Fechar modal ao clicar fora da imagem
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
      setZoom(1);
      if (onCloseModal) onCloseModal();
    }
  };

  // Zoom dinâmico com scroll localizado
  const handleWheel = (e: React.WheelEvent<HTMLImageElement>) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomOrigin(`${x}% ${y}%`);
    setZoom((prev) => {
      let next = prev + (e.deltaY < 0 ? 0.15 : -0.15);
      if (next < 1) next = 1;
      if (next > 3) next = 3;
      return next;
    });
  };

  const handleOpen = () => {
    if (onOpenModal) onOpenModal();
    else setShowModal(true);
  };

  // Modal em portal para garantir tela cheia
  const canUseDOM = typeof window !== 'undefined' && !!document.body;
  const modal = showModal && canUseDOM ? ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 animate-fade-in w-screen h-screen"
      onClick={handleModalClick}
    >
      {/* Botão de fechar flutuante */}
      <button
        className="absolute top-4 right-4 bg-white/80 rounded-full p-2 hover:bg-white transition-colors z-10"
        onClick={() => { setShowModal(false); setZoom(1); if (onCloseModal) onCloseModal(); }}
        aria-label="Fechar"
      >
        <X className="w-6 h-6 z-10 text-pink-600" />
      </button>
      {/* Imagem em tela cheia */}
      <div className="fixed inset-0 flex items-center justify-center w-screen h-screen relative">
        <Image
          src={image}
          alt="Depoimento de cliente"
          fill
          className="object-contain select-none"
          style={{
            maxWidth: '100vw',
            maxHeight: '100vh',
            transform: `scale(${zoom})`,
            transformOrigin: zoomOrigin
          }}
          onWheel={handleWheel}
          draggable={false}
          sizes="100vw"
          priority={true}
          onMouseMove={e => {
            if (zoom > 1) {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = ((e.clientX - rect.left) / rect.width) * 100;
              const y = ((e.clientY - rect.top) / rect.height) * 100;
              setZoomOrigin(`${x}% ${y}%`);
            }
          }}
        />
        {/* Legenda sobreposta na parte inferior, se houver */}
        {legend && (
          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-lg text-base font-semibold shadow-lg">
            {legend}
          </span>
        )}
        {/* Botão de reset de zoom */}
        {zoom > 1 && (
          <button
            className="absolute bottom-6 right-6 px-4 py-2 rounded-lg bg-pink-500 hover:bg-pink-600 text-white font-medium shadow transition-colors z-10"
            onClick={() => setZoom(1)}
          >
            Voltar tamanho original
          </button>
        )}
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      <div
        className="bg-white dark:bg-gray-700 rounded-lg shadow p-2 flex flex-col items-center justify-center cursor-zoom-in hover:shadow-lg transition-shadow duration-300 w-full h-full min-h-[180px] min-w-[120px] max-w-[260px] max-h-[260px]"
        style={{ aspectRatio: '1/1' }}
        onClick={handleOpen}
      >
        <div className="relative w-full h-full flex items-center justify-center" style={{ aspectRatio: '1/1' }}>
          <Image
            src={image}
            alt="Depoimento de cliente"
            fill
            className="object-contain rounded mb-1 select-none"
            draggable={false}
            sizes="(max-width: 320px) 90vw, 256px"
            priority={false}
          />
        </div>
      </div>
      {modal}
    </>
  );
};