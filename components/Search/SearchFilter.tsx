'use client';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from '@/components/ui/popover';
import Filter from '@/components/icons/Filter';
import { useState } from 'react';
import Magnifier from '@/components/icons/Magnifier';
import { filterOptions } from '@/constants';
import Cross from '../icons/Cross';
import { Slider } from '@/components/ui/slider';

const SearchFilter = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative bottom-px flex items-center gap-4 bg-white px-6 pb-8 dark:bg-gray900 lg:bottom-0 lg:flex-col lg:items-start">
      <h3 className="hidden text-xs font-semibold tracking-[0.015rem] text-ps100 lg:mt-5 lg:block">
        SEARCH
      </h3>
      <div className="flex h-12 w-full items-center gap-3 rounded-lg border border-ps50 bg-white px-3 dark:border-gray800 dark:bg-gray850">
        <Magnifier />
        <input
          type="text"
          placeholder="Search something here"
          className="w-full bg-transparent text-sm font-medium text-gray700 outline-none dark:text-ps100"
        />
      </div>

      <div className="mt-8 hidden w-full flex-col gap-8 lg:flex">
        {filterOptions.map((filter) => (
          <section key={filter.title}>
            <h3 className="relative text-xs font-semibold tracking-[0.015rem] text-ps100">
              {filter.title}
            </h3>
            <div className="mt-3 flex flex-col gap-2">
              {filter.options.map((option) => (
                <label key={option} className="flex items-center gap-1.5">
                  <input type="checkbox" className="" />
                  <span className="text-xl font-semibold text-gray700 dark:text-white100">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </section>
        ))}

        <div className="mt-0">
          <h3 className="text-xs font-semibold tracking-[0.015rem] text-ps100">
            PRICE
          </h3>

          <Slider
            defaultValue={[50]}
            min={1}
            max={100}
            step={1}
            className="mt-5"
          />

          <p className="mt-2.5 text-xl font-semibold text-gray700 dark:text-white100">
            $150
          </p>
        </div>
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <button
            className={`flex aspect-square h-12 items-center justify-center rounded-lg border dark:bg-gray900 lg:hidden ${
              open
                ? 'border-primary'
                : 'border-[#C3D4E9]/40 dark:border-gray800'
            }`}
          >
            <Filter />
          </button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-[327px] bg-white lg:hidden">
          <div className="flex flex-col gap-4">
            {filterOptions.map((filter) => (
              <section key={filter.title}>
                <h3 className="relative flex items-center justify-between text-xs font-semibold tracking-[0.015rem] text-ps100">
                  {filter.title}
                  {filter.title === 'TYPE' && (
                    <PopoverClose>
                      <Cross className="absolute right-0 top-[-5px]" />
                    </PopoverClose>
                  )}
                </h3>
                <div className="mt-3 flex flex-col gap-2">
                  {filter.options.map((option) => (
                    <label key={option} className="flex items-center gap-1.5">
                      <input type="checkbox" className="" />
                      <span className="text-base font-semibold text-gray700 dark:text-white100">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-4">
            <h3 className="text-xs font-semibold tracking-[0.015rem] text-ps100">
              PRICE
            </h3>

            <Slider
              defaultValue={[50]}
              min={1}
              max={100}
              step={1}
              className="mt-5"
            />

            <p className="mt-2.5 font-semibold text-gray700 dark:text-white100">
              $150
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </section>
  );
};

export default SearchFilter;
