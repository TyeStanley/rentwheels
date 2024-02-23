import Image from 'next/image';

import SteeringWheel from '@/components/icons/SteeringWheel';
import Button from '@/components/ui/button';
import { cn } from '@/lib/utils';

const CarCard = ({ cardType }: { cardType: 'popular' | 'recommended' }) => {
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
            All New Rush
          </h4>
          <p className="text-xs font-medium text-gray400 lg:text-sm">SUV</p>
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
        <div className="relative h-[10rem] w-full rounded-lg bg-red-500">
          <Image
            src="/homepage/mobile_ad1.svg"
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
              80L
            </span>
          </section>

          <section className="relative flex items-center justify-center gap-1">
            <SteeringWheel />

            <span className="text-xs font-medium text-gray400 lg:text-sm">
              Manual
            </span>
          </section>

          <section className="relative flex items-center justify-center gap-1">
            <div className="relative size-3.5 lg:size-6">
              <Image src="/shared/profile_user.svg" alt="People" fill />
            </div>

            <span className="whitespace-nowrap text-xs font-medium text-gray400 lg:text-sm">
              16 People
            </span>
          </section>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div>
          <span className="font-bold text-gray900 dark:text-white lg:text-xl">
            $80.00/
          </span>{' '}
          <span className="text-xs font-bold text-gray400 lg:text-sm">day</span>
        </div>

        <Button variant="carCard">More info</Button>
      </div>
    </section>
  );
};

export default CarCard;
