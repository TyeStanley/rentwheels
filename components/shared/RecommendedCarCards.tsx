import Link from 'next/link';

import CarCard from '@/components/shared/CarCard';
import { handleShowMore } from '@/lib/utils';
import { getCars } from '@/lib/actions/car.actions';
import { CarCardsProps } from '@/types';

const RecommendedCarCards = async ({
  searchParams,
  isUserLoggedIn,
}: CarCardsProps) => {
  const { cars, hasMore } = await getCars(searchParams);

  if (cars.length === 0) {
    return (
      <p className="mt-8 animate-pulse text-center text-lg font-bold text-primary lg:text-xl">
        No cars found.
      </p>
    );
  }

  return (
    <div className="pb-4">
      <section className="mt-5 flex flex-wrap gap-5 sm:grid sm:grid-cols-2 lg:mt-7 lg:flex lg:gap-8">
        {cars.map((car) => (
          <CarCard
            key={car.id}
            car={car}
            cardType="recommended"
            isUserLoggedIn={isUserLoggedIn}
          />
        ))}
      </section>

      {hasMore && (
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
    </div>
  );
};

export default RecommendedCarCards;
