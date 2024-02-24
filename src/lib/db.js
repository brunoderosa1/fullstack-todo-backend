import { PrismaClient } from '@prisma/client';

let prismaPromise;

export const getPrismaClient = async () => {
  if (!prismaPromise) {
    prismaPromise = new Promise(async (resolve, reject) => {
      try {
        const client = new PrismaClient();
        await client.$connect();
        resolve(client);
      } catch (error) {
        reject(error);
      }
    });
  }

  return prismaPromise;
};
