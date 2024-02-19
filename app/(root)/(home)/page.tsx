import AdsContainer from '@/components/Homepage/AdsContainer';
import CarSearch from '@/components/Homepage/CarSearch';

export default function Home() {
  return (
    <main className="bg-white200 px-6 py-8 dark:bg-gray900 xl:px-16">
      <div className="mx-auto max-w-[1440px]">
        <AdsContainer />

        <CarSearch />
      </div>
    </main>
  );
}
