import axios from "axios";

export async function getUser(username: string) {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    return response.data;
}

export async function getUserRepos(username: string, page = 1) {
    const response = await axios.get(
        `https://api.github.com/users/${username}/repos`,
        {
            params: {
                per_page: 10,
                page: page,
            },
        }
    );

    return response.data;
}