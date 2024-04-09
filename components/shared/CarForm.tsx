'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useState, useMemo, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import Close from '@/components/icons/Close';
import { useToast } from '@/components/ui/use-toast';
import { useUploadThing } from '@/lib/uploadthing';
import { deleteFiles, getBlurData } from '@/lib/actions/image.actions';
import { createCar, deleteCar, updateCar } from '@/lib/actions/car.actions';
import { imageURLToFile } from '@/lib/utils';
import { CarImage, FullCarData } from '@/types';

const formSchema = z.object({
  carTitle: z
    .string()
    .min(1, 'Car title is required')
    .max(50, 'Car title must be under 50 characters'),
  carType: z.enum(['Sport', 'SUV', 'Sedan', 'Coupe', 'Hatchback'], {
    required_error: 'Car type is required',
  }),
  rentPrice: z
    .number({
      required_error: 'Rent price is required',
      invalid_type_error: 'Rent price must be a number',
    })
    .positive('Rent price must be a positive number')
    .int('Rent price must be an integer')
    .min(1, 'Rent price must be at least $1')
    .max(1000, 'Rent price must be under $1,000'),
  capacity: z
    .number({
      required_error: 'Capacity is required',
      invalid_type_error: 'Capacity must be a number',
    })
    .positive('Capacity must be a positive number')
    .int('Capacity must be an integer')
    .min(1, 'Capacity must be at least 1 person')
    .max(15, 'Capacity must be under 15 persons'),
  transmission: z.enum(['Automatic', 'Manual'], {
    required_error: 'Transmission type is required',
  }),
  location: z
    .string()
    .min(1, 'Location is required')
    .max(50, 'City name must be under 50 characters'),
  fuelCapacity: z
    .number({
      required_error: 'Fuel capacity is required',
      invalid_type_error: 'Fuel capacity must be a number',
    })
    .positive('Fuel capacity must be a positive number')
    .int('Fuel capacity must be an integer')
    .min(1, 'Fuel capacity must be at least 1 liter')
    .max(120, 'Fuel capacity must be under 120 liters'),
  description: z
    .string()
    .min(20, 'Description must be at least 20 characters')
    .max(250, 'Description must be under 250 characters'),
});

type FormData = z.infer<typeof formSchema>;

const CarForm = ({
  car,
  isEditing = false,
}: {
  car?: FullCarData;
  isEditing?: boolean;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      carTitle: car?.title,
      carType:
        (car?.type as 'Sport' | 'SUV' | 'Sedan' | 'Coupe' | 'Hatchback') ||
        undefined,
      rentPrice: car?.rentPrice ? Number(car.rentPrice) : undefined,
      capacity: car?.capacity ? Number(car.capacity) : undefined,
      transmission: car?.transmission,
      location: car?.location,
      fuelCapacity: car?.fuelCapacity ? Number(car.fuelCapacity) : undefined,
      description: car?.description,
    },
  });
  const carType = watch('carType');
  const transmission = watch('transmission');

  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { toast } = useToast();

  const { startUpload } = useUploadThing('imageUploader');

  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const imageUrlStrings = useMemo(() => {
    return imageFiles.map((file) => URL.createObjectURL(file));
  }, [imageFiles]);

  useEffect(() => {
    const fetchAndConvertImages = async () => {
      if (!car || !car.images) return;

      const imageAsFiles = await Promise.all(
        car.images.map(async (image) => {
          return imageURLToFile({ imageURL: image.url });
        })
      );
      const validFiles = imageAsFiles.filter(
        (file): file is File => file !== null
      );
      setImageFiles(validFiles);
    };
    fetchAndConvertImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.slice(0, 3).forEach((file) => {
        if (!file.type.startsWith('image')) return;

        if (imageUrlStrings.length >= 3) return;

        setImageFiles((prev) => [...prev, file]);
      });
    },
    [imageUrlStrings, setImageFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleImageDelete = (index: number) => {
    return () => {
      setImageFiles((prev) => prev.filter((_, i) => i !== index));
    };
  };

  const handleCarDelete = async () => {
    try {
      setIsDeleting(true);

      if (!car || !car.id) return;

      const isDeleted = await deleteCar(car.id);

      if (isDeleted) {
        toast({
          title: 'Car deleted',
          description: 'Your car has been deleted successfully',
        });

        router.push('/profile');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'An error occurred while deleting your car',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      // check if at least one image is uploaded
      if (imageFiles.length === 0) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'At least one image is required',
        });
        return;
      }

      const previousCarData = {
        title: car?.title,
        type: car?.type,
        rentPrice: car?.rentPrice,
        capacity: car?.capacity,
        transmission: car?.transmission,
        location: car?.location,
        fuelCapacity: car?.fuelCapacity,
        description: car?.description,
      };

      // formats the form data to match the car data format
      const carData = {
        title: data.carTitle,
        type: data.carType,
        rentPrice: data.rentPrice,
        capacity: data.capacity,
        transmission: data.transmission,
        location: data.location,
        fuelCapacity: data.fuelCapacity,
        description: data.description,
      };

      // Determine if there are any changes to the car details and images
      const detailsHaveChanged =
        JSON.stringify(previousCarData) !== JSON.stringify(carData);
      const imagesHaveChanged =
        imageFiles.some((image) => 'path' in image) ||
        imageFiles.length < (car?.images?.length || 0);

      // if no changes were made, return
      if (isEditing && !detailsHaveChanged && !imagesHaveChanged) {
        toast({
          title: 'No changes were made',
          description: 'Your car details are the same as the initial values',
        });
        return;
      }

      // Handle image deletion and upload
      let carImages: CarImage[] = [];
      if (isEditing) {
        if (imagesHaveChanged && car?.images) {
          const imagesToDelete = car.images.map((image) => image.key);
          await deleteFiles(imagesToDelete);
          carImages = await uploadImages(imageFiles);
        } else {
          carImages = car?.images || [];
        }
      } else if (!isEditing) {
        carImages = await uploadImages(imageFiles);
      }

      // Update or create car
      const actionResult = isEditing
        ? await updateCar({
            carData: { id: car!.id, ...carData, images: carImages },
          })
        : await createCar({ carData, carImages });

      // if successful do toast
      if (actionResult) {
        toast({
          title: `Car ${isEditing ? 'updated' : 'created'}`,
          description: `Your car has been ${
            isEditing ? 'updated' : 'created'
          } successfully`,
        });
      }

      // on editing page push to profile page
      if (isEditing) {
        router.push(`/profile`);
      } else if (!isEditing) {
        // clear the form data when creating car
        reset();
        setImageFiles([]);
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: `An error occurred while ${
          isEditing ? 'updating' : 'creating'
        } your car`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  async function uploadImages(imageFiles: File[]): Promise<CarImage[]> {
    const uploadPromises = imageFiles.map((file) => startUpload([file]));
    const uploadResults = await Promise.all(uploadPromises);
    const imagesData = await Promise.all(
      uploadResults.map(async (imgRes) => {
        if (imgRes && imgRes[0].url && imgRes[0].key) {
          const { blurDataURL } = await getBlurData(imgRes[0].url);
          return { url: imgRes[0].url, key: imgRes[0].key, blurDataURL };
        }
        return null;
      })
    );
    return imagesData.filter(Boolean) as CarImage[];
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="my-7 w-full max-w-[426px] rounded-md bg-white p-5 dark:bg-gray850 lg:max-w-[852px]"
    >
      <h1 className="text-xl font-bold text-gray900 dark:text-white">
        {isEditing ? 'Edit Car Details' : 'Add a Car for Rent'}
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
          {errors.carTitle && (
            <span className="text-sm text-red-500">
              {errors.carTitle.message}
            </span>
          )}
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
              setValue(
                'carType',
                value as 'Sport' | 'SUV' | 'Sedan' | 'Coupe' | 'Hatchback',
                { shouldValidate: true }
              )
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
          {errors.carType && (
            <span className="text-sm text-red-500">
              {errors.carType.message}
            </span>
          )}
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
          {errors.rentPrice && (
            <span className="text-sm text-red-500">
              {errors.rentPrice.message}
            </span>
          )}
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
          {errors.capacity && (
            <span className="text-sm text-red-500">
              {errors.capacity.message}
            </span>
          )}
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
              setValue('transmission', value as 'Automatic' | 'Manual', {
                shouldValidate: true,
              })
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
          {errors.transmission && (
            <span className="text-sm text-red-500">
              {errors.transmission.message}
            </span>
          )}
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
          {errors.location && (
            <span className="text-sm text-red-500">
              {errors.location.message}
            </span>
          )}
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
          {errors.fuelCapacity && (
            <span className="text-sm text-red-500">
              {errors.fuelCapacity.message}
            </span>
          )}
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
          {errors.description && (
            <span className="text-sm text-red-500">
              {errors.description.message}
            </span>
          )}
        </div>
      </section>

      <h3 className="mt-5 font-bold text-gray900 dark:text-white lg:mt-11">
        Upload Images
      </h3>

      {imageUrlStrings?.length > 0 && (
        <section className="mt-5 grid grid-cols-3 gap-5">
          {imageUrlStrings.map((image, index) => (
            <div
              key={image}
              className="relative aspect-square max-h-full rounded-md"
            >
              <button
                onClick={handleImageDelete(index)}
                className="absolute right-2 top-2 z-10 rounded-md bg-gray400"
              >
                <Close />
              </button>
              <Image
                src={image}
                alt="user uploaded image"
                fill
                className="rounded-md border border-gray400"
              />
            </div>
          ))}
        </section>
      )}

      <section
        {...getRootProps()}
        className={`mt-5 flex h-[11.5rem] w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray400 ${
          isDragActive && 'border-primary'
        }
        ${imageUrlStrings?.length === 3 && '!border-gray400 opacity-50'}`}
      >
        <input {...getInputProps()} />
        <Image src="/shared/upload.svg" alt="upload" width={30} height={30} />
        <p className="mt-2.5 text-center text-sm font-semibold text-gray700 dark:text-ps100 lg:text-base">
          Drag and drop an image, or{' '}
          <span className="text-primary">Browse</span>
        </p>
        <p className="text-center text-xs text-gray400 dark:text-white100 lg:text-sm">
          High resolution images (png, jpg, gif)
        </p>
      </section>

      <div className="mt-7 flex flex-col-reverse justify-end gap-5 lg:mt-9 lg:flex-row">
        {isEditing ? (
          <>
            <button
              type="button"
              className="flex h-[3.5rem] w-full items-center justify-center gap-1 rounded-md bg-red-500 font-bold text-white disabled:opacity-50 lg:w-[9.25rem]"
              disabled={isSubmitting}
              onClick={handleCarDelete}
            >
              {isDeleting ? (
                'Removing Car'
              ) : (
                <>
                  <Image
                    src="/shared/delete.svg"
                    alt="delete"
                    width={20}
                    height={20}
                  />
                  Remove Car
                </>
              )}
            </button>
            <button
              type="submit"
              className="h-[3.5rem] w-full rounded-md bg-primary font-bold text-white disabled:opacity-50 lg:w-[9.25rem]"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Editing Car' : 'Edit Car'}
            </button>
          </>
        ) : (
          <button
            type="submit"
            className="h-[3.5rem] w-full rounded-md bg-primary font-bold text-white disabled:opacity-50 lg:w-[9.25rem]"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering Car' : 'Register Car'}
          </button>
        )}
      </div>
    </form>
  );
};

export default CarForm;
