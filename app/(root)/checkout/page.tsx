import Image from 'next/image';
import Link from 'next/link';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const Page = ({ searchParams }: Props) => {
  return (
    <main className="bg-white200 dark:bg-gray900">
      <div className="flex items-center justify-center p-5 py-9 dark:bg-[#1E2430] lg:py-20">
        <section className="flex w-full max-w-[500px] flex-col items-center justify-center gap-10 rounded-lg bg-white p-4 py-9 dark:bg-gray850 lg:p-12">
          <p className="font-medium text-gray400 lg:text-lg">
            {searchParams.success
              ? 'Thank You For Your Purchase'
              : 'There was an error making a payment'}
          </p>

          <Image
            src={
              searchParams.success
                ? '/checkout/success.svg'
                : '/checkout/unsuccess.svg'
            }
            alt="checkout"
            width={120}
            height={120}
            className="dark:hidden"
          />

          <Image
            src={
              searchParams.success
                ? '/checkout/success-dark.svg'
                : '/checkout/unsuccess-dark.svg'
            }
            alt="checkout"
            width={120}
            height={120}
            className="hidden dark:block"
          />

          <h2 className="text-2xl font-bold text-gray900 dark:text-white lg:text-3xl">
            {searchParams.success
              ? 'Payment Successful'
              : 'Payment Unsuccessful'}
          </h2>

          <Link
            href="/profile"
            className="flex w-full items-center justify-center rounded-md bg-primary p-4 text-center font-bold text-white"
          >
            {searchParams.success ? 'View Rented Car' : 'Try Again'}
          </Link>

          <p className="font-medium text-gray400 lg:text-lg">
            {searchParams.success
              ? 'Receipt will be sent to your email'
              : 'Go Back'}
          </p>
        </section>
      </div>
    </main>
  );
};

export default Page;
