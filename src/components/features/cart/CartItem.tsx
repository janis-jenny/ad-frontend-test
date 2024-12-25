import React from 'react';
import { CartItem as CartItemType } from '@/types';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

interface Props {
  item: CartItemType;
  onRemove: () => void;
  isLast: boolean;
}

export default function CartItem({ item, onRemove, isLast }: Props) {
  return (
    <div className={`flex flex-col lg:flex-row gap-4 ${isLast ? "" : "border-b-[0.5px] border-gray-400"} py-6 px-4 mx-2 lg:mx-0"`}>
      <div className="flex justify-between items-start lg:block">
        <div className="relative w-full lg:w-64 h-36 lg:h-40 pr-2">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover rounded"
          />
          {item.isNew && (
            <span className="absolute font-normal top-3 left-3 bg-gray-50 text-gray-500 px-3 py-2 h-8 leading-4 rounded text-base">
              New
            </span>
          )}
        </div>
        <Button
          onClick={onRemove}
          variant='secondary'
          className="lg:hidden justify-start items-start text-gray-500 px-4 pt-1"
        >
          <Image src="/images/cancel-icon.png" alt="Cancel" width={24} height={24} />
        </Button>
      </div>
      <div className="flex-grow justify-between">
        <div className="flex-col lg:flex-row justify-between">
          <div className="flex items-start justify-between">
            <p className="text-sm lg:text-base text-gray-800 mb-1 font-bold uppercase">{item.genre}</p>
              <Button
                onClick={onRemove}
                variant='secondary'
                className="hidden lg:block text-gray-500 px-2 pt-1"
              >
                <Image src="/images/cancel-icon.png" alt="Cancel" width={24} height={24} />
              </Button>
            </div>
            <h3 className="text-lg lg:text-xl text-gray-500 font-bold pt-1">{item.name}</h3>
            <p className="text-base font-normal text-gray-800 mt-2 pr-5 line-clamp-3">{item.description}</p>
            <div className="flex justify-end lg:items-end mt-4 lg:mt-4">
              <p className="font-bold lg:text-right text-gray-500 text-lg lg:text-xl">${item.price.toFixed(2)}</p>
            </div>
          </div>
      </div>
    </div>
  );
}