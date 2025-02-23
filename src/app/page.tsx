import { SearchPage } from '@/components/search-page';
import { getCurrentSession } from '@/services/getCurrentSession';
import { createOrUpdateUser, getUserByClerkId } from '@/services/user';

export default async function Home() {
  const { user } = await getCurrentSession();
  await createOrUpdateUser(user);

  const userFromDb = user && (await getUserByClerkId(user?.id));

  return (
    <main className="container mx-auto flex max-w-6xl flex-col items-center justify-center gap-10 px-4 pt-52">
      <div className="flex flex-col items-center justify-center gap-1 h-full ">
        <h1 className="text-center text-5xl font-bold md:text-6xl">
          What are you looking for?
        </h1>

        <p className="text-center text-lg text-gray-400">
          Search for products, brands, and more with Wishwatch
        </p>
      </div>

      <SearchPage userId={userFromDb?.id} />
    </main>
  );
}
