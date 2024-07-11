import { Client } from "pg";
import * as dotenv from 'dotenv';
dotenv.config();

const connectionString = "" || process.env.URI; // paste .env in /dist as well
const client = new Client({ connectionString });

interface User {
  id: number;
  username: string;
  email: string;
  password?: string;
  created_at: Date;
}

async function createUsersTable() {
  const result = await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `);
  console.log(result);
}

async function createUser(
  username: string,
  email: string,
  password: string
): Promise<User> {
  try {
    const result = await client.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email, created_at",
      [username, email, password]
    );

    return result.rows[0] as User;
  } catch (error) {
    console.error("Error creating user: ", error);
    throw error;
  }
}

async function getUsers(): Promise<User[]> {
  try {
    const result = await client.query(
      "SELECT id, username, email, created_at from users"
    );
    return result.rows as User[];
  } catch (error) {
    console.error("Error getting users: ", error);
    throw error;
  }
}

async function getUserById(id: number): Promise<User | undefined> {
  try {
    const result = await client.query(
      "SELECT id, username, email, created_at FROM users WHERE id = $1",
      [id]
    );
    return result.rows[0] as User;
  } catch (error) {
    console.error("Error getting user by ID:", error);
    throw error;
  }
}

async function updateUser(
  id: number,
  username: string,
  email: string,
  password?: string
): Promise<User | undefined> {
  try {
    let query = "UPDATE users SET username = $1, email = $2";
    const values: (string | number)[] = [username, email];

    if (password) {
      query += ", password = $3";
      values.push(password);
    }

    query += " WHERE id = $" + (values.length + 1) + " RETURNING id, username, email, created_at";
    values.push(id);

    const result = await client.query(query, values);
    return result.rows[0] as User;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}


async function deleteUser(id: number): Promise<User | undefined> {
  try {
    const result = await client.query(
      "DELETE FROM users WHERE id = $1 RETURNING id, username, email, created_at",
      [id]
    );

    return result.rows[0] as User;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}

async function main() {
  try {
    await client.connect(); // Connect once
    console.log("Connected to PostgreSQL !");

    // for (let i = 1; i <= 10; i++) {
    //   const newUser = await createUser(
    //     `user${i}`,
    //     `user${i}@example.com`,
    //     `password${i}`
    //   );
    //   console.log(`Created user ${i}:`, newUser);
    // }

    // const updatedUser = await updateUser(2, "updateduser2", "user2.updated@example.com", "newpassword2"); 
    // console.log("\nUpdated user:", updatedUser);

    //  const deletedUser = await deleteUser(5);
    // console.log("\nDeleted user:", deletedUser);

    // const getOne = await getUserById(3);
    // console.log("\n User with id:", getOne);

    // const allUsers = await getUsers();
    // console.log("\nAll users:", allUsers);

    await client.end();
    console.log("Disconnected from PostgreSQL");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();