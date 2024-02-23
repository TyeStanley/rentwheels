import AdsContainer from '@/components/Homepage/AdsContainer';
import HomeContent from '@/components/Homepage/HomeContent';

export default function Home() {
  return (
    <main className="bg-white200 dark:bg-gray900">
      <div className="mx-auto px-6 py-8 lg:max-w-[1024px] xl:max-w-[1440px] xl:px-16">
        <AdsContainer />

        <HomeContent />
      </div>
    </main>
  );
}
