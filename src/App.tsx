import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { queryClient } from '@/core/services/queryClient';
import { AppConfigProvider } from '@/core/contexts/AppConfigContext';
import { routes } from './routes';

// 라우터 생성
const router = createBrowserRouter(routes);

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AppConfigProvider>
                <RouterProvider router={router} />
            </AppConfigProvider>
        </QueryClientProvider>
    );
}

export default App;
