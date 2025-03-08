import { auth, currentUser } from '@clerk/nextjs/server';
import { createOrUpdateUser, getUserByClerkId } from './user';

export async function getCurrentSession() {
  const session = await auth();
  const user = await currentUser();

  if (session && user) {
    await createOrUpdateUser(user);
  }

  if (!user) {
    return { session, user: null, userDb: null };
  }

  const userDb = await getUserByClerkId(user.id);

  return { session, user, userDb };
}
