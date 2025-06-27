import { useCheckoutStore } from "@/store/checkout-store";
import { Button } from "../ui/button";
import Link from "next/link";
import { generateMessage } from "@/helpers/generate-message";
import { useEffect } from "react";

export const StepFinish = () => {
  const { user } = useCheckoutStore((state) => state);

  const unformattedPhone = user.phone?.replace(/\D/g, ""); // Remove all non-digit characters
  const message = generateMessage();
  const linkZap = `https://wa.me/+55${
    process.env.NEXT_PUBLIC_WHATSAPPNUMBER
  }?text=${encodeURI(message)}`;

  
  

  return (
    <div className="text-center flex flex-col gap-5">
      <p>
        Perfeito <strong>{user.name}</strong>!
      </p>
      <p>
        Agora envie seu pedido ao nosso whatsapp para concluir. Nosso atendente
        irá te guiar sobre o acompanhamento do pedido.
      </p>
      <Button>
        <Link target="_blank" href={linkZap}>
          Enviar para o WhatsApp
        </Link>
      </Button>
    </div>
  );
};
