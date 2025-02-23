import { BackButton } from '@/components/back-button';
import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center relative bg-black gap-4">
      <BackButton href="/" backText="Back to search" />

      <h1 className="text-2xl font-bold text-white">Welcome to Wishwatch</h1>
      <SignIn component="button" withSignUp />
    </div>
  );
}
