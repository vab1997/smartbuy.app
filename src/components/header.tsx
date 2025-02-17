import { getCurrentSession } from '@/services/getCurrentSession';
import Link from 'next/link';
import { SignOutButton } from './sign-out-button';
export async function Header() {
  const { session, user } = await getCurrentSession();

  console.log({ user, session });

  return (
    <header className="bg-black absolute left-0 top-0 z-10 flex h-14 w-screen items-center justify-between px-4">
      <Link data-testid="header-logo" href="/">
        <svg
          fill="currentColor"
          viewBox="0 0 40 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="size-10"
        >
          <path d="M23.3919 0H32.9188C36.7819 0 39.9136 3.13165 39.9136 6.99475V16.0805H36.0006V6.99475C36.0006 6.90167 35.9969 6.80925 35.9898 6.71766L26.4628 16.079C26.4949 16.08 26.5272 16.0805 26.5595 16.0805H36.0006V19.7762H26.5595C22.6964 19.7762 19.4788 16.6139 19.4788 12.7508V3.68923H23.3919V12.7508C23.3919 12.9253 23.4054 13.0977 23.4316 13.2668L33.1682 3.6995C33.0861 3.6927 33.003 3.68923 32.9188 3.68923H23.3919V0Z"></path>
          <path d="M13.7688 19.0956L0 3.68759H5.53933L13.6231 12.7337V3.68759H17.7535V17.5746C17.7535 19.6705 15.1654 20.6584 13.7688 19.0956Z"></path>
        </svg>
        <span className="sr-only">New url</span>
      </Link>
      <div className="flex gap-2">
        {session && user ? (
          <SignOutButton />
        ) : (
          <>
            <Link
              href="/sign-in"
              className="text-white bg-black border border-gray-700/80 rounded-md px-3 py-1 text-sm h-7 hover:bg-gray-700/40 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/sign-in"
              className="text-black bg-white border border-white rounded-md px-3 py-1 text-sm h-7 hover:opacity-85 transition-opacity"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
