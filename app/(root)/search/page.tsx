import { Suspense } from 'react';
import { redirect } from 'next/navigation';

import CarSearch from '@/components/shared/CarSearch';
import SearchFilter from '@/components/Search/SearchFilter';
import SearchCarCards from '@/components/shared/SearchCarCards';
import Footer from '@/components/Footer/Footer';
import Loader from '@/components/shared/Loader';

import { verifyUser } from '@/lib/actions/user.actions';
import { getCityList, getMaxPrice } from '@/lib/actions/car.actions';

const Page = async ({ searchParams }: any) => {
  const { isUserLoggedIn } = await verifyUser();

  if (!isUserLoggedIn) redirect('/');

  const locationList = await getCityList();

  const maxPrice = await getMaxPrice();

  return (
    <main className="bg-white dark:bg-gray900">
      <div className="mx-auto lg:flex lg:max-w-[1024px] xl:max-w-[1440px]">
        <SearchFilter maxPrice={maxPrice} />

        <section className="w-full bg-white200 p-5 pb-10 dark:bg-[#1E2430] lg:relative lg:bottom-[-1px] lg:pt-8 xl:px-9">
          <CarSearch locationList={locationList} searchPage={true} />

          <Suspense fallback={<Loader />} key={JSON.stringify(searchParams)}>
            <SearchCarCards
              searchParams={searchParams}
              isUserLoggedIn={isUserLoggedIn}
            />
          </Suspense>
        </section>
      </div>

      <section className="mx-auto px-5 pb-5 lg:max-w-[1024px] xl:max-w-[1440px] xl:px-9">
        <Footer />
      </section>
    </main>
  );
};

export default Page;
