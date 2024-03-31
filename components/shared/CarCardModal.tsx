'use client';

import { useState } from 'react';

import CarCardModalOne from '@/components/shared/CarCardModalOne';
import CarCardModalTwo from '@/components/shared/CarCardModalTwo';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CarDetails } from '@/types';

const CarCardModal = ({ car }: { car: CarDetails }) => {
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
        <Button variant="carCard">More info</Button>
      </DialogTrigger>
      <DialogContent
        className={cn('bg-white', isModalTwo ? modalTwo : modalOne)}
      >
        {isModalTwo ? (
          <CarCardModalTwo />
        ) : (
          <CarCardModalOne car={car} handleModalTwo={handleModalTwo} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CarCardModal;
