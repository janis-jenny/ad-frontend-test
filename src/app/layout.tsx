import './global.css';
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
      <CartProvider>
        <Header />
        <main className="container mx-auto px-4 py-8 min-h-screen flex flex-col font-archive" >
          {children}
        </main>
        <Footer />
      </CartProvider>
      </body>
    </html>
  );
}