'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from '@/components/ui/dialog';
import Cross from '@/components/icons/Cross';
import { useUploadThing } from '@/lib/uploadthing';
import { useToast } from '@/components/ui/use-toast';
import { imageURLToFile } from '@/lib/utils';
import { deleteFiles } from '@/lib/actions/image.actions';
import { updateCoverImage } from '@/lib/actions/user.actions';

const EditCover = ({
  coverImage,
  coverImageKey,
}: {
  coverImage: string;
  coverImageKey: string;
}) => {
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverUrl, setCoverUrl] = useState<string>(coverImage);
  const [coverKeyState, setCoverKeyState] = useState<string>(coverImageKey);

  const [fileDrop, setFileDrop] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);

  const { toast } = useToast();

  const { startUpload } = useUploadThing('imageUploader');

  useEffect(() => {
    const convertToPictureFile = async () => {
      const file = await imageURLToFile({ imageURL: coverImage });
      setCoverFile(file);
    };

    if (coverImage) convertToPictureFile();
  }, [coverImage]);

  useEffect(() => {
    if (!coverFile) return;
    setCoverUrl(URL.createObjectURL(coverFile));
  }, [coverFile, setCoverUrl]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (acceptedFiles.length === 1 && file.type.startsWith('image')) {
        setCoverFile(file);
        setFileDrop(true);
      }
    },
    [setCoverFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleUpdateCover = async () => {
    setIsUpdating(true);
    try {
      if (!coverFile || !coverUrl) return;

      if (coverKeyState !== '0') {
        await deleteFiles([coverKeyState]);
      }
      const uploadCover = await startUpload([coverFile]);

      if (!uploadCover?.[0]?.url || !uploadCover?.[0]?.key) return;

      setCoverKeyState(uploadCover[0].key);

      await updateCoverImage({
        coverImage: uploadCover[0].url,
        coverImageKey: uploadCover[0].key,
      });

      toast({
        title: 'Cover updated',
        description: 'Your cover has been updated',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Your cover could not be updated',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <button className="relative bottom-2.5 right-2.5 h-[26px] w-[68px] rounded-md bg-white/40 text-[0.625rem] text-white dark:bg-gray850/40 lg:bottom-6 lg:right-12 lg:h-[40px] lg:w-[105px] lg:text-sm">
          Edit Cover
        </button>
      </DialogTrigger>
      <DialogContent className="top-[15%] max-w-[500px] bg-white md:p-12">
        <section className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray900 dark:text-white lg:text-xl">
              Edit Cover Image
            </h2>
            <p className="text-sm font-medium text-gray400">
              Please upload a new cover
            </p>
          </div>
          <DialogClose>
            <Cross />
          </DialogClose>
        </section>

        <h3 className="mt-3 text-sm font-semibold text-gray900 dark:text-white lg:mt-5 lg:text-base">
          Upload Image
        </h3>

        <section
          {...getRootProps()}
          className={`mt-3 flex h-[11.5rem] w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray400 ${
            isDragActive && 'border-primary'
          }`}
        >
          <input {...getInputProps()} />
          {fileDrop ? (
            <Image
              src={coverUrl}
              alt="cover"
              width={30}
              height={30}
              className="h-[7rem] w-[95%] rounded-md object-cover"
            />
          ) : (
            <Image
              src="/shared/upload.svg"
              alt="upload"
              width={30}
              height={30}
            />
          )}
          <p className="mt-2.5 text-center text-sm font-semibold text-gray700 dark:text-ps100 lg:text-base">
            Drag and drop an image, or{' '}
            <span className="text-primary">Browse</span>
          </p>
          <p className="text-center text-xs text-gray400 dark:text-white100 lg:text-sm">
            High resolution images (png, jpg, gif)
          </p>
        </section>

        <button
          className="mt-5 h-[3.5rem] w-full rounded-md bg-primary px-5 text-sm font-medium text-white"
          disabled={isUpdating}
          onClick={handleUpdateCover}
        >
          {isUpdating ? 'Updating Cover' : 'Update Cover'}
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default EditCover;
