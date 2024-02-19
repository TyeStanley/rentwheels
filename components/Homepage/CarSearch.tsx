'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';

import Button from '@/components/ui/button';
import SearchNormal from '@/components/icons/SearchNormal';
import ArrowDown from '@/components/icons/ArrowDown';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';

import { locationList } from '@/constants';

const CarSearch = () => {
  const [locationOpen, setLocationOpen] = useState(false);
  const [location, setLocation] = useState('');
  const [availabilityFrom, setAvailabilityFrom] = useState<Date>();
  const [availabilityTo, setAvailabilityTo] = useState<Date>();

  return (
    <>
      <section className="mt-8 w-full rounded-xl bg-white px-3 py-5 dark:bg-gray850 lg:flex lg:items-end lg:gap-4 lg:px-4 lg:py-6 xl:px-7">
        <div className="flex flex-1 flex-col gap-3">
          <label
            htmlFor="location"
            className="flex gap-2 align-baseline text-sm font-semibold text-gray900 dark:text-white lg:text-base"
          >
            <Image
              src="/shared/location_dot.svg"
              alt="location dot"
              width="16"
              height="16"
            />
            Location
          </label>

          <Popover open={locationOpen} onOpenChange={setLocationOpen}>
            <PopoverTrigger asChild>
              <button className="flex h-[2.875rem] items-center justify-between rounded-md bg-white200 px-4 text-left text-xs text-gray400 dark:bg-gray800 dark:text-white200 lg:h-[3.5rem] lg:text-sm">
                {location
                  ? locationList.find((item) => item.value === location)?.label
                  : 'Location - Select your city'}

                <ArrowDown />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 dark:border-gray850 dark:bg-gray800">
              <Command>
                <CommandInput placeholder="Search City" />
                <CommandEmpty>No City found.</CommandEmpty>
                <CommandGroup>
                  {locationList.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      onSelect={(currentValue) => {
                        setLocation(
                          currentValue === location ? '' : currentValue
                        );
                        setLocationOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          location === item.value ? 'opacity-100' : 'opacity-0'
                        )}
                      />
                      {item.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="mt-6 flex flex-1 flex-col gap-3 lg:mt-0">
          <label
            htmlFor="availabilityFrom"
            className="flex gap-2 align-baseline text-sm font-semibold text-gray900 dark:text-white lg:text-base"
          >
            <Image
              src="/shared/calendar.svg"
              alt="location dot"
              width="16"
              height="16"
            />
            Availability from
          </label>

          <Popover>
            <PopoverTrigger asChild>
              <button className="flex h-[2.875rem] items-center justify-between rounded-md bg-white200 px-4 text-left text-xs text-gray400 dark:bg-gray800 dark:text-white200 lg:h-[3.5rem] lg:text-sm">
                {availabilityFrom
                  ? availabilityFrom.toLocaleDateString()
                  : 'Select your date'}

                <ArrowDown />
              </button>
            </PopoverTrigger>
            <PopoverContent className="p-1">
              <Calendar
                mode="single"
                selected={availabilityFrom}
                onSelect={setAvailabilityFrom}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="mt-6 flex flex-1 flex-col gap-3 lg:mt-0">
          <label
            htmlFor="availabilityTo"
            className="flex gap-2 align-baseline text-sm font-semibold text-gray900 dark:text-white lg:text-base"
          >
            <Image
              src="/shared/calendar.svg"
              alt="location dot"
              width="16"
              height="16"
            />
            Availability to
          </label>

          <Popover>
            <PopoverTrigger asChild>
              <button className="flex h-[2.875rem] items-center justify-between rounded-md bg-white200 px-4 text-left text-xs text-gray400 dark:bg-gray800 dark:text-white200 lg:h-[3.5rem] lg:text-sm">
                {availabilityTo
                  ? availabilityTo.toLocaleDateString()
                  : 'Select your date'}

                <ArrowDown />
              </button>
            </PopoverTrigger>
            <PopoverContent className="p-1">
              <Calendar
                mode="single"
                selected={availabilityTo}
                onSelect={setAvailabilityTo}
              />
            </PopoverContent>
          </Popover>
        </div>

        <Button
          variant="carSearch"
          className="hidden w-[4.6rem] items-center justify-center gap-1.5 lg:flex xl:w-[10rem]"
        >
          <SearchNormal />

          <span className="hidden xl:flex">Search</span>
        </Button>
      </section>

      <Button variant="carSearch" className="mt-5 gap-1.5 lg:hidden">
        <SearchNormal />
        Search
      </Button>
    </>
  );
};

export default CarSearch;
