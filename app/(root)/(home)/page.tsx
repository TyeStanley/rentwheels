import AdsContainer from '@/components/Homepage/AdsContainer';
import HomeContent from '@/components/Homepage/HomeContent';

export default function Home() {
  return (
    <main className="bg-white200 px-6 py-8 dark:bg-gray900 xl:px-16">
      <div className="mx-auto max-w-[1440px]">
        <AdsContainer />

        <HomeContent />
      </div>
    </main>
  );
}
