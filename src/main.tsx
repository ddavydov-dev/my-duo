import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './shared/styles/index.scss'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import { Sprite } from './shared/ui/Sprite.tsx'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen.ts'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24 // 24 hours
    }
  }
})

const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  defaultViewTransition: true
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Sprite />

    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
)

persistQueryClient({
  queryClient,
  persister: localStoragePersister
})
