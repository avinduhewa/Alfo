import { PrismaClient } from '@prisma/client';

export const DB = new PrismaClient();

export * from './auth/auth.dao';