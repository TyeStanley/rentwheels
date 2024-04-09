import { redirect } from 'next/navigation';

import CarForm from '@/components/shared/CarForm';
import { verifyUser } from '@/lib/actions/user.actions';
import { getCar } from '@/lib/actions/car.actions';

export const dynamic = 'force-dynamic';

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = await verifyUser();

  if (!id) redirect('/');

  const car = await getCar(params.id);

  return (
    <main className="bg-white200 dark:bg-gray900">
      <div className="flex items-center justify-center dark:bg-[#1E2430]">
        <CarForm car={car} isEditing={Boolean(car)} />
      </div>
    </main>
  );
};

export default Page;
