import { Navbar } from '@/components/navbar';
import { getCurrentSession } from '@/services/get-current-session';
import Link from 'next/link';
import { Google } from './icons/google';

export async function Header() {
  const { user } = await getCurrentSession();
  return (
    <header className="container mx-auto flex max-w-7xl pt-2 pb-6">
      <div className="container mx-auto flex justify-between w-full px-4">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/logo.svg"
            alt="logo Ahorando"
            className="aspect-auto object-contain size-20"
          />
          <h1 className="hidden md:block text-2xl font-bold">SmartBuy</h1>
        </Link>
        {user && (
          <nav className="hidden md:flex items-center ">
            <div className="flex gap-6 text-lg font-medium">
              <Link href="/" className="text-gray-300 hover:text-gray-100">
                Inicio
              </Link>
              <Link
                href="/dashboard"
                className="text-gray-300 hover:text-gray-100"
              >
                Mis Productos
              </Link>
            </div>
          </nav>
        )}

        <div className="flex items-center gap-2">
          {user ? (
            <Navbar />
          ) : (
            <Link
              href="/sign-in"
              className="text-white bg-black border border-gray-700/80 rounded-md px-3 py-5 text-sm h-[1lh] hover:bg-gray-700/40 transition-colors flex items-center gap-2"
            >
              <Google />
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
