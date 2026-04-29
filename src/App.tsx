// src/App.tsx
import { Suspense } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from './routes';
import { queryClient } from '@/core/service/queryClient.ts';
import { AppConfigProvider } from '@/core/contexts/AppConfigProvider';

const router = createBrowserRouter(routes);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-gray-500">Loading...</div>}>
        <AppConfigProvider>
          <RouterProvider router={router} />
        </AppConfigProvider>
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
