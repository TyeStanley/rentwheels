import CarCard from './CarCard';
import Link from 'next/link';
import { modifySearchParams } from '@/lib/utils';
import { getRecommendedCars } from '@/lib/actions/car.actions';

const RecommendedCarCards = async ({ searchParams, isUserLoggedIn }: any) => {
  const { recommendedCars, hasMoreCars } = await getRecommendedCars(
    searchParams.city,
    searchParams.from,
    searchParams.to,
    searchParams.page
  );

  const handleShowMore = () => {
    let page = 2;

    if (searchParams.page) page = Number(searchParams.page) + 1;

    const param = modifySearchParams(searchParams, {
      page,
    });

    return '?' + param;
  };

  return (
    <>
      <section className="mt-5 flex flex-wrap gap-5 sm:grid sm:grid-cols-2 lg:flex lg:gap-8">
        {recommendedCars.map((car: any) => (
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
            href={handleShowMore()}
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

export default RecommendedCarCards;
