import { Navbar } from '@/components/navbar';
import { getCurrentSession } from '@/services/get-current-session';
import Link from 'next/link';
import { Google } from './icons/google';
import { LogoApp } from './icons/logo';

export async function Header() {
  const { user } = await getCurrentSession();
  return (
    <header className="container mx-auto flex max-w-7xl pt-2 pb-6">
      <div className="container mx-auto flex justify-between w-full px-4">
        <Link href="/" className="flex items-center gap-2">
          <LogoApp className="size-16" />
          <h1 className="text-xl font-bold">SmartBuy</h1>
        </Link>

        <div className="flex items-center gap-4">
          {user && (
            <nav className="hidden md:flex items-center ">
              <div className="flex gap-6 text-lg font-medium text-gray-300 [&>a]:text-sm [&>a]:font-medium [&>a]:hover:text-gray-100 transition-colors ">
                <Link href="/">Inicio</Link>
                <Link href="/dashboard">Mis Productos</Link>
              </div>
            </nav>
          )}
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
