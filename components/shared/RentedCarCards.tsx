import CarCard from '@/components/shared/CarCard';
import { getRentedCars } from '@/lib/actions/car.actions';

const RentedCarCards = async ({
  isUserLoggedIn,
}: {
  isUserLoggedIn: boolean;
}) => {
  const cars = await getRentedCars();

  if (cars.length === 0) {
    return (
      <p className="mt-8 animate-pulse text-center text-lg font-bold text-primary lg:text-xl">
        You haven&apos;t rented any cars yet.
      </p>
    );
  }
  return (
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
  );
};

export default RentedCarCards;
