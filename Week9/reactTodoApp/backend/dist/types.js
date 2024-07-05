"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodoSchema = exports.createTodoSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createTodoSchema = zod_1.default.object({
    title: zod_1.default.string().min(1),
    description: zod_1.default.string().min(1),
});
exports.updateTodoSchema = zod_1.default.object({
    title: zod_1.default.string().min(1).optional(),
    description: zod_1.default.string().min(1).optional(),
    completed: zod_1.default.boolean().optional(),
});
