'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const formSchema = z.object({
  carTitle: z.string(),
  carType: z.string(),
  rentPrice: z.number(),
  capacity: z.number(),
  transmission: z.string(),
  location: z.string(),
  fuelCapacity: z.number(),
  description: z.string(),
});

type FormData = z.infer<typeof formSchema>;

const CarForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="my-7 w-full rounded-md bg-white p-5 dark:bg-gray850"
    >
      <div>
        <label htmlFor="name">Name</label>
        <input id="carTitle" {...register('carTitle', { required: true })} />
        {errors.carTitle && <span>This field is required</span>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register('carType', { required: true })}
        />
        {errors.carType && <span>This field is required</span>}
      </div>
      <button type="submit">Register Car</button>
    </form>
  );
};

export default CarForm;
