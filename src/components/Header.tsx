import React from 'react';
import Link from 'next/link';
export default function Header() {
  return (
      <header className="sticky top-0 z-50 bg-gray-100">
      <nav className="container mx-auto px-4 flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold">
          <img src="/images/GamerShop.png" alt="Logo" className="" />
          </Link>
          <Link href="/cart" className="p-2">
          <img src="/images/cart-icon.png" alt="Cart" className="h-6 w-6" />
          </Link>
      </nav>
      </header>
  );
}
