import { useCartStore } from "@/store/cart-store";
import { useCheckoutStore } from "@/store/checkout-store";

export const generateMessage = () => {
  const { user, address } = useCheckoutStore((state) => state);
  const { cart } = useCartStore((state) => state);

  let orderProducts = [];
  let orderTotal = 0;
  for (let item of cart) {
    orderProducts.push(
      `${item.quantity} X ${
        item.product.name
      } - R$ ${item.product.price.toFixed(2)}`
    );

    orderTotal += item.product.price * item.quantity;
  }

  return `
    **Olá, ${user.name}!**
    Aqui está o resumo do seu pedido:
    **Dados do cliente** 
    CPF: ${user.documentId}
    Endereço: ${address.street}, 
    Numero: ${address.number}, 
    Complemento: ${address.complement},
    Bairro: ${address.district}, 
    Cidade: ${address.city}/${address.state.toUpperCase()}
    ----------------
    **Pedido**
    ${orderProducts.join("\n")}
    ----------------
    **Total**
    R$ ${orderTotal.toFixed(2)}
    ----------------
`;
};
