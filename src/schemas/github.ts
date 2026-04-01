import { z } from "zod";

export const UserSchema = z.object({
    login: z.string(),
    name: z.string().nullable(),
    avatar_url: z.string(),
    bio: z.string().nullable(),
    followers: z.number(),
    following: z.number(),
    public_repos: z.number(),
    company: z.string().nullable(),
    location: z.string().nullable(),
    email: z.string().nullable(),
    blog: z.string().nullable(),
    twitter_username: z.string().nullable(),
    html_url: z.string(),
})

export const RepoSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().nullable(),
    html_url: z.string(),
    stargazers_count: z.number(),
    forks_count: z.number(),
    updated_at: z.string(),
    language: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>;
export type Repo = z.infer<typeof RepoSchema>;