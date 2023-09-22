import z from "zod";


export const postSchema = z.object({
    title: z.string().nonempty(),
    author: z.string().nonempty(),
    content: z.string().nonempty(),
})