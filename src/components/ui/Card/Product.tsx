import { use, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../card';
import type { DarazProducts } from '@/lib/Schemas/Product';
import { Link } from '@tanstack/react-router';
import { Heart, ShoppingCart, Star } from 'lucide-react';

const Product = ({ Data }: { Data: DarazProducts }) => {
  return (
    <>
      {Data.map((data) => (
        <Link key={data.id} to="/products/$id" params={{ id: data.id }}>
          <div className="group relative flex flex-col h-full bg-white rounded-md border border-slate-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="relative aspect-video overflow-hidden bg-slate-100">
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-50 object-contain transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col grow p-3 ">
              <div className="grow space-y-2">
                <h3 className="font-bold text-slate-800 sm:text-lg lg:text-md line-clamp-2 min-h-12 leading-tight group-hover:text-blue-600 transition-colors">
                  {data.title}
                </h3>
              </div>
              <div className=" flex items-center  justify-between ">
                <div className="flex flex-col">
                  <span className="text-md font-extrabold text-slate-900 tracking-normal ">
                    Price #
                    <span className="ml-1 text-primary text-pretty">
                     {data.price.toFixed(2)} $
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default Product;
