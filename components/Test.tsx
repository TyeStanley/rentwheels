'use client';

import { checkoutTransaction } from '@/lib/actions/transaction.actions';

const Test = () => {
  const handleClick = async () => {
    const transaction = {
      id: '1',
      price: 1000,
    };
    const res = await checkoutTransaction({ transaction });
    console.log('clicked', res);
  };
  return (
    <button className="mt-10 bg-blue-500 text-white" onClick={handleClick}>
      Test
    </button>
  );
};

export default Test;
