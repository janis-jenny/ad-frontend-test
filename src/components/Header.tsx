import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
export default function Header() {
  return (
      <header className="sticky top-0 z-50 bg-gray-100">
      <nav className="container mx-auto px-4 flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold">
            <Image src="/images/GamerShop.png" alt="Logo" width={150} height={24} className="" />
          </Link>
          <Link href="/cart" className="p-2">
            <Image src="/images/cart-icon.png" alt="Cart" width={24} height={24} className="h-6 w-6" />
          </Link>
      </nav>
      </header>
  );
}
