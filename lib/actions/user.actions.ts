'use server';

import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';
// import jwt from 'jsonwebtoken';
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

// export async function loginUser({
//   email,
//   password,
// }: {
//   email: string;
//   password: string;
// }) {
//   const user = await prisma.user.findUnique({
//     where: {
//       email,
//     },
//   });

//   if (!user) throw new Error('Invalid email or password');

//   const valid = await bcrypt.compare(password, user.password);

//   if (valid) {
//     const token = jwt.sign(
//       { id: user.id, email: user.email },
//       process.env.JWT_SECRET as string
//     );
//   }
// }
