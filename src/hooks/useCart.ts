import { useContext } from 'react';
import { CartContext } from '@/context/CartContext';

export function useCart() {
  const context = useContext(CartContext);
    if (context === undefined) {
      throw new Error('useCart must be used within a CartProvider');
    }
  return context;
}
/* 
import { useState, useEffect, useCallback } from 'react';
import { Game, CartItem } from '@/types';

export const useCart = () => {
const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing cart:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Debug: watch cart changes
  useEffect(() => {
    console.log('Cart updated:', cartItems);
  }, [cartItems]);


  const addToCart = (game: Game) => {
      // Get current cart state to ensure we work with the latest data
    const currentCart = [...cartItems];

    // Check if the game is already in the cart
    const existingIndex = currentCart.findIndex((item) => item.id === game.id);

    let updatedCart: CartItem[];
    if (existingIndex === -1) {
      // Game is not in the cart, add it
      updatedCart = [...currentCart, { ...game, quantity: 1 }];
    } else {
      // Game exists, increment its quantity
      updatedCart = currentCart.map((item, index) =>
        index === existingIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

      setCartItems(updatedCart);
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    };
  

  const removeFromCart = (gameId: string) => {
    console.log('Removing game from cart:', gameId);
    const updatedCart = cartItems.filter(item => item.id !== gameId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }
  
  return { cart: cartItems, addToCart, removeFromCart };
}; */

