'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { SignIn } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

const SkeletonSignIn = () => {
  return <Skeleton className="h-40 w-96 bg-border" />;
};

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center relative bg-black gap-4">
      <SignIn
        component="button"
        withSignUp
        fallback={<SkeletonSignIn />}
        appearance={{
          baseTheme: dark,
          elements: {
            button: {
              padding: '12px 24px',
              fontFamily: 'Geist',
              fontWeight: 'bold',
            },
            socialButtons: 'clerk-social-buttons-vertical',
            socialButtonsBlockButton: 'clerk-social-button-full',
            socialButtonsBlockButtonText__google: 'clerk-social-button-text',
            socialButtonsBlockButtonText__github: 'clerk-social-button-text',
            card: 'clerk-body',
            header: 'clerk-header',
            headerTitle: 'clerk-header-title',
            main: 'clerk-main',
          },
        }}
      />
    </div>
  );
}
