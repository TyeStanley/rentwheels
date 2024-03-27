import Link from 'next/link';

import CarCard from '@/components/shared/CarCard';
import { handleShowMore } from '@/lib/utils';
import { getSearchCars } from '@/lib/actions/car.actions';

const SearchCarCards = async ({ searchParams, isUserLoggedIn }: any) => {
  const { searchCars, hasMoreCars } = await getSearchCars(
    searchParams.city,
    searchParams.from,
    searchParams.to,
    Number(searchParams.page) || 1
  );

  return (
    <>
      <section className="mt-5 flex flex-wrap gap-5 sm:grid sm:grid-cols-2 lg:mt-7 lg:flex lg:gap-8">
        {searchCars.map((car: any) => (
          <CarCard
            key={car.id}
            car={car}
            cardType="recommended"
            isUserLoggedIn={isUserLoggedIn}
          />
        ))}
      </section>

      {hasMoreCars && (
        <div className="mt-12 flex items-center justify-center">
          <Link
            href={handleShowMore(searchParams)}
            className="flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-center text-xs text-white lg:h-[3.5rem] lg:w-[14rem] lg:text-base"
            scroll={false}
          >
            Show more cars
          </Link>
        </div>
      )}
    </>
  );
};

export default SearchCarCards;
