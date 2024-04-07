'use server';

import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { CreateUserType } from '@/types';
import { Role } from '@prisma/client';

export async function createUser({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}): Promise<CreateUserType> {
  try {
    username = username.trim();
    email = email.trim();

    const errors = {
      username: '',
      email: '',
      password: '',
    } as CreateUserType['errors'];

    let usernameExists;

    switch (true) {
      case username.length < 3 || username.length > 12:
        errors.username = 'Username must be between 3 and 12 characters';
        break;
      case /[^a-zA-Z0-9]/.test(username):
        errors.username = 'Username must only contain alphanumeric characters';
        break;
      default:
        usernameExists = await prisma.user.findMany({
          where: {
            username: {
              equals: username,
              mode: 'insensitive',
            },
          },
        });
        if (usernameExists.length !== 0)
          errors.username = 'Username already exists';
        break;
    }

    let emailExists;

    switch (true) {
      case !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email):
        errors.email = 'Invalid email address';
        break;
      default:
        emailExists = await prisma.user.findMany({
          where: {
            email: {
              equals: email,
              mode: 'insensitive',
            },
          },
        });
        if (emailExists.length !== 0) errors.email = 'Email already exists';
        break;
    }

    switch (true) {
      case password.length < 8 || password.length > 20:
        errors.password = 'Password must be between 8 and 20 characters';
        break;
      case !/[A-Z]/.test(password):
        errors.password = 'Password must contain at least one uppercase letter';
        break;
      case !/[a-z]/.test(password):
        errors.password = 'Password must contain at least one lowercase letter';
        break;
      case !/[0-9]/.test(password):
        errors.password = 'Password must contain at least one number';
        break;
    }

    if (errors.username || errors.email || errors.password) return { errors };

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        picture:
          'https://utfs.io/f/6a1de278-2231-478b-9f65-4545f6ffbba7-tgyw60.jpg',
        pictureKey: '0',
        coverImage:
          'https://utfs.io/f/4a9a4f38-90ef-4185-9d1a-f8e8f92794c3-4q9otq.jpg',
        coverImageKey: '0',
        role: 'Renter',
      },
    });

    return { created: true, errors };
  } catch (error) {
    console.error(error);
    throw new Error(
      'An error occurred while creating the user. Please try again.'
    );
  }
}

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await prisma.user.findMany({
    where: {
      email: {
        equals: email,
        mode: 'insensitive',
      },
    },
  });

  if (user.length === 0) return { error: "Email or Password doesn't match" };

  const valid = await bcrypt.compare(password, user[0].password);

  if (!valid) return { error: "Email or Password doesn't match" };

  const token = jwt.sign(
    { id: user[0].id, email: user[0].email },
    process.env.JWT_SECRET as string
  );

  const sevenDays = 1000 * 60 * 60 * 24 * 7;

  cookies().set('token', token, {
    expires: Date.now() + sevenDays,
    httpOnly: true,
  });

  return { username: user[0].username };
}

export async function logoutUser() {
  try {
    cookies().delete('token');
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while logging out');
  }
}

export async function verifyUser(): Promise<{
  id: string | null;
  isUserLoggedIn: boolean;
}> {
  try {
    const token = cookies().get('token');

    if (!token || !token.value) return { id: null, isUserLoggedIn: false };

    const { id } = jwt.verify(
      token.value,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    return { id, isUserLoggedIn: true };
  } catch (error) {
    console.error(`An error occurred while verifying the user: ${error}`);
    return { id: null, isUserLoggedIn: false };
  }
}

export interface GetUserMenuType {
  username: string;
  picture: string;
}

export async function getUserMenu(): Promise<GetUserMenuType> {
  try {
    const { id, isUserLoggedIn } = await verifyUser();

    if (!id || !isUserLoggedIn) return { username: '', picture: '' };

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        username: true,
        picture: true,
      },
    });

    if (!user) return { username: '', picture: '' };

    return user;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while getting the user');
  }
}

export async function getUserProfile(userId: string): Promise<{
  username: string;
  picture: string;
  pictureKey: string;
  coverImage: string;
  coverImageKey: string;
  role: Role;
} | null> {
  try {
    const { id, isUserLoggedIn } = await verifyUser();

    if (!id || !isUserLoggedIn) return null;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        username: true,
        picture: true,
        pictureKey: true,
        coverImage: true,
        coverImageKey: true,
        role: true,
      },
    });

    return user;
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while getting the user');
  }
}

export async function updateUserProfile({
  username,
  picture,
  pictureKey,
  role,
}: {
  username: string;
  picture: string;
  pictureKey: string;
  role: Role;
}) {
  try {
    const { id } = await verifyUser();

    if (!id) return;

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        username,
        picture,
        pictureKey,
        role,
      },
    });

    return { username, picture, role };
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while updating the user');
  }
}

export async function updateCoverImage({
  coverImage,
  coverImageKey,
}: {
  coverImage: string;
  coverImageKey: string;
}): Promise<{
  coverImage: string;
  coverImageKey: string;
} | null> {
  try {
    const { id } = await verifyUser();

    if (!id) return null;

    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        coverImage,
        coverImageKey,
      },
    });

    return {
      coverImage: updatedUser.coverImage,
      coverImageKey: updatedUser.coverImageKey,
    };
  } catch (error) {
    console.error(error);
    throw new Error('An error occurred while updating the cover image');
  }
}
