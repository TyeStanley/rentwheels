'use client';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@radix-ui/react-popover';
import Filter from '@/components/icons/Filter';
import React from 'react';
import Magnifier from '../icons/Magnifier';

const SearchFilter = () => {
  return (
    <section className="relative bottom-px flex items-center gap-4 bg-white px-6 pb-8 dark:bg-gray900">
      <div className="flex h-12 w-full items-center gap-3 rounded-lg border border-ps50 bg-white px-3 dark:border-gray800 dark:bg-gray850">
        <Magnifier />
        <input
          type="text"
          placeholder="Search something here"
          className="w-full bg-transparent text-sm font-medium text-gray700 outline-none dark:text-ps100"
        />
      </div>
      <Popover>
        <PopoverTrigger>
          <button className="flex aspect-square h-12 items-center justify-center rounded-lg border border-[#C3D4E9]/40 dark:border-gray800 dark:bg-gray900">
            <Filter />
          </button>
        </PopoverTrigger>
        <PopoverContent></PopoverContent>
      </Popover>
    </section>
  );
};

export default SearchFilter;
