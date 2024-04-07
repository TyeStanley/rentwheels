'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useUploadThing } from '@/lib/uploadthing';
import { imageURLToFile } from '@/lib/utils';
import Cross from '@/components/icons/Cross';
import { useToast } from '@/components/ui/use-toast';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { deleteFiles } from '@/lib/actions/image.actions';
import { updateUserProfile } from '@/lib/actions/user.actions';

const formSchema = z.object({
  username: z.string().min(3).max(15),
  picture: z.string().url(),
  role: z.enum(['Agent', 'Renter']),
});

type FormData = z.infer<typeof formSchema>;

const EditProfile = ({
  username,
  picture,
  pictureKey,
  role,
}: {
  username: string;
  picture: string;
  pictureKey: string;
  role: 'Agent' | 'Renter';
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username,
      picture,
      role,
    },
  });
  const usernameValue = watch('username');
  const pictureValue = watch('picture');
  const roleValue = watch('role');

  const { toast } = useToast();

  const [isUpdating, setIsUpdating] = useState(false);

  const { startUpload } = useUploadThing('imageUploader');

  const [pictureFile, setPictureFile] = useState<File | null>(null);
  const [pictureKeyState, setPictureKeyState] = useState<string>(pictureKey);

  useEffect(() => {
    const convertToPictureFile = async () => {
      const file = await imageURLToFile({ imageURL: picture });
      setPictureFile(file);
    };

    if (picture) convertToPictureFile();
  }, [picture]);

  useEffect(() => {
    if (!pictureFile) return;
    setValue('picture', URL.createObjectURL(pictureFile));
  }, [pictureFile, setValue]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (acceptedFiles.length === 1 && file.type.startsWith('image')) {
        setPictureFile(file);
      }
    },
    [setPictureFile]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const onSubmit = async (data: FormData) => {
    setIsUpdating(true);
    try {
      if (!pictureFile) return;

      if (pictureKeyState !== '0') {
        await deleteFiles([pictureKeyState]);
      }
      const uploadedPicture = await startUpload([pictureFile]);

      if (!uploadedPicture?.[0]?.url || !uploadedPicture?.[0]?.key) {
        return;
      }

      setPictureKeyState(uploadedPicture[0].key);

      await updateUserProfile({
        username: data.username,
        picture: uploadedPicture[0].url,
        pictureKey: uploadedPicture[0].key,
        role: data.role,
      });

      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'An error occurred while updating your profile',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <button className="absolute bottom-5 right-2.5 flex h-[36px] w-[110px] items-center justify-center rounded-lg bg-primary text-sm text-white lg:bottom-10 lg:right-12 lg:h-[46px] lg:w-[130px]">
          Edit Profile
        </button>
      </DialogTrigger>
      <DialogContent className="top-[15%] max-w-[500px] bg-white md:p-12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray900 dark:text-white lg:text-xl">
                Edit Profile
              </h2>
              <p className="text-sm font-medium text-gray400">
                Please enter your info
              </p>
            </div>
            <DialogClose>
              <Cross />
            </DialogClose>
          </section>

          <section className="mt-7 flex items-center gap-3.5 lg:mt-9">
            <div className="relative size-[71px] lg:size-[86px]">
              <Image
                src={pictureValue}
                alt="profile"
                fill
                className="rounded-full"
              />
            </div>

            <button
              type="button"
              {...getRootProps()}
              className="h-[44px] w-[150px] rounded-md bg-white200 text-xs font-semibold text-primary dark:bg-gray800 dark:text-white lg:h-[48px] lg:w-[172px] lg:text-sm"
            >
              <input {...getInputProps()} />
              Upload new picture
            </button>
          </section>

          <div className="mt-5 flex flex-col gap-2 lg:mt-7">
            <label
              htmlFor="username"
              className="text-sm font-semibold text-gray900 dark:text-white lg:text-base"
            >
              Username
            </label>

            <input
              id="username"
              type="text"
              value={usernameValue}
              {...register('username')}
              className="h-[2.625rem] w-full rounded-md bg-white200 px-4 text-xs text-gray900 outline-none dark:bg-gray800 dark:text-white lg:h-[3.5rem] lg:text-sm"
            />
            {errors.username && (
              <p className="text-xs text-red-500">{errors.username.message}</p>
            )}
          </div>

          <div className="mt-5 flex flex-col gap-2 lg:mt-7">
            <label
              htmlFor="role"
              className="text-sm font-semibold text-gray900 dark:text-white lg:text-base"
            >
              Role
            </label>

            <Select
              onValueChange={(value) => {
                setValue('role', value as 'Agent' | 'Renter');
              }}
              value={roleValue}
            >
              <SelectTrigger className="text-gray900 lg:h-[3.5rem]">
                {roleValue}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Agent">Agent</SelectItem>
                <SelectItem value="Renter">Renter</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && (
              <span className="text-xs text-red-500">
                {errors.role.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="mt-7 h-[3.5rem] w-full rounded-md bg-primary px-5 text-sm font-medium text-white lg:mt-9"
            disabled={isUpdating}
          >
            {isUpdating ? 'Updating Profile' : 'Update Profile'}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
