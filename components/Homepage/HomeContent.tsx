'use client';

import React from 'react';
import Link from 'next/link';

import CarSearch from '@/components/shared/CarSearch';
import CarCard from '@/components/shared/CarCard';

const HomeContent = () => {
  return (
    <>
      <CarSearch />

      <section className="mt-12 flex items-end justify-between lg:mt-10">
        <p className="text-sm font-semibold text-gray400 lg:px-5 lg:text-base">
          Popular cars
        </p>

        <Link
          // ! Link to car search page
          href="/"
          className="text-xs font-semibold text-primary lg:px-5 lg:text-base"
        >
          View All
        </Link>
      </section>

      <section className="mt-5 flex gap-5 overflow-x-auto lg:mt-7 lg:gap-8">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <CarCard key={i} cardType="popular" />
          ))}
      </section>

      <p className="mt-8 text-sm font-semibold text-gray400 lg:mt-10 lg:px-5 lg:text-base">
        Recommended cars
      </p>

      <section className="mt-5 flex flex-wrap gap-5 sm:grid sm:grid-cols-2 lg:flex lg:gap-8">
        {Array(17)
          .fill(0)
          .map((_, i) => (
            <CarCard key={i} cardType="recommended" />
          ))}
      </section>
    </>
  );
};

export default HomeContent;
