import { Button } from '@/components/ui/Button';
import { OrderSummaryProps } from '@/types';
  export default function OrderSummary({ items, total, itemCount }: OrderSummaryProps) {
    const hasItems = items.length > 0;
    return (
      <div className="flex-auto">
        <>
          <div  className="border-[0.5px] rounded-lg border-gray-400 p-4">
          <h2 className="text-xl font-bold mt-4 text-gray-500">Order Summary</h2>
          <p className="text-gray-500 text-lg my-4 font normal ">{itemCount} {itemCount === 1 ? 'item' : 'items'}</p>
          
          {hasItems ? (
          <>
          <div className="space-y-3 py-6 my-1 border-b border-gray-400">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-lg text-gray-500 font-normal">
                <span className="pr-4">
                  {item.name} 
                </span>
                <span>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          
          <div className="mt-4 pt-4 pb-8">
            <div className="flex justify-between font-bold text-xl">
              <span>Order Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          </>
          ) : (
            <p className="text-gray-500 text-center font-bold text-xl">Your cart is empty</p>
          )}
          </div>
          <Button variant="primary" responsiveFullWidth className="mt-10">
            Checkout
          </Button>
        </>
      </div>
    );
  }