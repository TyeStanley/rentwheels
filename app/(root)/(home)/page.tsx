import Link from 'next/link';

import AdsContainer from '@/components/Homepage/AdsContainer';
import Footer from '@/components/Footer/Footer';
import CarCard from '@/components/shared/CarCard';
import CarSearch from '@/components/shared/CarSearch';
import { verifyUser } from '@/lib/actions/user.actions';

export default async function Home() {
  const { id, isUserLoggedIn } = await verifyUser();

  console.log('id', id);
  console.log('isUserLoggedIn', isUserLoggedIn);

  return (
    <main className="bg-white200 dark:bg-gray900">
      <div className="mx-auto px-6 py-8 lg:max-w-[1024px] xl:max-w-[1440px] xl:px-16">
        <AdsContainer />

        <CarSearch />

        <section className="mt-12 flex items-end justify-between lg:mt-10">
          <p className="text-sm font-semibold text-gray400 lg:px-5 lg:text-base">
            Popular cars
          </p>

          <Link
            // ! Link to car search page
            href="/"
            className="text-xs font-semibold text-primary lg:px-5 lg:text-base"
          >
            View All
          </Link>
        </section>

        <section className="mt-5 flex gap-5 overflow-x-auto lg:mt-7 lg:gap-8">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <CarCard key={i} cardType="popular" />
            ))}
        </section>

        <p className="mt-8 text-sm font-semibold text-gray400 lg:mt-10 lg:px-5 lg:text-base">
          Recommended cars
        </p>

        <section className="mt-5 flex flex-wrap gap-5 sm:grid sm:grid-cols-2 lg:flex lg:gap-8">
          {Array(17)
            .fill(0)
            .map((_, i) => (
              <CarCard key={i} cardType="recommended" />
            ))}
        </section>

        <Footer />
      </div>
    </main>
  );
}
