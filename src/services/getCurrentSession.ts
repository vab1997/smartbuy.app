import { auth, currentUser } from '@clerk/nextjs/server';

export async function getCurrentSession() {
  const session = await auth();
  const user = await currentUser();

  return { session, user };
}
