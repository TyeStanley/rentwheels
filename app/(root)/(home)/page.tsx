import Link from 'next/link';
import { Suspense } from 'react';

import AdsContainer from '@/components/Homepage/AdsContainer';
import CarSearch from '@/components/shared/CarSearch';
import PopularCarCards from '@/components/shared/PopularCarCards';
import RecommendedCarCards from '@/components/shared/RecommendedCarCards';
import Footer from '@/components/Footer/Footer';
import Loader from '@/components/shared/Loader';

import { verifyUser } from '@/lib/actions/user.actions';
import { getCityList } from '@/lib/actions/car.actions';
import { Params } from '@/types';

export default async function Home({ searchParams }: { searchParams: Params }) {
  const { isUserLoggedIn } = await verifyUser();

  const locationList = await getCityList();

  return (
    <main className="bg-white200 dark:bg-gray900">
      <div className="mx-auto px-6 py-8 lg:max-w-[1024px] xl:max-w-[1440px] xl:px-16">
        <AdsContainer />

        <CarSearch locationList={locationList} />

        <section className="mt-12 flex items-end justify-between lg:mt-10">
          <p className="text-sm font-semibold text-gray400 lg:px-5 lg:text-base">
            Popular cars
          </p>

          <Link
            href="/search"
            className="text-xs font-semibold text-primary lg:px-5 lg:text-base"
          >
            View All
          </Link>
        </section>

        <Suspense fallback={<Loader />}>
          <PopularCarCards isUserLoggedIn={isUserLoggedIn} />
        </Suspense>

        <p className="mt-8 text-sm font-semibold text-gray400 lg:mt-10 lg:px-5 lg:text-base">
          Recommended cars
        </p>

        <Suspense fallback={<Loader />} key={JSON.stringify(searchParams)}>
          <RecommendedCarCards
            searchParams={searchParams}
            isUserLoggedIn={isUserLoggedIn}
          />
        </Suspense>

        <Footer />
      </div>
    </main>
  );
}
