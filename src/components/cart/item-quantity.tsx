import { useCartStore } from "@/store/cart-store";
import { Button } from "../ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Product } from "@/types/product";

interface CartItem {
  product: Product;
  quantity: number;
}

type Props = {
  cartItem: CartItem;
};

const CartItemQuantity = ({ cartItem }: Props) => {
  const { upsertCartItem } = useCartStore((state) => state);

  const handleDecreaseQuantity = () => {
    upsertCartItem(cartItem.product, -1);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => upsertCartItem(cartItem.product, 1)}
        variant="outline"
        size="icon"
        className="size-5"
        aria-label="Aumentar quantidade"
      >
        <PlusIcon className="size-3" />
      </Button>
      <span className="min-w-[20px] text-center">{cartItem.quantity}</span>
      <Button
        onClick={handleDecreaseQuantity}
        variant="outline"
        size="icon"
        className="size-5"
      
        aria-label="Diminuir quantidade"
      >
        <MinusIcon className="size-3" />
      </Button>
    </div>
  );
};

export { CartItemQuantity };
