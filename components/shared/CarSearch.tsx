'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Check } from 'lucide-react';

import Button from '@/components/ui/button';
import SearchNormal from '@/components/icons/SearchNormal';
import ArrowDown from '@/components/icons/ArrowDown';
import { Calendar } from '@/components/ui/calendar';
import {
  capitalizeFirstLetterOfEachWord,
  cn,
  modifySearchParams,
} from '@/lib/utils';
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

const CarSearch = ({
  locationList,
  searchPage = false,
}: {
  locationList: { location: string | undefined }[];
  searchPage?: boolean;
}) => {
  const [location, setLocation] = useState<string>('');
  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  function handleSearch() {
    const param = modifySearchParams(searchParams.toString(), {
      city: location?.toLowerCase(),
      from: from?.replace(/\//g, '-'),
      to: to?.replace(/\//g, '-'),
    });

    router.push('?' + param, { scroll: false });
  }

  return (
    <>
      <section
        className={`w-full rounded-xl bg-white px-3 py-5 dark:bg-gray850 lg:gap-4 lg:px-4  xl:px-7 ${
          searchPage
            ? 'flex flex-wrap xl:items-end'
            : 'mt-8 lg:flex lg:items-end lg:py-6'
        }`}
      >
        <div
          className={`flex flex-1 flex-col gap-3 ${
            searchPage ? 'min-w-full xl:min-w-[unset]' : ''
          }`}
        >
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
                  ? capitalizeFirstLetterOfEachWord(
                      locationList.find(
                        (city) => city.location?.toLowerCase() === location
                      )?.location || ''
                    )
                  : 'Location - Select your city'}

                <ArrowDown />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search City" />
                <CommandEmpty>No City found.</CommandEmpty>
                <CommandGroup>
                  {locationList.map((city) => (
                    <CommandItem
                      key={city.location}
                      value={city.location}
                      onSelect={(currentValue) =>
                        setLocation(
                          currentValue === location ? '' : currentValue
                        )
                      }
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          location === city.location
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                      {capitalizeFirstLetterOfEachWord(city.location || '')}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div
          className={`mt-6 flex flex-1 flex-col gap-3 lg:mt-0 ${
            searchPage ? 'min-w-full lg:min-w-[unset]' : ''
          }`}
        >
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
                {from !== null ? from : 'Select your date'}

                <ArrowDown />
              </button>
            </PopoverTrigger>
            <PopoverContent className="p-1">
              <Calendar
                mode="single"
                disabled={(date) => {
                  const today = new Date(new Date().setHours(0, 0, 0, 0));
                  const toDate = to ? new Date(to) : null;
                  return date < today || (toDate && date >= toDate) || false;
                }}
                selected={from ? new Date(from) : undefined}
                onSelect={(from) =>
                  setFrom(from ? from.toLocaleDateString() : null)
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
                {to !== null ? to : 'Select your date'}

                <ArrowDown />
              </button>
            </PopoverTrigger>
            <PopoverContent className="p-1">
              <Calendar
                mode="single"
                disabled={(date) => {
                  const today = new Date(new Date().setHours(0, 0, 0, 0));
                  const fromDate = from ? new Date(from) : null;
                  return (
                    date <= today || (fromDate && date <= fromDate) || false
                  );
                }}
                selected={to ? new Date(to) : undefined}
                onSelect={(to) => setTo(to ? to.toLocaleDateString() : null)}
              />
            </PopoverContent>
          </Popover>
        </div>

        <Button
          variant="carSearch"
          className={`hidden items-center justify-center gap-1.5 lg:flex xl:w-[10rem] ${
            searchPage
              ? 'w-full xl:aspect-square xl:h-[3.5rem] xl:w-[unset]'
              : 'w-[4.6rem]'
          }`}
          onClick={handleSearch}
        >
          <SearchNormal />

          <span
            className={`hidden xl:flex ${searchPage && 'lg:flex xl:hidden'}`}
          >
            Search
          </span>
        </Button>
      </section>

      <Button
        variant="carSearch"
        className="mt-5 gap-1.5 lg:hidden"
        onClick={handleSearch}
      >
        <SearchNormal />
        Search
      </Button>
    </>
  );
};

export default CarSearch;
