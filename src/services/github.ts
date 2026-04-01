import axios from "axios";

import { UserSchema, RepoSchema, type User, type Repo } from "../schemas/github";

export async function getUser(username: string): Promise<User> {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    return UserSchema.parse(response.data);
}

export async function getUserRepos(username: string, page = 1, sort = "created"
): Promise<Repo[]> {
    const response = await axios.get(
        `https://api.github.com/users/${username}/repos`,
        {
            params: {
                per_page: 10,
                page: page,
                sort: sort,
            },
        }
    );

    return response.data.map((repo: unknown) => RepoSchema.parse(repo));
}