'use client';

import { useState } from 'react';

import CarCardModalOne from '@/components/shared/CarCardModalOne';
import CarCardModalTwo from '@/components/shared/CarCardModalTwo';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/moving-border';
import { cn } from '@/lib/utils';
import { FullCarData } from '@/types';

const CarCardModal = ({ car }: { car: FullCarData }) => {
  const [isModalTwo, setIsModalTwo] = useState(false);

  const modalOne =
    'top-[8%] p-4 dark:shadow-none lg:flex lg:h-[540px] lg:w-[990px] lg:max-w-full lg:justify-between xl:w-[1054px]';

  const modalTwo = 'top-[8%]';

  const handleModalTwo = () => {
    setIsModalTwo(true);
  };

  return (
    <Dialog onOpenChange={() => setTimeout(() => setIsModalTwo(false), 200)}>
      <DialogTrigger>
        <Button className="inline-flex h-9 items-center whitespace-nowrap rounded bg-primary px-5 text-xs font-medium text-white transition-colors disabled:pointer-events-none disabled:bg-gray400 disabled:opacity-50 lg:h-11 lg:text-base lg:font-semibold">
          More Info
        </Button>
      </DialogTrigger>
      <DialogContent
        className={cn('bg-white', isModalTwo ? modalTwo : modalOne)}
      >
        {isModalTwo ? (
          <CarCardModalTwo carId={car.id} price={car.rentPrice} />
        ) : (
          <CarCardModalOne car={car} handleModalTwo={handleModalTwo} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CarCardModal;
