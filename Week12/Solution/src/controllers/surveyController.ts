import { Request, Response } from "express";
import { STATUS_CODES } from "../constants/statusCodes";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

import { createSurveySchema } from "../validations/surveyValidations";
import { getSurveyByIdSchema } from "../validations/surveyValidations";

const prisma = new PrismaClient();


export const createSurvey = async (req: Request, res: Response) => {
  try {
    const parsedBody = createSurveySchema.parse(req.body);

    const { title, questions } = parsedBody;

    const survey = await prisma.survey.create({
      data: {
        title,
        questions: {
          create: questions.map((question) => ({
            text: question.text,
            options: {
              create: question.options.map((option) => ({
                text: option.text,
              })),
            },
          })),
        },
      },
    });

    res.status(STATUS_CODES.CREATED).json(survey);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ error: error.errors });
    } else {
      res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: "Failed to create survey" });
    }
  }
};

export const getAllSurveys = async (req: Request, res: Response) => {
  try {
    const surveys = await prisma.survey.findMany({
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    res.status(STATUS_CODES.OK).json(surveys);
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: "Failed to fetch surveys" });
  }
};

export const getSurveyById = async (req: Request, res: Response) => {
  try {
    const parsedParams = getSurveyByIdSchema.shape.params.parse(req.params);

    const { id } = parsedParams;

    const survey = await prisma.survey.findUnique({
      where: { id: Number(id) },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    if (!survey) {
      return res.status(STATUS_CODES.NOT_FOUND).json({ error: "Survey not found" });
    }

    res.status(STATUS_CODES.OK).json(survey);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ error: error.errors });
    } else {
      res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: "Failed to fetch survey" });
    }
  }
};

export const updateSurvey = (req: Request, res: Response) => {
  res.status(200).json({ message: "This route is for updating a specific survey by ID." });
};

export const deleteSurvey = (req: Request, res: Response) => {
  res.status(200).json({ message: "This route is for deleting a specific survey by ID." });
};

export const voteInSurvey = (req: Request, res: Response) => {
  res.status(200).json({ message: "This route is for voting in a survey." });
};

export const getSurveyResults = (req: Request, res: Response) => {
  res.status(200).json({ message: "This route is for fetching the results of a survey." });
};
