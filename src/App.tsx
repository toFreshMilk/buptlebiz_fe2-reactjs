// src/App.tsx
import { Suspense } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from './routes';
import { queryClient } from '@/core/service/queryClient.ts';
import { AppConfigProvider } from '@/core/contexts/AppConfigProvider';
import { LoadingBar } from '@/core/uikit/feedback/LoadingBar';

const router = createBrowserRouter(routes);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<LoadingBar />}>
        <AppConfigProvider>
          <RouterProvider router={router} />
        </AppConfigProvider>
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
