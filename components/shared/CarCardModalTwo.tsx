'use client';

import Image from 'next/image';
import { useState } from 'react';

import Cross from '@/components/icons/Cross';
import ArrowDown from '@/components/icons/ArrowDown';
import { DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const CarCardModalTwo = () => {
  const [address, setAddress] = useState('');
  const [pickupDate, setPickupDate] = useState<Date | null>(null);
  const [dropoffDate, setDropoffDate] = useState<Date | null>(null);

  const [pickupTime, setPickupTime] = useState('');
  const [dropoffTime, setDropoffTime] = useState('');

  return (
    <>
      <section className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-bold text-gray900 dark:text-white lg:text-xl">
            Add Pickup & Drop-Off Info
          </h1>
          <p className="text-sm font-medium text-gray400">
            Please enter your info
          </p>
        </div>
        <DialogClose>
          <Cross />
        </DialogClose>
      </section>

      <label
        htmlFor="pickup-location"
        className="mt-7 flex items-center gap-2 text-sm font-semibold text-gray900 dark:text-white lg:text-base"
      >
        <Image
          src="/shared/location_dot.svg"
          alt="location"
          width={16}
          height={16}
        />
        Pick-up Location
      </label>

      <input
        id="pickup-location"
        type="text"
        placeholder="Location Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="h-[2.875rem] w-full rounded-md bg-white200 px-4 text-xs text-gray400 outline-none dark:bg-gray800 dark:text-white200 lg:h-[3.5rem] lg:text-sm"
      />

      <section className="mt-5 flex items-center gap-4">
        <div className="flex w-1/2 flex-col gap-3">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-gray900 dark:text-white lg:text-base">
            <Image
              src="/shared/calendar.svg"
              alt="location"
              width={16}
              height={16}
            />
            Pick-Up Date
          </h2>
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex h-[2.625rem] w-full items-center justify-between rounded-md bg-white200 px-4 text-left text-xs text-gray400 dark:bg-gray800 dark:text-white200 lg:h-[3.5rem] lg:text-sm">
                {pickupDate
                  ? new Date(pickupDate).toLocaleDateString()
                  : 'Select your date'}

                <ArrowDown />
              </button>
            </PopoverTrigger>
            <PopoverContent className="p-1">
              <Calendar
                mode="single"
                disabled={(date) => {
                  const today = new Date(new Date().setHours(0, 0, 0, 0));
                  const returnDate = dropoffDate
                    ? new Date(dropoffDate.setHours(0, 0, 0, 0))
                    : null;
                  return (
                    date < today || (returnDate ? date >= returnDate : false)
                  );
                }}
                selected={pickupDate || undefined}
                onSelect={(date) => setPickupDate(date || null)}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex w-1/2 flex-col gap-3">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-gray900 dark:text-white lg:text-base">
            <Image
              src="/shared/clock.svg"
              alt="location"
              width={16}
              height={16}
            />
            Pick-Up Time
          </h2>
          <Select value={pickupTime} onValueChange={setPickupTime}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select your time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7am">07:00AM</SelectItem>
              <SelectItem value="8am">08:00AM</SelectItem>
              <SelectItem value="9am">09:00AM</SelectItem>
              <SelectItem value="10am">10:00AM</SelectItem>
              <SelectItem value="11am">11:00AM</SelectItem>
              <SelectItem value="12pm">12:00PM</SelectItem>
              <SelectItem value="1pm">01:00PM</SelectItem>
              <SelectItem value="2pm">02:00PM</SelectItem>
              <SelectItem value="3pm">03:00PM</SelectItem>
              <SelectItem value="4pm">04:00PM</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      <section className="mt-5 flex items-center gap-4">
        <div className="flex w-1/2 flex-col gap-3">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-gray900 dark:text-white lg:text-base">
            <Image
              src="/shared/calendar.svg"
              alt="location"
              width={16}
              height={16}
            />
            Drop-Off Date
          </h2>
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex h-[2.625rem] w-full items-center justify-between rounded-md bg-white200 px-4 text-left text-xs text-gray400 dark:bg-gray800 dark:text-white200 lg:h-[3.5rem] lg:text-sm">
                {dropoffDate
                  ? new Date(dropoffDate).toLocaleDateString()
                  : 'Select your date'}

                <ArrowDown />
              </button>
            </PopoverTrigger>
            <PopoverContent className="p-1">
              <Calendar
                mode="single"
                disabled={(date) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const fromDate = pickupDate ? new Date(pickupDate) : null;
                  return (
                    date <= today || (fromDate && date <= fromDate) || false
                  );
                }}
                selected={dropoffDate || undefined}
                onSelect={(date) => setDropoffDate(date || null)}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex w-1/2 flex-col gap-3">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-gray900 dark:text-white lg:text-base">
            <Image
              src="/shared/clock.svg"
              alt="location"
              width={16}
              height={16}
            />
            Drop-Off Time
          </h2>
          <Select value={dropoffTime} onValueChange={setDropoffTime}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select your time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7am">07:00AM</SelectItem>
              <SelectItem value="8am">08:00AM</SelectItem>
              <SelectItem value="9am">09:00AM</SelectItem>
              <SelectItem value="10am">10:00AM</SelectItem>
              <SelectItem value="11am">11:00AM</SelectItem>
              <SelectItem value="12pm">12:00PM</SelectItem>
              <SelectItem value="1pm">01:00PM</SelectItem>
              <SelectItem value="2pm">02:00PM</SelectItem>
              <SelectItem value="3pm">03:00PM</SelectItem>
              <SelectItem value="4pm">04:00PM</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      <Button
        variant="primary"
        className="mt-5 flex h-[3.5rem] justify-center font-bold"
      >
        Rent Now
      </Button>
    </>
  );
};

export default CarCardModalTwo;
