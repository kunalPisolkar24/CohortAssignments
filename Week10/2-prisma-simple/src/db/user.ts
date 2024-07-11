import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function createUser(username: string, password: string, name: string) {
  try {
    const user = await prisma.user.create({
      data: {username, password, name},
    });
    return user;
  } catch (error) {
    console.error("Error creating user: ", error);
    throw error;
  }    
}

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function getUser(userId: number) {
  try {
    const user = await prisma.user.findUnique({
      where: {id: userId},
    });
    return user;
  } catch (error) {
    console.error("Error getting user: ", error);
    throw error; 
  }    
}
