import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";


export const postRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  }
}>();


postRouter.get('/', (c) => {
  return c.text("get all posts");
});

postRouter.get('/:id', (c) => {
  const id = c.req.param('id')
  console.log(id);
  return c.text('get post by id')
})

postRouter.post("/", (c) => {
  return c.text("create post here");
});

postRouter.put('/:id', (c) => {

  return c.text('PUT, post id')
})

postRouter.delete('/:id', (c) => {
  return c.text('delete post by id')
})
