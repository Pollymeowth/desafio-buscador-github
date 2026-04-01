import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser } from "../services/github";
import { getUserRepos } from "../services/github";
import { type User, type Repo } from "../schemas/github";
import { useTranslation } from "react-i18next";

import { Flex, Box, Heading, Spinner, Text } from "@chakra-ui/react";

import { UserCard } from "../components/UserCard";
import { RepoCard } from "../components/RepoCard";
import { SortSelect } from "../components/SortSelect";
import { Header } from "../components/Header";

import { ScrollToTopButton } from "../components/ScrollToTopButton";

export function Profile() {
    const { username } = useParams();
    const { t } = useTranslation();

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [userError, setUserError] = useState("");

    const [repos, setRepos] = useState<Repo[]>([]);
    const [page, setPage] = useState(1);
    const [loadingRepos, setLoadingRepos] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [sort, setSort] = useState("created");

    useEffect(() => {
        async function fetchUser() {
            if (!username) return;

            setLoading(true);
            setUserError("");

            try {
                const data = await getUser(username);
                setUser(data);
            } catch (error) {
                setUserError(t("not_found"));
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
    }, [username, sort]);

    useEffect(() => {
        async function fetchRepos() {
            if (!username) return;

            setLoadingRepos(true);

            try {
                const data = await getUserRepos(username, page, sort);

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
    }, [page, username, sort]);


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

    if (loading) return <Spinner mt={8} />;

    if (userError) {
        return (
            <Flex justify="center" mt={8}>
                <Text color="red.400">{userError}</Text>
            </Flex>
        );
    }
    if (!user) return null;

    return (
        <Box>
            <Header />
            <Flex
                p={{ base: 4, md: 8 }}
                gap={8}
                maxW="1200px"
                mx="auto"
                direction={{ base: "column", md: "row" }}
            >
                {/* USER */}
                <Box w={{ base: "100%", md: "300px" }} flexShrink={0}>
                    <UserCard user={user} />
                </Box>
                {/* REPOS */}
                <Box flex="1">
                    <Flex justify="space-between" align="flex-end" mb={4}>
                        <Heading size="md">{t("repositories")}</Heading>
                        <SortSelect value={sort} onChange={(val) => setSort(val)} />
                    </Flex>
                    {repos.map((repo) => (
                        <RepoCard key={repo.id} repo={repo} />
                    ))}
                    {loadingRepos && (
                        <Flex justify="center" mt={4}>
                            <Spinner />
                        </Flex>
                    )}
                    {!hasMore && repos.length === 0 && (
                        <Text color="gray.500">No repositories found.</Text>
                    )}
                </Box>
            </Flex>
            <ScrollToTopButton />
        </Box>
    );

}