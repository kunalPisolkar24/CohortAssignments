import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";

import { StatusCode } from '../constants/status-code';

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  }
}>();

userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({ datasourceUrl: c.env?.DATABASE_URL }).$extends(withAccelerate());
  try {
    const body = await c.req.json();

    const encoder = new TextEncoder();
    const data = encoder.encode(body.password);
    const hash = await crypto.subtle.digest('SHA-256', data);

    const passwordHashHex = Array.from(new Uint8Array(hash))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        password: passwordHashHex,
        username: body.username,
      },
    });

    const jwt = await sign({ id: newUser.id }, c.env.JWT_SECRET);

    return c.json({ newUser, jwt }, StatusCode.CREATED);
  } catch (error) {
    console.error(error);
    return c.json({ error: 'Failed to create user' }, StatusCode.INTERNAL_SERVER_ERROR);
  } finally {
    await prisma.$disconnect();
  }
});

userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({ datasourceUrl: c.env?.DATABASE_URL }).$extends(withAccelerate());
  try {
    const body = await c.req.json();

    const encoder = new TextEncoder();
    const data = encoder.encode(body.password);
    const hash = await crypto.subtle.digest('SHA-256', data);

    const passwordHashHex = Array.from(new Uint8Array(hash))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (!user || user.password !== passwordHashHex) {
      return c.json({ error: 'Invalid email or password' }, StatusCode.UNAUTHORIZED);
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({ user, jwt }, StatusCode.OK);
  } catch (error) {
    console.error(error);
    return c.json({ error: 'Failed to sign in' }, StatusCode.INTERNAL_SERVER_ERROR);
  } finally {
    await prisma.$disconnect();
  }
});
