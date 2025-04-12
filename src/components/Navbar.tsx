"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { ShoppingCart, Heart } from "lucide-react";

import { Button } from "./ui/button";
import ThemeToggleIcon from "./ThemeToggleIcon";
import { useCartStore } from "@/lib/store/cartStore";
import { useWishlistStore } from "@/lib/store/wishlistStore";
import DroppableArea from "./drag-and-drop/DropItem";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const totalItems = useCartStore((state) => state.totalItems);
  const wishlistItems = useWishlistStore((state) => state.items); // ✅ Get wishlist

  const handleToggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="w-full bg-white dark:bg-gray-950 shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-primary hover:opacity-80"
        >
          🛒 Plura
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Products
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleTheme}
            aria-label="Toggle Theme"
          >
            <ThemeToggleIcon theme={theme ?? "light"} />
          </Button>

          {/* Wishlist Icon with Green Dot */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/wishlist")}
            className="relative"
            aria-label="Wishlist"
          >
            <Heart size={22} className="text-foreground" />
            {wishlistItems.length > 0 && (
              <span className="absolute top-1 right-1 w-[10px] h-[10px] bg-green-500 rounded-full border-[2px] border-white dark:border-gray-950" />
            )} 
          </Button>

          {/* Cart Icon with Count */}
          <DroppableArea id="cart-dropzone">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/cart")}
            className="relative"
            aria-label="Cart"
          >
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </Button>
          </DroppableArea>

          {/* Auth Buttons */}
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="default" size="sm">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Link
              href="/profile"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Profile
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
