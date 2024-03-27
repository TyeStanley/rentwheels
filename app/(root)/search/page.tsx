import { Suspense } from 'react';
import { redirect } from 'next/navigation';

import CarSearch from '@/components/shared/CarSearch';
import SearchFilter from '@/components/Search/SearchFilter';
import SearchCarCards from '@/components/shared/SearchCarCards';
import Footer from '@/components/Footer/Footer';
import Loader from '@/components/shared/Loader';

import { verifyUser } from '@/lib/actions/user.actions';
import { getCityList } from '@/lib/actions/car.actions';

const Page = async ({ searchParams }: any) => {
  const { isUserLoggedIn } = await verifyUser();

  if (!isUserLoggedIn) redirect('/');

  const locationList = await getCityList();

  return (
    <main className="bg-white dark:bg-gray900">
      <div className="lg:flex">
        <SearchFilter />

        <section className="w-full bg-white200 p-5 dark:bg-[#1E2430]">
          <CarSearch locationList={locationList} searchPage={true} />

          <Suspense fallback={<Loader />} key={JSON.stringify(searchParams)}>
            <SearchCarCards
              searchParams={searchParams}
              isUserLoggedIn={isUserLoggedIn}
            />
          </Suspense>
        </section>
      </div>

      <section className="px-5 pb-5">
        <Footer />
      </section>
    </main>
  );
};

export default Page;
