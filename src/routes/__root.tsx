import {
  HeadContent,
  Outlet,
  createRootRouteWithContext,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools';

import type { QueryClient } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { Header } from '@/components/ui/Navbar/Header';
import FooterSection from '@/components/footer';

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    title: 'Daraz.pk Buy and sell from trusted sellers',
    meta: [
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },

      {
        name: 'description',
        content:
          'Daraz is a ecomerce website build for buying and selling and customer',
      },

      {
        name: 'robots',
        content: 'index, follow',
      },
    ],
  }),
  component: () => (
    <>
      <div className=" text-foreground  min-h-screen max-w-screen">
        <HeadContent />
        <Header />
        <Outlet />
        <FooterSection />
        <Toaster theme="light" expand={true} richColors position="top-center" />
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
      </div>
    </>
  ),
});
