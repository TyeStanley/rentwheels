import CarCard from '@/components/shared/CarCard';
import { getPopularCars } from '@/lib/actions/car.actions';
import { Car } from '@prisma/client';

const PopularCarCards = async ({
  isUserLoggedIn,
}: {
  isUserLoggedIn: boolean;
}) => {
  const popularCars = (await getPopularCars()) as Car[];

  return (
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
  );
};

export default PopularCarCards;
