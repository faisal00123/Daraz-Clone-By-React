import { Button } from '@/components/ui/button';
import Product from '@/components/ui/Card/Product';
import { fetchedCategoryProduct } from '@/hooks/useProductFetch';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import {
  createFileRoute,
  useLoaderData,
  useParams,
} from '@tanstack/react-router';
const FetchedCategory = (e: string) =>
  queryOptions({
    queryKey: ['category', e],
    queryFn: () => fetchedCategoryProduct(e),
  });
export const Route = createFileRoute('/categories/$id')({
  component: RouteComponent,
  loader: async ({ params, context: { queryClient } }) => {
    return queryClient.ensureQueryData(FetchedCategory(params.id));
  },
});
function RouteComponent() {
  const { id } = Route.useParams();
  const { data } = useSuspenseQuery(FetchedCategory(id));
  return (
    <>
      <main className="w-full min-h-screen  ">
        <section className="mt-3 mb-4  m-auto max-w-7xl ">
          <Link to="/">
            <Button>Back</Button>
          </Link>
          <h1 className="mb-4  capitalize text-center text-2xl font-semibold tracking-tight">
            {id}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-2">
            <Product Data={data} />
          </div>
        </section>
      </main>
    </>
  );
}
