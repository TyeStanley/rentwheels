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
      <DialogClose className="absolute right-3 top-[-21px]">
        <Cross />
      </DialogClose>

      <section>
        <div className="relative h-[14.5rem] w-full rounded-lg">
          <Image
            src={car.images[currentImage]}
            alt="Car Display"
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="mt-7 flex justify-between">
          {car.images.map((image, index) => (
            <div
              key={index}
              className="relative h-[4rem] w-[6rem] cursor-pointer rounded-lg"
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

      <section className="p-4">
        <h2 className="line-clamp-1 text-xl font-bold text-gray900 dark:text-white">
          {car.title}
        </h2>

        <p className="mt-4 line-clamp-3 text-xs text-gray700 dark:text-white200">
          {car.description}
        </p>

        <div className="mt-4 flex flex-wrap justify-between gap-4">
          <div className="flex w-[45%] justify-between">
            <span className="text-xs font-medium text-gray400">Type</span>
            <span className="text-xs font-semibold text-gray-700 dark:text-white200">
              {car.type}
            </span>
          </div>

          <div className="flex w-[45%] justify-between">
            <span className="text-xs font-medium text-gray400">Capacity</span>
            <span className="text-xs font-semibold text-gray-700 dark:text-white200">
              {car.capacity} Person
            </span>
          </div>

          <div className="flex w-[45%] justify-between">
            <span className="text-xs font-medium text-gray400">Transm.</span>
            <span className="text-xs font-semibold text-gray-700 dark:text-white200">
              {car.transmission}
            </span>
          </div>

          <div className="flex w-[45%] justify-between">
            <span className="text-xs font-medium text-gray400">Gasoline</span>
            <span className="text-xs font-semibold text-gray-700 dark:text-white200">
              {car.fuelCapacity}L
            </span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="text-xl font-bold text-gray900 dark:text-white">
            ${car.rentPrice}/<span className="text-xs text-gray400">day</span>
          </div>

          <Button variant="primary" className="text-sm">
            Rent Now
          </Button>
        </div>
      </section>
    </>
  );
};

export default CarCardModal;
