import { Header } from '@/components/header';
import { SearchPage } from '@/components/search-page';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="container mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-10 px-4">
        <div className="flex flex-col items-center justify-center gap-1">
          <h1 className="text-center text-5xl font-bold md:text-6xl">
            What are you looking for?
          </h1>

          <p className="text-center text-lg text-gray-400">
            Search for products, brands, and more with Wishwatch
          </p>
        </div>

        <SearchPage />
      </main>
    </div>
  );
}
