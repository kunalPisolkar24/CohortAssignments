import express from "express";
import {
  createSurvey,
  getAllSurveys,
  getSurveyById,
  updateSurvey,
  deleteSurvey,
} from "../controllers/surveyController";

const router = express.Router();

router.post("/", createSurvey);
router.get("/", getAllSurveys);
router.get("/:id", getSurveyById);
router.put("/:id", updateSurvey);
router.delete("/:id", deleteSurvey);

export default router;
