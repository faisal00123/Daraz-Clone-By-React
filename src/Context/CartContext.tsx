import type { DarazProduct, DarazProducts } from '@/lib/Schemas/Product';
import { useEffect } from 'react';
import { createContext, useContext } from 'react';
import { useState } from 'react';

export const cartContext = createContext();
export const CartContext = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem('cart')) || [],
  );
  const addToCart = (e: any): void => {
    return setCart((perv: any) => [e, ...perv]);
  };

  const RemoveFromCart = (id: string): void => {
    setCart((perv: DarazProduct) => perv.filter((i) => i.id !== id));
  };
  const Reset = () => {
    return setCart([]);
  };

  useEffect(() => {
    let storage = localStorage.setItem('cart', JSON.stringify(cart));
    return storage;
  }, [cart]);
  return (
    <>
      <cartContext.Provider value={{ cart, addToCart, RemoveFromCart, Reset }}>
        {children}
      </cartContext.Provider>
    </>
  );
};

export default CartContext;

export const useCart = () => {
  return useContext(cartContext);
};
