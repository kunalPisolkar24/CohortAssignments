import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function insertUser(username: string, password: string, firstName: string, lastName: string) {
  try {
    const user = await prisma.user.create({
      data: {username, password, firstName, lastName}
    });
    console.log("User created:", user);
    return user;
  }
  catch(error) {
    console.error("Error creating user: ", error);
    throw error;
  }
}

async function getUserById(id: number) {
  try {
    const user = await prisma.user.findUnique({
      where: {id}
    });
    console.log("User found:", user);
    return user;
  }
  catch(error) {
    console.error("Error finding user: ", error);
    throw error;
  }
}

async function getAllUsers() {
  try {
    const users = await prisma.user.findMany(); 
    console.log("All users: ", users);
    return users;
  } 
  catch(error) {
    console.error("Error fetching users: ", error);
    throw error;
  }
}

async function updateUser(id: number, data: {username?: string, password?: string, firstName?: string, lastName?: string}) {
  try {
    const updatedUser = await prisma.user.update({
      where: {id},
      data
    });
    console.log("User updated: ", updatedUser);
    return updatedUser;
  }  
  catch(error) {
    console.error("Error updating user: ", error); 
    throw error;
  }
}

async function deleteUser(id: number) {
  try {
    const deletedUser = await prisma.user.delete({
      where: {id}
    });
    console.log("User deleted: ", deletedUser); 
    return deletedUser; 
  }
  catch(error) {
    console.error("Error Deleting user: ", error);
    throw error;
  }
}

async function main() {
  console.log("Connected to db");
  
  // const newUser = await insertUser("AliceWhite", "password1", "Alice", "White");
  
   //await getUserById(1);
  // await updateUser(1, {firstName: "Johnny"});
  // await deleteUser(2);
  await getAllUsers();
  // await prisma.$disconnect();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
