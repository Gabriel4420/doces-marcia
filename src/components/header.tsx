import { Logo } from "@/components/logo";
import { ModeToggle } from "./theme-toggle";
import { CartSidebar } from "@/components/cart/sidebar";

export default function Header() {
  return (
    <header className="flex justify-between items-center my-5 mx-3">
      <div className="flex items-center gap-3"><Logo subheading="Store"/><ModeToggle/></div>
      <div className="flex items-center gap-3"><CartSidebar/></div>
    </header>
  );
}