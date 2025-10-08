import {QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {RouterProvider} from "@tanstack/react-router";
import {router} from "@/router.tsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000,
            retry: 1
        },
    },
});
function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
        </QueryClientProvider>
    )
}

export default App;