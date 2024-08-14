import express from "express";
import cors from "cors";
import surveyRoutes from "./routes/surveyRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/surveys", surveyRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
