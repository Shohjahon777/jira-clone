import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { sessionMiddleware } from "@/lib/session-middleware";

import { DATABASE_ID, WORKSPACE_ID } from "@/config";
import { createWorkspaceSchema } from "../schemas";
import { ID } from "node-appwrite";


const app = new Hono()
    .post(
        "/",
        zValidator("json", createWorkspaceSchema),
        sessionMiddleware,
        async (c) => {
            const databases = c.get("database")
            const user = c.get("user")

            const {name} = c.req.valid("json")

            const workspaces = await databases.createDocument(
                DATABASE_ID,
                WORKSPACE_ID,
                ID.unique(),
                {
                    name,
                    userId: user.$id,
                },
            );
            
            return c.json({data: workspaces})
        }
    )

export default app