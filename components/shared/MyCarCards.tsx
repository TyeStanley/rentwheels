import CarCard from '@/components/shared/CarCard';
import { getMyCars } from '@/lib/actions/car.actions';

const MyCarCards = async ({ isUserLoggedIn }: { isUserLoggedIn: boolean }) => {
  const cars = await getMyCars();

  if (cars.length === 0) {
    return (
      <p className="mt-8 animate-pulse text-center text-lg font-bold text-primary lg:text-xl">
        You haven&apos;t listed any cars yet.
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
          myCars={true}
        />
      ))}
    </section>
  );
};

export default MyCarCards;
