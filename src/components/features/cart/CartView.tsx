import { useCart } from '@/hooks/useCart';
import Link from 'next/link';
import CartItem from './CartItem';
import OrderSummary from './OrderSummary';

export function CartView() {
  const { cart, removeFromCart, totalItems, total } = useCart();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link 
            href="/" 
            className="text-blue-500 hover:underline flex items-center gap-2"
          >
            ← Back to Catalog
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-bold mb-2">Your Cart</h1>
          <p className="text-gray-500 mb-6">{totalItems} items</p>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-grow">
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={() => removeFromCart(item.id)}
                />
              ))}
            </div>

            <OrderSummary 
              items={cart}
              total={total}
              itemCount={totalItems}
            />
          </div>
        </div>
      </div>
    </div>
  );
}