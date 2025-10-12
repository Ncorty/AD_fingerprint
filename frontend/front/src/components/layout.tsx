import { Link, Outlet } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

export const Layout = () => {
    return (
        <div className="min-h-screen bg-background w-full">
            <nav className="border-b w-full">
                <div className="px-4 py-4 flex gap-4">
                    <Link to="/">
                        <Button /*style={{display: 'flex', justifyContent: 'flex-start'}}*/ variant="ghost">Главная</Button>
                    </Link>
                    <Link to="/history">
                        <Button /*style={{display: 'flex', justifyContent: 'flex-start'}}*/ variant="ghost">История сканов</Button>
                    </Link>
                </div>
            </nav>
            <main className="container mx-auto px-4 py-10">
                <Outlet />
            </main>
        </div>
    );
};