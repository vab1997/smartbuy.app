import { Navbar } from '@/components/navbar';
import { getCurrentSession } from '@/services/get-current-session';
import Link from 'next/link';

export async function Header() {
  const { user } = await getCurrentSession();
  return (
    <header className="container mx-auto flex max-w-7xl pt-2 pb-6">
      <div className="container mx-auto flex justify-between w-full px-4">
        <div className="flex items-center gap-2">
          <img
            src="/logo.svg"
            alt="logo DiscountSpy"
            className="aspect-auto object-contain size-20"
          />
          <Link href="/">
            <h1 className="text-2xl font-bold">DiscountSpy</h1>
          </Link>
        </div>
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

        <div className="flex gap-2">
          {user ? (
            <Navbar />
          ) : (
            <Link
              href="/sign-in"
              className="text-white bg-black border border-gray-700/80 rounded-md px-3 py-5 text-sm h-7 hover:bg-gray-700/40 transition-colors flex items-center gap-2"
            >
              <svg
                viewBox="-3 0 262 262"
                preserveAspectRatio="xMidYMid"
                fill="#000000"
                className="w-4 h-4"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                    fill="#4285F4"
                  ></path>
                  <path
                    d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                    fill="#34A853"
                  ></path>
                  <path
                    d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                    fill="#FBBC05"
                  ></path>
                  <path
                    d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                    fill="#EB4335"
                  ></path>
                </g>
              </svg>
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
