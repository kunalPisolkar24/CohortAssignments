import { Request, Response } from "express";
import { STATUS_CODES } from "../constants/statusCodes";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

import { createSurveySchema } from "../validations/surveyValidations";
import { getSurveyByIdSchema } from "../validations/surveyValidations";
import { updateSurveySchema } from "../validations/surveyValidations";
import { deleteSurveySchema } from "../validations/surveyValidations";

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

export const updateSurvey = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsedBody = updateSurveySchema.parse(req.body);

    const existingSurvey = await prisma.survey.findUnique({
      where: { id: Number(id) },
      include: { questions: { include: { options: true } } },
    });

    if (!existingSurvey) {
      return res.status(STATUS_CODES.NOT_FOUND).json({ error: "Survey not found" });
    }

    const updatedSurvey = await prisma.$transaction(async (prisma) => {
      await prisma.option.deleteMany({
        where: { question: { surveyId: Number(id) } },
      });
      await prisma.question.deleteMany({
        where: { surveyId: Number(id) },
      });

      return prisma.survey.update({
        where: { id: Number(id) },
        data: {
          title: parsedBody.title,
          questions: {
            create: parsedBody.questions.map((question) => ({
              text: question.text,
              options: {
                create: question.options.map((option) => ({
                  text: option.text,
                })),
              },
            })),
          },
        },
        include: {
          questions: {
            include: {
              options: true,
            },
          },
        },
      });
    });
    res.status(STATUS_CODES.OK).json(updatedSurvey);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ error: error.errors });
    } else {
      console.error("Error updating survey:", error);
      res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: "Failed to update survey" });
    }
  }
};

export const deleteSurvey = async (req: Request, res: Response) => {
  try {
    const { params } = deleteSurveySchema.parse(req);
    const surveyId = parseInt(params.id, 10);

    const existingSurvey = await prisma.survey.findUnique({
      where: { id: surveyId },
    });

    if (!existingSurvey) {
      return res.status(STATUS_CODES.NOT_FOUND).json({ error: "Survey not found" });
    }

    await prisma.$transaction(async (prisma) => {
      await prisma.option.deleteMany({
        where: { question: { surveyId: surveyId } },
      });

      await prisma.question.deleteMany({
        where: { surveyId: surveyId },
      });

      await prisma.survey.delete({
        where: { id: surveyId },
      });
    });

    res.status(STATUS_CODES.OK).json({ message: "Survey and all associated data deleted successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ error: error.errors });
    } else {
      console.error("Error deleting survey:", error);
      res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: "Failed to delete survey" });
    }
  }
};
