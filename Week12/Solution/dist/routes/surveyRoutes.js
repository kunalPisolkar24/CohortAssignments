"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const surveyController_1 = require("../controllers/surveyController");
const router = express_1.default.Router();
router.post("/", surveyController_1.createSurvey);
router.get("/", surveyController_1.getAllSurveys);
router.get("/:id", surveyController_1.getSurveyById);
router.put("/:id", surveyController_1.updateSurvey);
router.delete("/:id", surveyController_1.deleteSurvey);
exports.default = router;
