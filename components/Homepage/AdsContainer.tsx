import Image from 'next/image';

const AdsContainer = () => {
  return (
    <section className="relative flex w-full justify-center gap-5">
      <Image
        src="/homepage/mobile_ad1.svg"
        alt="ads"
        width={327}
        height={232}
        className="w-full lg:hidden"
      />

      <Image
        src="/homepage/tablet_ad1.svg"
        alt="ads"
        width={471}
        height={360}
        className="hidden w-full lg:block xl:hidden"
      />

      <Image
        src="/homepage/tablet_ad2.svg"
        alt="ads"
        width={471}
        height={360}
        className="hidden w-full lg:block xl:hidden"
      />

      <Image
        src="/homepage/desktop_ad1.svg"
        alt="ads"
        width={640}
        height={360}
        className="hidden w-full xl:block"
      />

      <Image
        src="/homepage/desktop_ad2.svg"
        alt="ads"
        width={640}
        height={360}
        className="hidden w-full xl:block"
      />
    </section>
  );
};

export default AdsContainer;
