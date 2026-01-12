import { ShoppingCartIcon } from 'lucide-react';
import { Button } from '../button';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { useCart } from '@/Context/CartContext';
import type { DarazProduct, DarazProducts } from '@/lib/Schemas/Product';
import { toast } from 'sonner';

const ShopingCart = () => {
  const { cart, RemoveFromCart, Reset }: any = useCart();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="link">
          <ShoppingCartIcon color="white" size={50} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        {cart && (
          <div
            className="absolute right-0 mt-2 w-80 bg-gray-100 text-black dark:bg-slate-950 
          dark:text-white p-2 rounded shadow-lg z-50"
          >
            <div className="p-4">
              <h2 className="font-semibold text-lg mb-2">Cart Items</h2>

              {cart.length === 0 ? (
                <p className="text-foreground text-sm">Your cart is empty</p>
              ) : (
                <>
                  <ul className="max-h-60 overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700">
                    {cart.map((item: DarazProduct) => (
                      <li
                        key={item.id}
                        className="flex justify-between items-center py-2"
                      >
                        <div>
                          <p className="font-semibold">{item.title}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            ${item.price}
                          </p>
                        </div>

                        <button
                          onClick={() => {
                            RemoveFromCart(item.id);
                            toast.error(`${item.title} removed Successfully`);
                          }}
                          className="text-sm text-red-500 hover:underline"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => {
                      Reset();
                      if (
                        window.confirm(
                          'Are you sure you want to empty your cart',
                        )
                      ) {
                        toast.error('cart is empty');
                      }
                    }}
                    className="mt-3 w-full bg-red-500 text-white py-1 rounded hover:bg-red-600"
                  >
                    Clear Cart
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default ShopingCart;
