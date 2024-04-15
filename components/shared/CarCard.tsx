'use client';

import Image from 'next/image';

import SignInForm from '@/components/Navbar/SignInForm';
import SignUpForm from '@/components/Navbar/SignUpForm';
import HeartInteraction from '@/components/shared/HeartInteraction';
import CarCardModal from '@/components/shared/CarCardModal';
import SteeringWheel from '@/components/icons/SteeringWheel';
import Button from '@/components/ui/button';
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { FullCarData } from '@/types';

interface CarCardProps {
  car: FullCarData;
  cardType: 'popular' | 'recommended';
  isUserLoggedIn: boolean;
  myCars?: boolean;
}

const CarCard = ({ car, cardType, isUserLoggedIn, myCars }: CarCardProps) => {
  const {
    id,
    title,
    type,
    rentPrice,
    capacity,
    transmission,
    fuelCapacity,
    images,
    isCarLiked,
  } = car;

  return (
    <CardContainer
      className={cardType === 'popular' ? 'min-w-[15rem] py-2.5' : 'w-full'}
    >
      <CardBody
        className={cn(
          'rounded-xl group/card bg-white p-4 dark:bg-gray850 lg:max-w-[19rem] lg:p-6 ',
          cardType === 'popular'
            ? 'lg:min-w-[19rem]'
            : 'w-full hover:shadow-2xl hover:shadow-gray400/[0.1]'
        )}
      >
        <CardItem translateZ="50" className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h4 className="line-clamp-1 font-bold text-gray900 dark:text-white lg:text-xl">
              {title}
            </h4>
            <p className="text-xs font-medium text-gray400 lg:text-sm">
              {type}
            </p>
          </div>

          <HeartInteraction
            carId={id}
            isCarLiked={isCarLiked ?? false}
            isUserLoggedIn={isUserLoggedIn}
            myCars={myCars}
          />
        </CardItem>

        <div
          className={cn(
            'mt-4 flex gap-4',
            cardType === 'popular' ? 'flex-col' : 'lg:flex-col'
          )}
        >
          <CardItem
            translateZ="100"
            className="relative h-[10rem] w-full rounded-lg bg-primary"
          >
            <Image
              src={images[0]?.url ?? '/shared/car_placeholder.svg'}
              blurDataURL={
                images[0]?.blurDataURL ?? '/shared/car_placeholder.svg'
              }
              placeholder="blur"
              fill
              alt="Car Display"
              className="rounded-lg object-cover hover:shadow-gray400/[0.1] group-hover/card:shadow-xl"
            />
          </CardItem>

          <CardItem
            translateZ="50"
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
          </CardItem>
        </div>

        <CardItem
          translateZ="50"
          className="mt-8 flex items-center justify-between"
        >
          <div>
            <span className="font-bold text-gray900 dark:text-white lg:text-xl">
              ${rentPrice}/
            </span>{' '}
            <span className="text-xs font-bold text-gray400 lg:text-sm">
              day
            </span>
          </div>

          {isUserLoggedIn ? (
            <CarCardModal car={car} />
          ) : (
            <Dialog>
              <DialogTrigger>
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
        </CardItem>
      </CardBody>
    </CardContainer>
  );
};

export default CarCard;
