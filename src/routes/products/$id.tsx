import { Button } from '@/components/ui/button';
import { Share } from '@/components/ui/ShareButton/Share';
import { useCart } from '@/Context/CartContext';
import { DeatailedProduct } from '@/hooks/useProductFetch';
import type { DarazProduct } from '@/lib/Schemas/Product';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { createFileRoute, useParams } from '@tanstack/react-router';
import {
  BadgeDollarSign,
  CarIcon,
  Info,
  ListRestart,
  LocationEditIcon,
  Lock,
  Star,
} from 'lucide-react';
import { toast } from 'sonner';
const ProductDetail = (e: string) =>
  queryOptions({
    queryKey: ['productDetail', e],
    queryFn: () => DeatailedProduct(e),
  });

export const Route = createFileRoute('/products/$id')({
  component: ProductDetailPage,
  loader: async ({ params, context: { queryClient } }) =>
    queryClient.ensureQueryData(ProductDetail(params.id)),
});

function ProductDetailPage() {
  const { id } = Route.useParams();
  const { data } = useSuspenseQuery(ProductDetail(id));
  const { addToCart }: any = useCart();
  return (
    <>
      <div key={id} className=" mt-4 m-auto max-w-7xl">
        <div className="flex  flex-start p-2">
          <Link to="/">
            <Button className="flex justify-center align-middle items-center">
              BACK
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 p-2 lg:grid-cols-12 gap-4">
          <div className="bg-white h-fit p-4 rounded-sm md:col-span-4">
            <div className="w-full ">
              <img
                src={data.image}
                alt={`${data.title} image`}
                className="w-full aspect-auto  object-contain cursor-pointer"
              />
            </div>
          </div>

          <div className="bg-white p-4 h-fit rounded-sm md:col-span-5 flex flex-col gap-4">
            <h1 className="text-xl leading-tight font-medium text-foreground">
              {data.title}
            </h1>

            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                {Array.from({ length: data.rating.rate }).map((_, i) => (
                  <Star key={i + 1} color="yellow" fill="yellow">
                    {i + 1}
                  </Star>
                ))}
                <span className="text-blue-500 hover:underline">
                  {data.rating.rate} Rating
                </span>
              </div>
              <div className="flex gap-3 text-gray-500">
                <Share />
              </div>
            </div>

            <div className="text-xs text-gray-500">
              Brand:{' '}
              <span className="text-blue-500 hover:underline">No Brand</span> |
              <span className="text-blue-500 hover:underline">
                {data.category}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl text-daraz-orange text-primary font-medium">
                ${data.price}
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-gray-400 text-sm line-through">
                  Rs. {data.price * 100}
                </span>
                <span className="text-foreground font-semibold text-sm">
                  {data.price * 2}%
                </span>
              </div>
            </div>

            <div className="mt-2">
              <h6 className="text-gray-500 text-sm mb-2">
                Size: <span className="text-foreground font-medium">XL</span>
              </h6>
              <div className="flex gap-2">
                <button className="px-4 py-1 text-sm border border-gray-200 hover:border-daraz-orange text-foreground disabled:opacity-50">
                  S
                </button>
                <button className="px-4 py-1 text-sm border border-gray-200 hover:border-daraz-orange text-foreground">
                  M
                </button>
                <button className="px-4 py-1 text-sm border border-gray-200 hover:border-daraz-orange text-foreground">
                  L
                </button>
                <button className="px-4 py-1 text-sm border border-daraz-orange text-daraz-orange relative">
                  XL
                </button>
                <button className="px-4 py-1 text-sm border border-gray-200 hover:border-daraz-orange text-foreground">
                  XXL
                </button>
              </div>
            </div>
            <div className="">
              <h6 className="text-gray-500 text-sm mb-2">Quantity</h6>
              <div className="flex items-center">
                <button className="w-8 h-8 bg-gray-100 hover:bg-gray-200 text-foreground flex items-center justify-center font-bold">
                  -
                </button>
                1
                <button className="w-8 h-8 bg-gray-100 hover:bg-gray-200 text-foreground flex items-center justify-center font-bold">
                  +
                </button>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <Button
                variant="default"
                className="flex-1 h-11 bg-sky-500 font-medium rounded-sm shadow-sm  flex items-center justify-center"
              >
                Buy Now
              </Button>
              <Button
                onClick={() => {
                  addToCart(data);
                  toast.success('item added Sucessfully');
                }}
                className="flex-1 h-11 bg-primary text-white text-base font-medium rounded-sm shadow-sm transition-colors"
              >
                Add to Cart
              </Button>
            </div>
          </div>

          <div className="md:col-span-3 flex flex-col gap-3">
            <div className="bg-white p-3 rounded-sm">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs text-foreground font-medium">
                  Delivery Options
                </span>
                <Info />
              </div>
              <div className="flex justify-between items-start mb-4 text-sm">
                <div className="flex gap-2">
                  <LocationEditIcon />
                  <span className="text-foreground font-medium leading-tight">
                    Sindh,Karachi-Bahadurabad, Block 15
                  </span>
                </div>
                <a
                  href="#"
                  className="text-blue-500 uppercase text-xs font-semibold whitespace-nowrap ml-2"
                >
                  Change
                </a>
              </div>

              <hr className="border-gray-100 mb-3" />

              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <div className="w-5 h-5  flex items-center justify-center shrink-0 mt-0.5">
                      <CarIcon />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Standard Delivery
                      </p>
                      <p className="text-xs text-gray-500">
                        Guaranteed by 17-21 Jan
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-foreground">
                    Rs. 165
                  </span>
                </div>

                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <div className="w-5 h-5 border border-gray-300 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <BadgeDollarSign />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Cash on Delivery Available
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-3 rounded-sm">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs text-foreground font-medium">
                  Return & Warranty
                </span>
                <ListRestart />
              </div>
              <ul className="space-y-3">
                <li className="flex gap-3 text-foreground items-start">
                  <svg
                    className="w-5 h-5 text-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    ></path>
                  </svg>
                  <span className="text-sm text-foreground">
                    14 days easy return
                  </span>
                </li>
                <li className="flex gap-3 items-start">
                  <Lock />
                  <span className="text-sm text-foreground">
                    Warranty not available
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded-sm">
              <div className="mb-3">
                <span className="text-xs text-foreground">Sold by</span>
                <h4 className="text-sm text-foreground font-medium">
                  FA Traders (Islamabad)
                </h4>
              </div>

              <div className="flex justify-between border-t border-b border-gray-100 py-3 mb-3">
                <div className="text-center w-1/3 border-r border-gray-100">
                  <span className="text-xs text-foreground block mb-1">
                    Positive Seller Ratings
                  </span>
                  <span className="text-lg font-bold text-foreground">82%</span>
                </div>
                <div className="text-center w-1/3 border-r border-gray-100">
                  <span className="text-xs text-foreground block mb-1">
                    Ship on Time
                  </span>
                  <span className="text-lg font-bold text-foreground">98%</span>
                </div>
                <div className="text-center w-1/3">
                  <span className="text-xs text-foreground block mb-1">
                    Chat Response Rate
                  </span>
                  <span className="text-xs font-bold text-foreground mt-2 block">
                    N/A
                  </span>
                </div>
              </div>

              <div className="text-center">
                <Link
                  to="/"
                  className="text-blue-500 text-xs font-bold uppercase hover:underline"
                >
                  Go to Store
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold mb-4 text-slate-800">
                Product details of {data.title}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-none gap-8">
                <p>{data.description}</p>
              </div>
              <div className="mt-2">
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <span className="text-xs text-slate-500 block mb-1">
                    What’s in the box
                  </span>
                  <span className="text-sm">1 x {data.title}</span>
                </div>
              </div>
              <div className="p-4 md:p-6">
                <h2 className="text-lg font-semibold mb-6">
                  Ratings & Reviews
                </h2>

                {/* Summary Header */}
                <div className="flex flex-col md:flex-row gap-8 mb-8">
                  {/* Left: Score */}
                  <div className="flex flex-col items-start md:items-start min-w-30">
                    <div className="text-5xl font-bold text-slate-900">
                      {data.rating.rate}
                      <span className="text-2xl text-slate-400 font-normal">
                        /5
                      </span>
                    </div>
                    <div className="flex text-yellow-400 my-2">
                      {Array.from({ length: data.rating.rate }).map((_, i) => (
                        <Star key={i + 1} color="yellow" fill="yellow">
                          {i + 1}
                        </Star>
                      ))}
                    </div>
                    <div className="text-sm text-slate-500">
                      {data.rating.count} Ratings
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
