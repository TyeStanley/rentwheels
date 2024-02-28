'use client';

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
import { useRouter, useSearchParams } from 'next/navigation';

const CarSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const location = searchParams.get('city');
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  function queryURL(location: string, from: Date | null, to: Date | null) {
    const locationLC = location.toLowerCase();
    const fromDate = from?.toLocaleDateString().replace(/\//g, '-');
    const toDate = to?.toLocaleDateString().replace(/\//g, '-');

    let query = '';

    if (locationLC.length !== 0) query += `?city=${locationLC}`;

    if (fromDate)
      query += (query.length !== 0 ? '&' : '?') + `from=${fromDate}`;
    if (toDate) query += (query.length !== 0 ? '&' : '?') + `to=${toDate}`;

    const baseUrl = '/';

    const finalUrl = query.length !== 0 ? `${baseUrl}${query}` : baseUrl;

    router.push(finalUrl, { scroll: false });
  }

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

          <Popover>
            <PopoverTrigger asChild>
              <button className="flex h-[2.875rem] items-center justify-between rounded-md bg-white200 px-4 text-left text-xs text-gray400 dark:bg-gray800 dark:text-white200 lg:h-[3.5rem] lg:text-sm">
                {location
                  ? locationList.find((item) => item.value === location)?.label
                  : 'Location - Select your city'}

                <ArrowDown />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search City" />
                <CommandEmpty>No City found.</CommandEmpty>
                <CommandGroup>
                  {locationList.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      onSelect={(currentValue) =>
                        queryURL(
                          currentValue === location ? '' : currentValue,
                          from ? new Date(from) : null,
                          to ? new Date(to) : null
                        )
                      }
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
                {from
                  ? new Date(from).toLocaleDateString()
                  : 'Select your date'}

                <ArrowDown />
              </button>
            </PopoverTrigger>
            <PopoverContent className="p-1">
              <Calendar
                mode="single"
                selected={from ? new Date(from) : undefined}
                onSelect={(from) =>
                  queryURL(
                    location || '',
                    from as Date,
                    to ? new Date(to) : null
                  )
                }
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
                {to ? new Date(to).toLocaleDateString() : 'Select your date'}

                <ArrowDown />
              </button>
            </PopoverTrigger>
            <PopoverContent className="p-1">
              <Calendar
                mode="single"
                selected={to ? new Date(to) : undefined}
                onSelect={(to) =>
                  queryURL(
                    location || '',
                    from ? new Date(from) : null,
                    to as Date
                  )
                }
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
