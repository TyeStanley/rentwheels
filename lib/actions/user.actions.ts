'use server';

import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { createUserType } from '@/types';

export async function createUser({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}): Promise<createUserType> {
  try {
    username = username.trim();
    email = email.trim();

    const errors = {
      username: '',
      email: '',
      password: '',
    } as createUserType['errors'];

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
}

export async function verifyUser() {
  try {
    const token = cookies().get('token');

    if (!token) return {};

    const payload = jwt.verify(token.value, process.env.JWT_SECRET as string);

    return { id: (payload as JwtPayload).id };
  } catch (error) {
    console.error(error);
    return {};
  }
}
