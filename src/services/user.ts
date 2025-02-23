import db from '@/db';
import { usersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { User } from '@clerk/nextjs/server';

export async function createOrUpdateUser(user: User | null) {
  if (!user) return null;

  const userEmail = user.emailAddresses[0]?.emailAddress;
  if (!userEmail) return null;

  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, userEmail))
    .limit(1);

  if (existingUser.length === 0) {
    await db.insert(usersTable).values({
      email: userEmail,
      firstName: user.firstName ?? '',
      lastName: user.lastName ?? '',
      imageUrl: user.imageUrl ?? '',
      userIdClerk: user.id,
    });
    
    return {
      email: userEmail,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }

  return existingUser[0];
}

export async function getUserByClerkId(clerkId: string) {
  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.userIdClerk, clerkId))
    .limit(1);

  if (user.length === 0) {
    throw new Error('User not found');
  }

  return user[0];
}
