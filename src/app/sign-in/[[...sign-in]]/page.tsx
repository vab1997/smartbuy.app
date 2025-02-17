import { SignIn } from '@clerk/nextjs';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center relative bg-black gap-4">
      <Link
        href="/"
        className="absolute top-4 left-4 flex items-center gap-3 text-white"
      >
        <ArrowLeftIcon className="size-4 " />
        <span className="text-sm ">Back to search</span>
      </Link>

      <h1 className="text-2xl font-bold text-white">Welcome to Wishwatch</h1>
      <SignIn component="button" withSignUp />
    </div>
  );
}
