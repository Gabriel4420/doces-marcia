import { useCartStore } from "@/store/cart-store";
import { Cart } from "@/types/cart";
import { Button } from "../ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";

type Props = {
  cartItem: Cart;
};

export const CartItemQuantity = ({ cartItem }: Props) => {
  const { upsertCartItem } = useCartStore((state) => state);

  const handleDecreaseQuantity = () => {
    upsertCartItem(cartItem.product, -1);
    if (cartItem.quantity == 0) {
      upsertCartItem(cartItem.product, 0);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => upsertCartItem(cartItem.product, 1)}
        variant="outline"
        size="icon"
        className="size-5"
      >
        {" "}
        <PlusIcon className="size-3" />{" "}
      </Button>
      <span>{cartItem.quantity}</span>
      <Button
        onClick={handleDecreaseQuantity}
        variant="outline"
        size="icon"
        className="size-5"
      >
        {" "}
        <MinusIcon className="size-3" />{" "}
      </Button>
    </div>
  );
};
