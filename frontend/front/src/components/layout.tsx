import { Link, Outlet } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

export const Layout = () => {
    return (
        <div className="min-h-screen bg-background">
            <nav className="border-b">
                <div className="container mx-auto px-4 py-4 flex gap-4">
                    <Link to="/">
                        <Button variant="ghost">Главная</Button>
                    </Link>
                    <Link to="/history">
                        <Button variant="ghost">История сканов</Button>
                    </Link>
                </div>
            </nav>
            <main className="container mx-auto px-4 py-10">
                <Outlet />
            </main>
        </div>
    );
};