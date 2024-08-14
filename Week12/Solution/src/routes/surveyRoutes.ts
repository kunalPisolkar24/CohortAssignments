import express from "express";
import {
  createSurvey,
  getAllSurveys,
  getSurveyById,
  updateSurvey,
  deleteSurvey,
  voteInSurvey,
  getSurveyResults,
} from "../controllers/surveyController";

const router = express.Router();

router.post("/", createSurvey);
router.get("/", getAllSurveys);
router.get("/:id", getSurveyById);
router.put("/:id", updateSurvey);
router.delete("/:id", deleteSurvey);
router.post("/:id/vote", voteInSurvey);
router.get("/:id/results", getSurveyResults);

export default router;
