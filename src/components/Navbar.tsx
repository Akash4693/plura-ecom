"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { ShoppingCart, Heart, Menu } from "lucide-react";
import { useState } from "react";

import { Button } from "./ui/button";
import ThemeToggleIcon from "./ThemeToggleIcon";
import { useCartStore } from "@/lib/store/cartStore";
import { useWishlistStore } from "@/lib/store/wishlistStore";
import DroppableArea from "./drag-and-drop/DropItem";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItems = useCartStore((state) => state.totalItems);
  const wishlistItems = useWishlistStore((state) => state.items);

  const handleToggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="w-full bg-white dark:bg-gray-950 shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="hidden md:block text-xl font-bold tracking-tight hover:opacity-80"
        >
          🛒 Plura
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle Menu"
        >
          <Menu />
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium transition-all px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-primary"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="text-sm font-medium transition-all px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-primary"
          >
            Products
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <Button variant="ghost" size="icon" onClick={handleToggleTheme}>
            <ThemeToggleIcon theme={theme ?? "light"} />
          </Button>

          {/* Wishlist */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/wishlist")}
            className="relative group"
          >
            <Heart
              size={22}
              className="text-foreground transition-colors group-hover:fill-pink-500 group-hover:text-pink-500"
            />
            {wishlistItems.length > 0 && (
              <span className="absolute top-1 right-1 w-[10px] h-[10px] bg-green-500 rounded-full border-2 border-white dark:border-gray-950" />
            )}
          </Button>

          {/* Cart */}
          <DroppableArea id="cart-dropzone">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/cart")}
              className="relative"
            >
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </Button>
          </DroppableArea>

          {/* Auth */}
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
              className="text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-primary"
            >
              Profile
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-2 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-sm font-medium hover:underline"
          >
            Home
          </Link>
          <Link
            href="/products"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-sm font-medium hover:underline"
          >
            Products
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
