import CarSearch from '@/components/shared/CarSearch';
import { getCityList } from '@/lib/actions/car.actions';
import Footer from '@/components/Footer/Footer';
import SearchFilter from '@/components/Search/SearchFilter';

const Page = async () => {
  const locationList = await getCityList();
  return (
    <main className="bg-white dark:bg-gray900">
      <div className="lg:flex">
        <SearchFilter />

        <section className="w-full bg-white200 p-5 dark:bg-[#1E2430]">
          <CarSearch locationList={locationList} />
        </section>
      </div>

      <section className="px-5 pb-5">
        <Footer />
      </section>
    </main>
  );
};

export default Page;
