import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { postRouter } from "./routes/posts";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.route("/api", userRouter);
app.route("/api/posts", postRouter);

export default app;
