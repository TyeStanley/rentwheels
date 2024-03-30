'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select';

const formSchema = z.object({
  carTitle: z.string({ required_error: 'This field is required' }),
  carType: z.string({ required_error: 'This field is required' }),
  rentPrice: z.number({ required_error: 'This field is required' }),
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
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });
  const carType = watch('carType');
  const transmission = watch('transmission');

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="my-7 w-full max-w-[426px] rounded-md bg-white p-5 dark:bg-gray850 lg:max-w-[852px]"
    >
      <h1 className="text-xl font-bold text-gray900 dark:text-white">
        Add a Car for Rent
      </h1>

      <p className="text-sm font-medium text-gray400">
        Please enter your car info
      </p>

      <h2 className="mt-5 text-lg font-bold text-primary lg:mt-7">CAR INFO</h2>

      <section className="mt-3 flex flex-col gap-5 lg:mt-5 lg:grid lg:grid-cols-2 lg:gap-8">
        <div>
          <label
            htmlFor="carTitle"
            className="text-sm font-semibold text-gray900 dark:text-white lg:text-base"
          >
            Car Title
          </label>
          <input
            id="carTitle"
            type="text"
            placeholder="Your title"
            {...register('carTitle', { required: true })}
            className="mt-1 h-[2.875rem] w-full rounded-md bg-white200 px-4 text-sm text-gray400 outline-none placeholder:text-gray400 dark:bg-gray800 dark:text-white dark:placeholder:text-white200 dark:placeholder:text-opacity-70 lg:h-[3.5rem]"
          />
          {errors.carTitle && <span>{errors.carTitle.message}</span>}
        </div>

        <div>
          <label
            htmlFor="carType"
            className="text-sm font-semibold text-gray900 dark:text-white lg:text-base"
          >
            Car Type
          </label>
          <Select
            onValueChange={(value) =>
              setValue('carType', value, { shouldValidate: true })
            }
            value={carType}
          >
            <SelectTrigger className="mt-1 h-[2.875rem] w-full rounded-md bg-white200 px-4 text-sm text-gray400 outline-none dark:bg-gray800 dark:text-white200 lg:h-[3.5rem]">
              {carType || (
                <span className="text-gray400 dark:text-white200 dark:text-opacity-70">
                  Select your car type
                </span>
              )}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Sport" className="text-gray400">
                Sport
              </SelectItem>
              <SelectItem value="SUV" className="text-gray400">
                SUV
              </SelectItem>
              <SelectItem value="Sedan" className="text-gray400">
                Sedan
              </SelectItem>
              <SelectItem value="Coupe" className="text-gray400">
                Coupe
              </SelectItem>
              <SelectItem value="Hatchback" className="text-gray400">
                Hatchback
              </SelectItem>
            </SelectContent>
          </Select>
          {errors.carType && <span>{errors.carType.message}</span>}
        </div>

        <div>
          <label
            htmlFor="rentPrice"
            className="text-sm font-semibold text-gray900 dark:text-white lg:text-base"
          >
            Rent Price
          </label>
          <input
            id="rentPrice"
            type="number"
            placeholder="Price in dollars"
            {...register('rentPrice', {
              required: true,
              valueAsNumber: true,
            })}
            className="mt-1 h-[2.875rem] w-full rounded-md bg-white200 px-4 text-sm text-gray400 outline-none placeholder:text-gray400 dark:bg-gray800 dark:text-white dark:placeholder:text-white200 dark:placeholder:text-opacity-70 lg:h-[3.5rem]"
          />
          {errors.rentPrice && <span>{errors.rentPrice.message}</span>}
        </div>

        <div>
          <label
            htmlFor="capacity"
            className="text-sm font-semibold text-gray900 dark:text-white lg:text-base"
          >
            Capacity
          </label>
          <input
            id="capacity"
            type="number"
            placeholder="Capacity in persons"
            {...register('capacity', { required: true, valueAsNumber: true })}
            className="mt-1 h-[2.875rem] w-full rounded-md bg-white200 px-4 text-sm text-gray400 outline-none placeholder:text-gray400 dark:bg-gray800 dark:text-white dark:placeholder:text-white200 dark:placeholder:text-opacity-70 lg:h-[3.5rem]"
          />
          {errors.capacity && <span>{errors.capacity.message}</span>}
        </div>

        <div>
          <label
            htmlFor="transmission"
            className="text-sm font-semibold text-gray900 dark:text-white lg:text-base"
          >
            Transmission
          </label>
          <Select
            onValueChange={(value) =>
              setValue('transmission', value, { shouldValidate: true })
            }
            value={transmission}
          >
            <SelectTrigger className="mt-1 h-[2.875rem] w-full rounded-md bg-white200 px-4 text-sm text-gray400 outline-none dark:bg-gray800 dark:text-white200 lg:h-[3.5rem]">
              {transmission || (
                <span className="text-gray400 dark:text-white200 dark:text-opacity-70">
                  Select your transmission
                </span>
              )}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Automatic" className="text-gray400">
                Automatic
              </SelectItem>
              <SelectItem value="Manual" className="text-gray400">
                Manual
              </SelectItem>
            </SelectContent>
          </Select>
          {errors.transmission && <span>{errors.transmission.message}</span>}
        </div>

        <div>
          <label
            htmlFor="location"
            className="text-sm font-semibold text-gray900 dark:text-white lg:text-base"
          >
            Location
          </label>
          <input
            id="location"
            type="text"
            placeholder="Your city"
            {...register('location', { required: true })}
            className="mt-1 h-[2.875rem] w-full rounded-md bg-white200 px-4 text-sm text-gray400 outline-none placeholder:text-gray400 dark:bg-gray800 dark:text-white dark:placeholder:text-white200 dark:placeholder:text-opacity-70 lg:h-[3.5rem]"
          />
          {errors.location && <span>{errors.location.message}</span>}
        </div>

        <div>
          <label
            htmlFor="fuelCapacity"
            className="text-sm font-semibold text-gray900 dark:text-white lg:text-base"
          >
            Fuel Capacity
          </label>
          <input
            id="fuelCapacity"
            type="number"
            placeholder="Fuel capacity in Liters"
            {...register('fuelCapacity', {
              required: true,
              valueAsNumber: true,
            })}
            className="mt-1 h-[2.875rem] w-full rounded-md bg-white200 px-4 text-sm text-gray400 outline-none placeholder:text-gray400 dark:bg-gray800 dark:text-white dark:placeholder:text-white200 dark:placeholder:text-opacity-70 lg:h-[3.5rem]"
          />
          {errors.fuelCapacity && <span>{errors.fuelCapacity.message}</span>}
        </div>

        <div>
          <label
            htmlFor="description"
            className="text-sm font-semibold text-gray900 dark:text-white lg:text-base"
          >
            Short Description
          </label>
          <input
            id="description"
            type="text"
            placeholder="Enter a short description"
            {...register('description', { required: true })}
            className="mt-1 h-[2.875rem] w-full rounded-md bg-white200 px-4 text-sm text-gray400 outline-none placeholder:text-gray400 dark:bg-gray800 dark:text-white dark:placeholder:text-white200 dark:placeholder:text-opacity-70 lg:h-[3.5rem]"
          />
          {errors.description && <span>{errors.description.message}</span>}
        </div>
      </section>

      <h3 className="mt-5">Upload Images</h3>

      <button type="submit">Register Car</button>
    </form>
  );
};

export default CarForm;
