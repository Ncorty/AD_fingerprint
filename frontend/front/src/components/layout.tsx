import { Link, Outlet } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

export const Layout = () => {
    return (
        <div className="min-h-screen bg-background w-full">
            <nav className="border-b w-full">
                <div className="flex items-center gap-4">
                    <img
                        src="/pepe.png"
                        alt="Logo"
                        className="h-20 w-20"
                    />
                    <Link to="/">
                        <Button variant="default" >Главная</Button>
                    </Link>
                    <Link to="/history">
                        <Button variant="default">История сканов</Button>
                    </Link>
                </div>

            </nav>
            <main className="container mx-auto px-4 py-10">
                <Outlet />
            </main>
        </div>
    );
};