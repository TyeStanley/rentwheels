import Link from 'next/link';

import AdsContainer from '@/components/Homepage/AdsContainer';
import Footer from '@/components/Footer/Footer';
import CarCard from '@/components/shared/CarCard';
import CarSearch from '@/components/shared/CarSearch';

import { verifyUser } from '@/lib/actions/user.actions';
import {
  getCityList,
  getPopularCars,
  getRecommendedCars,
} from '@/lib/actions/car.actions';

export default async function Home({ searchParams }: any) {
  const { id, isUserLoggedIn } = await verifyUser();
  console.log(id);

  const locationList = await getCityList();
  const popularCars = await getPopularCars();
  const { recommendedCars, hasMoreCars } = await getRecommendedCars(
    searchParams.city,
    searchParams.from,
    searchParams.to,
    searchParams.page
  );

  const handleShowMore = () => {
    let page = 2;

    if (searchParams.page) {
      page = Number(searchParams.page) + 1;
    }

    let url = '';

    if (searchParams.city) {
      if (!url) {
        url += `?city=${searchParams.city}`;
      } else {
        url += `city=${searchParams.city}`;
      }
    }

    if (searchParams.from) {
      if (!url) {
        url += `?from=${searchParams.from}`;
      } else {
        url += `&from=${searchParams.from}`;
      }
    }

    if (searchParams.to) {
      if (!url) {
        url += `?to=${searchParams.to}`;
      } else {
        url += `&to=${searchParams.to}`;
      }
    }

    return `/${url}&page=${page}`;
  };

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

        <section className="mt-5 flex flex-wrap gap-5 sm:grid sm:grid-cols-2 lg:flex lg:gap-8">
          {recommendedCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              cardType="recommended"
              isUserLoggedIn={isUserLoggedIn}
            />
          ))}
        </section>

        {hasMoreCars && (
          <Link
            href={handleShowMore()}
            className="mt-5 flex items-center justify-center"
            scroll={false}
          >
            Show more cars
          </Link>
        )}

        <Footer />
      </div>
    </main>
  );
}
