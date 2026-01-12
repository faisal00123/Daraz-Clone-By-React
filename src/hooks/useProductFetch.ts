import {
  ProductsType,
  type DarazProduct,
  type DarazProducts,
} from '@/lib/Schemas/Product';

export const fetchProduct = async (): Promise<DarazProducts> => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products`);
    if (!res.ok) throw new Error('');
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error(error);
    throw Error(error);
  }
};
export const fetchedCategoryProduct = async (e: string) => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/category/${e}`);
    if (!res.ok) throw new Error('');
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error(error);
    throw Error(error);
  }
};

export const DeatailedProduct = async (
  e: string | number,
): Promise<DarazProduct> => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${e}`);
    if (!res.ok) throw new Error('');
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error(error);
    throw Error(error);
  }
};
