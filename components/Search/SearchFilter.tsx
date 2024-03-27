'use client';

import { useState, ChangeEvent } from 'react';
import { useURLQuery } from '@/lib/hooks/useURLQuery';
import Image from 'next/image';

import Filter from '@/components/icons/Filter';
import Magnifier from '@/components/icons/Magnifier';
import Cross from '@/components/icons/Cross';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { filterOptions } from '@/constants';

const SearchFilter = () => {
  const [open, setOpen] = useState(false);

  const [searchValue, setSearchValue] = useURLQuery('search', '', 500);
  const [priceValue, setPriceValue] = useURLQuery('price', '50', 200);
  const [typeValue, setTypeValue] = useURLQuery('type', '');
  const [capacityValue, setCapacityValue] = useURLQuery('capacity', '');

  const setChange = (
    e: ChangeEvent<HTMLInputElement>,
    value: string,
    setValue: (value: string) => void
  ) => {
    const array = value.split(',');
    const isChecked = e.target.checked;
    const target = e.target.id;

    if (array[0] === '') array.shift();

    if (isChecked) {
      array.push(target);
    } else {
      const index = array.indexOf(target);
      array.splice(index, 1);
    }

    const newSet = Array.from(new Set(array));
    setValue(newSet.join(','));
  };

  return (
    <section className="relative bottom-px flex items-center gap-4 bg-white px-6 pb-8 dark:bg-gray900 lg:bottom-0 lg:w-[507px] lg:flex-col lg:items-start lg:px-5 lg:pb-5 lg:pt-8">
      <h3 className="hidden text-xs font-semibold tracking-[0.015rem] text-ps100 lg:block">
        SEARCH
      </h3>
      <div className="flex h-12 w-full items-center gap-3 rounded-lg border border-ps50 bg-white px-3 dark:border-gray800 dark:bg-gray850">
        <Magnifier />
        <input
          type="text"
          placeholder="Search something here"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
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
                <label
                  key={option}
                  className="relative flex items-center gap-4"
                >
                  <input
                    className="invisible"
                    id={
                      filter.title === 'TYPE'
                        ? option.toLowerCase()
                        : option[0].toLowerCase()
                    }
                    type="checkbox"
                    checked={
                      filter.title === 'TYPE'
                        ? typeValue?.includes(option.toLowerCase())
                        : capacityValue?.includes(option[0].toLowerCase())
                    }
                    onChange={(e) =>
                      setChange(
                        e,
                        filter.title === 'TYPE' ? typeValue : capacityValue,
                        filter.title === 'TYPE'
                          ? setTypeValue
                          : setCapacityValue
                      )
                    }
                  />
                  <Image
                    src={
                      filter.title === 'TYPE'
                        ? typeValue?.includes(option.toLowerCase())
                          ? '/search/check.svg'
                          : '/search/uncheck.svg'
                        : capacityValue?.includes(option[0].toLowerCase())
                        ? '/search/check.svg'
                        : '/search/uncheck.svg'
                    }
                    alt="check box"
                    width={24}
                    height={24}
                    className="absolute left-0"
                  />
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
            min={1}
            max={100}
            step={1}
            className="mt-5"
            value={[parseInt(priceValue)]}
            onValueChange={(value) => setPriceValue(value[0].toString())}
          />

          <p className="mt-2.5 text-xl font-semibold text-gray700 dark:text-white100">
            ${priceValue}
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
                    <label
                      key={option}
                      className="relative flex items-center gap-3"
                    >
                      <input
                        className="invisible"
                        id={
                          filter.title === 'TYPE'
                            ? option.toLowerCase()
                            : option[0].toLowerCase()
                        }
                        type="checkbox"
                        checked={
                          filter.title === 'TYPE'
                            ? typeValue?.includes(option.toLowerCase())
                            : capacityValue?.includes(option[0].toLowerCase())
                        }
                        onChange={(e) =>
                          setChange(
                            e,
                            filter.title === 'TYPE' ? typeValue : capacityValue,
                            filter.title === 'TYPE'
                              ? setTypeValue
                              : setCapacityValue
                          )
                        }
                      />
                      <Image
                        src={
                          filter.title === 'TYPE'
                            ? typeValue?.includes(option.toLowerCase())
                              ? '/search/check.svg'
                              : '/search/uncheck.svg'
                            : capacityValue?.includes(option[0].toLowerCase())
                            ? '/search/check.svg'
                            : '/search/uncheck.svg'
                        }
                        alt="check box"
                        width={20}
                        height={20}
                        className="absolute left-0"
                      />
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
              min={1}
              max={100}
              step={1}
              className="mt-5"
              value={[parseInt(priceValue)]}
              onValueChange={(value) => setPriceValue(value[0].toString())}
            />

            <p className="mt-2.5 font-semibold text-gray700 dark:text-white100">
              ${priceValue}
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </section>
  );
};

export default SearchFilter;
