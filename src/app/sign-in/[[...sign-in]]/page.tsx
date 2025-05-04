'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { SignIn } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

const SkeletonSignIn = () => {
  return <Skeleton className="h-40 w-96 bg-border" />;
};

export default function Page() {
  // const { signIn } = useUser();
  return (
    <div className="flex flex-col items-center justify-center relative bg-black gap-4">
      <h1 className="mb-2 text-3xl font-bold text-white">
        Bienvenido a SmartBuy.app
      </h1>
      <SignIn
        component="button"
        withSignUp
        fallback={<SkeletonSignIn />}
        appearance={{
          baseTheme: dark,
          elements: {
            headerTitle: {
              display: 'none',
            },
            header: {
              display: 'none',
            },
            button: {
              padding: '12px 24px',
              fontFamily: 'Geist',
              fontSize: '24px',
              fontWeight: 'bold',
            },
          },
        }}
      />
    </div>
  );
}
