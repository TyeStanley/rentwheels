import CarCard from '@/components/shared/CarCard';
import { getPopularCars } from '@/lib/actions/car.actions';

const PopularCarCards = async ({
  isUserLoggedIn,
}: {
  isUserLoggedIn: boolean;
}) => {
  const popularCars = await getPopularCars();

  if (popularCars.length === 0) {
    return (
      <p className="mt-8 animate-pulse text-center text-lg font-bold text-primary lg:text-xl">
        No cars found.
      </p>
    );
  }

  return (
    <section className="mt-5 flex gap-5 overflow-x-auto overflow-y-hidden lg:mt-7 lg:gap-8">
      {popularCars.map((car) => (
        <CarCard
          key={car.id}
          car={car}
          cardType="popular"
          isUserLoggedIn={isUserLoggedIn}
        />
      ))}
    </section>
  );
};

export default PopularCarCards;
