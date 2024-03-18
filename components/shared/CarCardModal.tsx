'use client';

import Image from 'next/image';
import { useState } from 'react';

import { DialogClose } from '@/components/ui/dialog';
import Cross from '@/components/icons/Cross';
import { Button } from '@/components/ui/button';

import { Car } from '@prisma/client';

const CarCardModal = ({ car }: { car: Car }) => {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <>
      <DialogClose className="absolute right-3 top-[-21px] lg:hidden">
        <Cross />
      </DialogClose>

      <section className="lg:w-1/2">
        <div className="relative h-[14.5rem] w-full rounded-lg lg:h-[350px]">
          <Image
            src={car.images[currentImage]}
            alt="Car Display"
            fill
            className="rounded-lg border border-ps50 object-cover"
          />
        </div>

        <div className="mt-7 flex justify-between">
          {car.images.map((image, index) => (
            <div
              key={index}
              className="relative h-[4rem] w-[6rem] cursor-pointer rounded-lg lg:h-[8rem] lg:w-[9rem]"
              onClick={() => setCurrentImage(index)}
            >
              <Image
                src={image}
                alt="Car Display"
                fill
                className={`rounded-lg object-cover ${
                  index === currentImage ? 'border border-primary p-1' : ''
                }`}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="relative p-4 lg:flex lg:h-full lg:w-1/2 lg:flex-col lg:content-between">
        <DialogClose className="absolute right-4 top-5 hidden lg:flex">
          <Cross />
        </DialogClose>

        <h2 className="line-clamp-1 text-xl font-bold text-gray900 dark:text-white lg:text-4xl">
          {car.title}
        </h2>

        <p className="mt-4 line-clamp-3 text-xs text-gray700 dark:text-white200 lg:mt-8 lg:text-xl">
          {car.description}
        </p>

        <div className="mt-4 flex flex-wrap justify-between gap-4 lg:mt-12">
          <div className="flex w-[45%] justify-between">
            <span className="text-xs font-medium text-gray400 lg:text-xl">
              Type
            </span>
            <span className="text-xs font-semibold text-gray-700 dark:text-white200 lg:text-xl">
              {car.type}
            </span>
          </div>

          <div className="flex w-[45%] justify-between">
            <span className="text-xs font-medium text-gray400 lg:text-xl">
              Capacity
            </span>
            <span className="text-xs font-semibold text-gray-700 dark:text-white200 lg:text-xl">
              {car.capacity} Person
            </span>
          </div>

          <div className="flex w-[45%] justify-between">
            <span className="text-xs font-medium text-gray400 lg:text-xl">
              Transm.
            </span>
            <span className="text-xs font-semibold text-gray-700 dark:text-white200 lg:text-xl">
              {car.transmission}
            </span>
          </div>

          <div className="flex w-[45%] justify-between">
            <span className="text-xs font-medium text-gray400 lg:text-xl">
              Gasoline
            </span>
            <span className="text-xs font-semibold text-gray-700 dark:text-white200 lg:text-xl">
              {car.fuelCapacity}L
            </span>
          </div>
        </div>

        <div className="lg:flex lg:flex-1 lg:items-end">
          <div className="mt-6 flex items-center justify-between lg:mb-1 lg:w-full">
            <div className="text-xl font-bold text-gray900 dark:text-white lg:text-3xl">
              ${car.rentPrice}/
              <span className="text-xs text-gray400 lg:text-base">day</span>
            </div>

            <Button
              variant="primary"
              className="text-sm lg:px-12 lg:py-8 lg:text-base"
            >
              Rent Now
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default CarCardModal;
