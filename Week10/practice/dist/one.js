"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const connectionString = "" || process.env.URI; // paste .env in /dist as well
const client = new pg_1.Client({ connectionString });
function createUsersTable() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `);
        console.log(result);
    });
}
function createUser(username, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield client.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email, created_at", [username, email, password]);
            return result.rows[0];
        }
        catch (error) {
            console.error("Error creating user: ", error);
            throw error;
        }
    });
}
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield client.query("SELECT id, username, email, created_at from users");
            return result.rows;
        }
        catch (error) {
            console.error("Error getting users: ", error);
            throw error;
        }
    });
}
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield client.query("SELECT id, username, email, created_at FROM users WHERE id = $1", [id]);
            return result.rows[0];
        }
        catch (error) {
            console.error("Error getting user by ID:", error);
            throw error;
        }
    });
}
function updateUser(id, username, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let query = "UPDATE users SET username = $1, email = $2";
            const values = [username, email];
            if (password) {
                query += ", password = $3";
                values.push(password);
            }
            query += " WHERE id = $" + (values.length + 1) + " RETURNING id, username, email, created_at";
            values.push(id);
            const result = yield client.query(query, values);
            return result.rows[0];
        }
        catch (error) {
            console.error("Error updating user:", error);
            throw error;
        }
    });
}
function deleteUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield client.query("DELETE FROM users WHERE id = $1 RETURNING id, username, email, created_at", [id]);
            return result.rows[0];
        }
        catch (error) {
            console.error("Error deleting user:", error);
            throw error;
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect(); // Connect once
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
            yield client.end();
            console.log("Disconnected from PostgreSQL");
        }
        catch (error) {
            console.error("An error occurred:", error);
        }
    });
}
main();
