import { createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { Layout } from './components/layout';
import { HomePage } from './pages/HomePage';
import { HistoryPage } from './pages/HistoryPage';
import { ScanPage } from './pages/ScanPage';

const rootRoute = createRootRoute({
    component: Layout,
});

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: HomePage,
});

const historyRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/history',
    component: HistoryPage,
});

const scanRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/scan/$id',
    component: ScanPage,
});

const routeTree = rootRoute.addChildren([indexRoute, historyRoute, scanRoute]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}