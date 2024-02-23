import Logo from '@/components/icons/Logo';

const Footer = () => {
  return (
    <>
      <article className="mt-5 flex flex-col justify-between lg:flex-row lg:py-[4.5rem]">
        <section className="flex flex-col gap-4">
          <Logo className="h-10 w-32 lg:h-12 lg:w-40" />

          <div className="text-sm text-gray400 dark:text-white200 lg:text-base">
            <p>Our vision is to provide convenience</p>
            <p>and help increase your sales business.</p>
          </div>
        </section>

        <section className="mt-12 flex flex-wrap justify-between gap-5 font-medium text-gray400 dark:text-white200 lg:mt-0 xl:gap-12">
          <div className="flex flex-col gap-1.5 lg:w-[9.5rem]">
            <h4 className="mb-4 text-xl font-semibold text-gray800 dark:text-white100 lg:mb-6">
              About
            </h4>
            <p>How it works</p>
            <p>Featured</p>
            <p>Partnership</p>
            <p>Business Relation</p>
          </div>
          <div className="flex flex-col gap-1.5 lg:w-[9.5rem]">
            <h4 className="mb-4 text-xl font-semibold text-gray800 dark:text-white100 lg:mb-6">
              Community
            </h4>
            <p>Events</p>
            <p>Blog</p>
            <p>Podcast</p>
            <p>Invite a friend</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <h4 className="mb-4 text-xl font-semibold text-gray800 dark:text-white100 lg:mb-6">
              Socials
            </h4>
            <p>Discord</p>
            <p>Instagram</p>
            <p>Twitter</p>
            <p>Facebook</p>
          </div>
        </section>
      </article>

      <article className="mt-12 flex flex-col-reverse text-sm font-semibold text-gray800 dark:text-white100 lg:mt-0 lg:flex-row lg:justify-between lg:border-t lg:border-ps50 lg:py-10 lg:text-base lg:dark:border-gray850">
        <h4 className="mt-8 lg:mt-0">©2024 RENTWHEELS. All rights reserved.</h4>

        <section className="flex justify-between gap-5">
          <p>Privacy Policy</p>
          <p>Terms & Conditions</p>
        </section>
      </article>
    </>
  );
};

export default Footer;
