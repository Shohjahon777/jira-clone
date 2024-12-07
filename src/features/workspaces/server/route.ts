import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { sessionMiddleware } from "@/lib/session-middleware";

import { BUCKET_ID, DATABASE_ID, MEMBERS_ID, WORKSPACE_ID } from "@/config";
import { createWorkspaceSchema } from "../schemas";
import { ID, Query, Role } from "node-appwrite";
import { MemberRole } from "@/features/members/types";
import { generateInviteCode } from "@/lib/utils";


const app = new Hono()
    .get("/", sessionMiddleware, async (c) => {
        const user = c.get("user")
        const databases = c.get("database")

        const members = await databases.listDocuments(
            DATABASE_ID,
            MEMBERS_ID,
            [Query.equal("userId", user.$id)]
        )

        if (members.total === 0 ) {
            return c.json({data: {documents: [], total: 0}})
        }

        const workspaceIds = members.documents.map((member) => member.workspaceId)

        const workspaces = await databases.listDocuments(
            DATABASE_ID,
            WORKSPACE_ID,
            [   
                Query.orderDesc("$createdAt"),
                Query.contains("$id", workspaceIds),
            ],
        )

        return c.json({ data: workspaces })
    })
    .post(
        "/",
        zValidator("form", createWorkspaceSchema),
        sessionMiddleware,
        async (c) => {
            const databases = c.get("database")
            const storage = c.get("storage")
            const user = c.get("user")

            const {name, image} = c.req.valid("form")

            let uploadedImageUrl: string | undefined

            if (image instanceof File) {
                const file = await storage.createFile(
                    BUCKET_ID,
                    ID.unique(),
                    image,
                );

                const arrayBuffer = await storage.getFilePreview(
                    BUCKET_ID,
                    file.$id
                )

                uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`
            }

            const workspaces = await databases.createDocument(
                DATABASE_ID,
                WORKSPACE_ID,
                ID.unique(),
                {
                    name,
                    userId: user.$id,
                    imageUrl: uploadedImageUrl, 
                    inviteCode: generateInviteCode(6)
                },
            );

            await databases.createDocument(
                DATABASE_ID,
                MEMBERS_ID,
                ID.unique(),
                {
                    userId: user.$id,
                    workspaceId: workspaces.$id,
                    role: MemberRole.ADMIN,
                }    
            )
            
            return c.json({data: workspaces})
        }
    )

export default app