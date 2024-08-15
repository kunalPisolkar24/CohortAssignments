"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSurveyByIdSchema = exports.createSurveySchema = void 0;
const zod_1 = require("zod");
exports.createSurveySchema = zod_1.z.object({
    title: zod_1.z.string({
        required_error: "Title is required",
        invalid_type_error: "Title must be a string",
    }).min(1, "Title cannot be empty").max(100, "Title must be 100 characters or less"),
    questions: zod_1.z.array(zod_1.z.object({
        text: zod_1.z.string({
            required_error: "Question text is required",
            invalid_type_error: "Question text must be a string",
        }).min(1, "Question text cannot be empty").max(500, "Question text must be 500 characters or less"),
        options: zod_1.z.array(zod_1.z.object({
            text: zod_1.z.string({
                required_error: "Option text is required",
                invalid_type_error: "Option text must be a string",
            }).min(1, "Option text cannot be empty").max(200, "Option text must be 200 characters or less"),
        })).min(2, "At least two options are required").max(10, "Maximum of 10 options allowed"),
    })).min(1, "At least one question is required").max(50, "Maximum of 50 questions allowed"),
});
exports.getSurveyByIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string({
            required_error: "Survey ID is required",
            invalid_type_error: "Survey ID must be a string",
        }).regex(/^\d+$/, "Survey ID must be a number"),
    }),
});
