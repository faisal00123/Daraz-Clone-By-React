import { Button } from '@/components/ui/button';
import Cardcategories from '@/components/ui/Card/Cardcategories';
import Product from '@/components/ui/Card/Product';
import ClousorComponent from '@/components/ui/Clousor/ClousorComponent';
import { fetchProduct } from '@/hooks/useProductFetch';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
const Products = () =>
  queryOptions({
    queryKey: ['products'],
    queryFn: () => fetchProduct(),
  });
export const Route = createFileRoute('/')({
  component: App,
  loader: async ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(Products());
  },
});
function App() {
  const { data } = useSuspenseQuery(Products());

  return (
    <>
      <main className="w-full min-h-screen  ">
        <section className="mx-auto max-w-7xl px-6 py-2">
          <ClousorComponent />
          <section className="max-w-7xl">
            <h1 className="mb-4 text-start text-2xl font-semibold tracking-tight">
              Flash Sales
            </h1>
            <div className="flex items-center justify-between rounded-xl text-primary p-5  bg-white shadow-xl">
              <span className="text-sm font-medium">Limited Time Sale</span>
              <Button variant="outline" className="text-primary border-primary">
                View Products
              </Button>
            </div>
          </section>
          <section className="mt-3 max-w-7xl ">
            <h1 className="mb-4 text-start text-2xl font-semibold tracking-tight">
              Categories
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2 md:gap-3 items-stretch">
              <Cardcategories />
            </div>
          </section>
          <section className="mt-3 mb-4 max-w-7xl ">
            <h1 className="mb-4 text-start text-2xl font-semibold tracking-tight">
              Products
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-2">
              <Product Data={data} />
            </div>
          </section>
        </section>
      </main>
    </>
  );
}
