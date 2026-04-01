import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser } from "../services/github";
import { getUserRepos } from "../services/github";

import {
  Flex,
  Box,
  Heading,
  Spinner
} from "@chakra-ui/react";

import { UserCard } from "../components/UserCard";
import { RepoCard } from "../components/RepoCard";

export function Profile() {
    const { username } = useParams();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [repos, setRepos] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [loadingRepos, setLoadingRepos] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            if (!username) return;

            try {
                const data = await getUser(username);
                setUser(data);
            } catch (error) {
                console.log("Error fetching user")
            } finally {
                setLoading(false)
            }
        }
        fetchUser();
    }, [username]);

    useEffect(() => {
        setRepos([]);
        setPage(1);
        setHasMore(true);
    }, [username]);

    useEffect(() => {
        async function fetchRepos() {
            if (!username) return;

            setLoadingRepos(true);

            try {
                const data = await getUserRepos(username, page);

                if (data.length === 0) {
                    setHasMore(false);
                } else {
                    setRepos((prev) => [...prev, ...data]);
                }
            } catch (error) {
                console.log("Error fetching repos");
            } finally {
                setLoadingRepos(false);
            }
        }

        fetchRepos();
    }, [page, username]);


    useEffect(() => {
        function handleScroll() {
            if (loadingRepos || !hasMore) return;

            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const fullHeight = document.documentElement.scrollHeight;

            if (scrollTop + windowHeight >= fullHeight - 50) {
                setPage((prev) => prev + 1);
            }
        }

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }

    }, [loadingRepos, hasMore]);

    if (loading) return <p>Loading user...</p>;

    return (
        <Flex p={8} gap={8} maxW="1200px" mx="auto">

            {/* USER */}
            <Box w="300px">
                <UserCard user={user} />
            </Box>

            {/* REPOS */}
            <Box flex="1">

                <Heading size="md" mb={4}>
                    Repositories
                </Heading>

                {repos.map((repo) => (
                    <RepoCard key={repo.id} repo={repo} />
                ))}

                {loadingRepos && (
                    <Flex justify="center" mt={4}>
                        <Spinner />
                    </Flex>
                )}

            </Box>

        </Flex>
    );

}