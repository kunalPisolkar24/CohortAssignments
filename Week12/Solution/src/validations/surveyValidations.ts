import { z } from "zod";

export const createSurveySchema = z.object({
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title must be a string",
  }).min(1, "Title cannot be empty").max(100, "Title must be 100 characters or less"),

  questions: z.array(
    z.object({
      text: z.string({
        required_error: "Question text is required",
        invalid_type_error: "Question text must be a string",
      }).min(1, "Question text cannot be empty").max(500, "Question text must be 500 characters or less"),

      options: z.array(
        z.object({
          text: z.string({
            required_error: "Option text is required",
            invalid_type_error: "Option text must be a string",
          }).min(1, "Option text cannot be empty").max(200, "Option text must be 200 characters or less"),
        })
      ).min(2, "At least two options are required").max(10, "Maximum of 10 options allowed"),
    })
  ).min(1, "At least one question is required").max(50, "Maximum of 50 questions allowed"),
});

export const getSurveyByIdSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: "Survey ID is required",
      invalid_type_error: "Survey ID must be a string",
    }).regex(/^\d+$/, "Survey ID must be a number"),
  }),
});


export const deleteSurveySchema = z.object({
  params: z.object({
    id: z.string({
      required_error: "Survey ID is required",
      invalid_type_error: "Survey ID must be a string",
    }).regex(/^\d+$/, "Survey ID must be a number"),
  }),
});

export const updateSurveySchema = z.object({
  title: z.string().min(1, "Title cannot be empty").max(100, "Title must be 100 characters or less").optional(),
  questions: z.array(
    z.object({
      id: z.number().int().positive().optional(),
      text: z.string().min(1, "Question text cannot be empty").max(500, "Question text must be 500 characters or less"),
      options: z.array(
        z.object({
          id: z.number().int().positive().optional(),
          text: z.string().min(1, "Option text cannot be empty").max(200, "Option text must be 200 characters or less"),
        })
      ).min(2, "At least two options are required").max(10, "Maximum of 10 options allowed"),
    })
  ).min(1, "At least one question is required").max(50, "Maximum of 50 questions allowed"),
});

