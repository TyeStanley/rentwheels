import Image from 'next/image';
import { Car } from '@prisma/client';

import SteeringWheel from '@/components/icons/SteeringWheel';
import Button from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import SignInForm from '../Navbar/SignInForm';
import SignUpForm from '../Navbar/SignUpForm';

interface CarCardProps {
  car: Car;
  cardType: 'popular' | 'recommended';
  isUserLoggedIn: boolean;
}

const CarCard = ({ car, cardType, isUserLoggedIn }: CarCardProps) => {
  const {
    // id,
    title,
    type,
    rentPrice,
    capacity,
    transmission,
    // location,
    fuelCapacity,
    // description,
    images,
    // userId,
  } = car;

  return (
    <section
      className={cn(
        'min-w-[15rem] rounded-xl bg-white p-4 dark:bg-gray850 lg:max-w-[19rem] lg:p-6',
        cardType === 'popular' ? 'lg:min-w-[19rem]' : 'w-full'
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <h4 className="font-bold text-gray900 dark:text-white lg:text-xl">
            {title}
          </h4>
          <p className="text-xs font-medium text-gray400 lg:text-sm">{type}</p>
        </div>

        <Image
          src="/shared/heart.svg"
          alt="Outline Heart"
          width={24}
          height={24}
        />
      </div>

      <div
        className={cn(
          'mt-4 flex gap-4',
          cardType === 'popular' ? 'flex-col' : 'lg:flex-col'
        )}
      >
        <div className="relative h-[10rem] w-full rounded-lg bg-primary">
          <Image
            src={images[0]}
            alt="Car Display"
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div
          className={cn(
            'flex w-[4.6rem] shrink-0 gap-4',
            cardType === 'popular'
              ? 'flex-row'
              : 'flex-col items-start justify-start lg:flex-row'
          )}
        >
          <section className="relative flex items-center justify-center gap-1">
            <div className="relative size-3.5 lg:size-6">
              <Image src="/shared/gas_station.svg" alt="Gas Station" fill />
            </div>

            <span className="text-xs font-medium text-gray400 lg:text-sm">
              {fuelCapacity}L
            </span>
          </section>

          <section className="relative flex items-center justify-center gap-1">
            <SteeringWheel />

            <span className="text-xs font-medium text-gray400 lg:text-sm">
              {transmission}
            </span>
          </section>

          <section className="relative flex items-center justify-center gap-1">
            <div className="relative size-3.5 lg:size-6">
              <Image src="/shared/profile_user.svg" alt="People" fill />
            </div>

            <span className="whitespace-nowrap text-xs font-medium text-gray400 lg:text-sm">
              {capacity} People
            </span>
          </section>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div>
          <span className="font-bold text-gray900 dark:text-white lg:text-xl">
            ${rentPrice}/
          </span>{' '}
          <span className="text-xs font-bold text-gray400 lg:text-sm">day</span>
        </div>

        {isUserLoggedIn ? (
          <Button variant="carCard">More info</Button>
        ) : (
          <Dialog>
            <DialogTrigger>
              {/* ! Causes Hydration Error */}
              <Button variant="carCard">More info</Button>
            </DialogTrigger>
            <DialogContent className="top-[20%]">
              <Tabs defaultValue="signin">
                <TabsList>
                  <TabsTrigger value="signin">Sign-in</TabsTrigger>
                  <TabsTrigger value="signup">Sign-up</TabsTrigger>
                </TabsList>
                <TabsContent value="signin">
                  <SignInForm />
                </TabsContent>
                <TabsContent value="signup">
                  <SignUpForm />
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  );
};

export default CarCard;
