"use strict";
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
exports.getSurveyResults = exports.voteInSurvey = exports.deleteSurvey = exports.updateSurvey = exports.getSurveyById = exports.getAllSurveys = exports.createSurvey = void 0;
const statusCodes_1 = require("../constants/statusCodes");
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const surveyValidations_1 = require("../validations/surveyValidations");
const surveyValidations_2 = require("../validations/surveyValidations");
const surveyValidations_3 = require("../validations/surveyValidations");
const prisma = new client_1.PrismaClient();
const createSurvey = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedBody = surveyValidations_1.createSurveySchema.parse(req.body);
        const { title, questions } = parsedBody;
        const survey = yield prisma.survey.create({
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
        res.status(statusCodes_1.STATUS_CODES.CREATED).json(survey);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(statusCodes_1.STATUS_CODES.BAD_REQUEST).json({ error: error.errors });
        }
        else {
            res.status(statusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: "Failed to create survey" });
        }
    }
});
exports.createSurvey = createSurvey;
const getAllSurveys = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const surveys = yield prisma.survey.findMany({
            include: {
                questions: {
                    include: {
                        options: true,
                    },
                },
            },
        });
        res.status(statusCodes_1.STATUS_CODES.OK).json(surveys);
    }
    catch (error) {
        res.status(statusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: "Failed to fetch surveys" });
    }
});
exports.getAllSurveys = getAllSurveys;
const getSurveyById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsedParams = surveyValidations_2.getSurveyByIdSchema.shape.params.parse(req.params);
        const { id } = parsedParams;
        const survey = yield prisma.survey.findUnique({
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
            return res.status(statusCodes_1.STATUS_CODES.NOT_FOUND).json({ error: "Survey not found" });
        }
        res.status(statusCodes_1.STATUS_CODES.OK).json(survey);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(statusCodes_1.STATUS_CODES.BAD_REQUEST).json({ error: error.errors });
        }
        else {
            res.status(statusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: "Failed to fetch survey" });
        }
    }
});
exports.getSurveyById = getSurveyById;
const updateSurvey = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const parsedBody = surveyValidations_3.updateSurveySchema.parse(req.body);
        const existingSurvey = yield prisma.survey.findUnique({
            where: { id: Number(id) },
            include: { questions: { include: { options: true } } },
        });
        if (!existingSurvey) {
            return res.status(statusCodes_1.STATUS_CODES.NOT_FOUND).json({ error: "Survey not found" });
        }
        const updatedSurvey = yield prisma.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
            yield prisma.option.deleteMany({
                where: { question: { surveyId: Number(id) } },
            });
            yield prisma.question.deleteMany({
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
        }));
        res.status(statusCodes_1.STATUS_CODES.OK).json(updatedSurvey);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(statusCodes_1.STATUS_CODES.BAD_REQUEST).json({ error: error.errors });
        }
        else {
            console.error("Error updating survey:", error);
            res.status(statusCodes_1.STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: "Failed to update survey" });
        }
    }
});
exports.updateSurvey = updateSurvey;
const deleteSurvey = (req, res) => {
    res.status(200).json({ message: "This route is for deleting a specific survey by ID." });
};
exports.deleteSurvey = deleteSurvey;
const voteInSurvey = (req, res) => {
    res.status(200).json({ message: "This route is for voting in a survey." });
};
exports.voteInSurvey = voteInSurvey;
const getSurveyResults = (req, res) => {
    res.status(200).json({ message: "This route is for fetching the results of a survey." });
};
exports.getSurveyResults = getSurveyResults;
