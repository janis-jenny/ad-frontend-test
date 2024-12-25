import { useCart } from '@/hooks/useCart';
import Link from 'next/link';
import CartItem from './CartItem';
import Image from 'next/image';
import OrderSummary from './OrderSummary';

export function CartView() {
  const { cart, removeFromCart, totalItems, total } = useCart();

  return (
    <div className="min-h-screen">
      <div className="container mx-auto">
        <div className="flex items-center mb-8 pt-2">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-gray-500 font-medium text-base" 
          >
            <Image src="/images/arrow-left.png" alt="Logo" className="" /> Back to Catalog
          </Link>
        </div>

        <div className="text-gray-500 rounded-lg py-6 px-2">
          <h1 className="text-2xl font-bold mb-2 text-2xl lg:text-4xl">Your Cart</h1>
          <p className="mb-6 text-xl font-normal lg:text-2xl">{totalItems} {totalItems === 1 ? 'item' : 'items'}</p>

          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-auto">
              {cart.map((item, index) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={() => removeFromCart(item.id)}
                  isLast={index == cart.length - 1}
                />
              ))}
            </div>

            <div className="lg:w-1/3 flex-shrink-0">
              <OrderSummary 
                items={cart}
                total={total}
                itemCount={totalItems}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}