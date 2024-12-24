import { Button } from '@/components/ui/Button';
import { OrderSummaryProps } from '@/types';
  export default function OrderSummary({ items, total, itemCount }: OrderSummaryProps) {
    const hasItems = items.length > 0;
    return (
      <div className="lg:w-80">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <p className="text-gray-500 text-sm mb-4">{itemCount} {itemCount === 1 ? 'item' : 'items'}</p>
          
          {hasItems ? (
          <>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {item.name} 
                </span>
                <span className="font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          
          <div className="border-t border-gray-200 mt-4 pt-4">
            <div className="flex justify-between font-semibold">
              <span>Order Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
  
          <Button variant="secondary" fullWidth>
            Checkout
          </Button>
          </>
          ) : (
            <p className="text-gray-500 text-center">Your cart is empty</p>
          )}
        </div>
      </div>
    );
  }