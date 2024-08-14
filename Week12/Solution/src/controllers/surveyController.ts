import { Request, Response } from "express";

export const createSurvey = (req: Request, res: Response) => {
  res.status(200).json({ message: "This route is for creating a new survey." });
};

export const getAllSurveys = (req: Request, res: Response) => {
  res.status(200).json({ message: "This route is for fetching all surveys." });
};

export const getSurveyById = (req: Request, res: Response) => {
  res.status(200).json({ message: "This route is for fetching a specific survey by ID." });
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
