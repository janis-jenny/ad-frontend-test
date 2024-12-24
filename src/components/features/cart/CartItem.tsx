import React from 'react';
import { CartItem as CartItemType } from '@/types';
import Image from 'next/image';

interface Props {
  item: CartItemType;
  onRemove: () => void;
}

export default function CartItem({ item, onRemove }: Props) {
  return (
    <div className="flex gap-6 border-b border-gray-200 py-6">
      <div className="relative w-32 h-32">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover rounded"
          sizes="(max-width: 768px) 128px, 128px"
        />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500 mb-1">{item.genre}</p>
            <h3 className="font-semibold text-lg">{item.name}</h3>
            <p className="text-sm text-gray-600 mt-2">{item.description}</p>
          </div>
          <div className="flex items-start gap-4">
            <div className="text-right">
              <p className="font-semibold">${item.price.toFixed(2)}</p>
            </div>
            <button 
              onClick={onRemove}
              className="text-gray-400 hover:text-red-500 text-xl"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}