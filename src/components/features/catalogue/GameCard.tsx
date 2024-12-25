import React from 'react';
import { Game } from '@/types';
import { useCart } from '@/hooks/useCart';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

interface GameCardProps {
  game: Game;
}  

export default function GameCard({ game }: GameCardProps) {
  const { cart, addToCart, removeFromCart } = useCart();
    
  const isInCart = cart.some(item => item.id === game.id);

  return (
    <div className="border-[0.5px] border-gray-400 rounded-xl overflow-hidden bg-white p-5">
      <div className="relative mb-4 h-60 lg:h-60  lg:w-[332px]">
        <Image
          src={game.image}
          alt={game.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover rounded-t-2xl border-t"
          priority
        />
        {game.isNew && (
          <span className="absolute font-normal top-3 left-3 bg-gray-50 text-gray-500 px-3 py-2 h-8 leading-4 rounded text-base">
            New
          </span>
        )}
      </div>
      <div>
        <p className="text-base font-bold text-gray-800 uppercase">{game.genre}</p>
        <div className='flex justify-between my-2.5'>
          <h3 className="text-lg text-gray-500 font-bold">{game.name}</h3>
          <p className="text-gray-500 font-bold text-xl">
            ${game.price.toFixed(2)}
          </p>
        </div>

        <Button
          variant='outline'
          fullWidthOnAllScreens
          className="mt-4"
          onClick={() => isInCart ? removeFromCart(game.id) : addToCart(game)}
        >
          {isInCart ? 'REMOVE' : 'ADD TO CART'}
        </Button>
      </div>
    </div>
  );
}