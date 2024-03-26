import Link from 'next/link';
import { Suspense } from 'react';

import AdsContainer from '@/components/Homepage/AdsContainer';
import CarSearch from '@/components/shared/CarSearch';
import RecommendedCarCards from '@/components/shared/RecommendedCarCards';
import CarCard from '@/components/shared/CarCard';
import Footer from '@/components/Footer/Footer';
import Loader from '@/components/shared/Loader';

import { verifyUser } from '@/lib/actions/user.actions';
import { getCityList, getPopularCars } from '@/lib/actions/car.actions';

export default async function Home({ searchParams }: any) {
  const { id, isUserLoggedIn } = await verifyUser();
  console.log(id);

  const locationList = await getCityList();
  const popularCars = await getPopularCars();

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

        <section className="mt-5 flex gap-5 overflow-x-auto lg:mt-7 lg:gap-8">
          {popularCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              cardType="popular"
              isUserLoggedIn={isUserLoggedIn}
            />
          ))}
        </section>

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
