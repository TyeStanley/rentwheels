import AdsContainer from '@/components/Homepage/AdsContainer';
import CarSearch from '@/components/Homepage/CarSearch';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="bg-white200 px-6 py-8 dark:bg-gray900 xl:px-16">
      <div className="mx-auto max-w-[1440px]">
        <AdsContainer />

        <CarSearch />

        <section className="mt-12 flex items-end justify-between lg:mt-10">
          <p className="text-sm font-semibold text-gray400 lg:px-5 lg:text-base">
            Popular cars
          </p>

          <Link
            // ! Link to car search page
            href=""
            className="text-xs font-semibold text-primary lg:px-5 lg:text-base"
          >
            View All
          </Link>
        </section>
      </div>
    </main>
  );
}
