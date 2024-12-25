'use client'
import { createContext, useState, useEffect, ReactNode } from 'react';
import { Game, CartItem } from '@/types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (game: Game) => void;
  removeFromCart: (gameId: string) => void;
  totalItems: number;
  total: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing cart:', error);
      }
    }
  }, []);

  const addToCart = (game: Game) => {
    setCart(currentCart => {
      const updatedCart = [...currentCart];
      const existingItem = updatedCart.find(item => item.id === game.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        updatedCart.push({ ...game, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeFromCart = (gameId: string) => {
    setCart(currentCart => {
      const updatedCart = currentCart.filter(item => item.id !== gameId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider 
      value={{ cart, addToCart, removeFromCart, totalItems, total }}
    >
      {children}
    </CartContext.Provider>
  );
}  