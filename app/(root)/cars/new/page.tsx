import CarForm from '@/components/shared/CarForm';
import { verifyUser } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';

const Page = async () => {
  const { id } = await verifyUser();

  if (!id) redirect('/');

  return (
    <main className="bg-white200 dark:bg-gray900">
      <div className="flex items-center justify-center dark:bg-[#1E2430]">
        <CarForm />
      </div>
    </main>
  );
};

export default Page;
