import { Button, VStack, Heading, Text, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../services/github";
import { SearchBar } from "../components/SearchBar";
import { useTranslation } from "react-i18next";

export function Home() {
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const { t } = useTranslation();

    async function handleSearch() {
        if (!username.trim()) return;
        setLoading(true);
        setError("")
        try {
            await getUser(username);
            navigate(`/profile/${username}`);
        } catch (error) {
            setError(t("not_found"))
        }

    }

    return (
        <VStack
            height="100vh"
            justify="center"
            align="center"
            gap={6}
        >
            <Heading fontSize="5xl">
                <Text as="span" color="blue.400">{t("search_title_1")} </Text>
                <Text as="span" color="purple.500">{t("search_title_2")}</Text>
            </Heading>
            <VStack gap={3}>
                <SearchBar
                    value={username}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setUsername(e.target.value);
                        setError("");
                    }}
                    onSearch={handleSearch}
                />
                {error && (
                    <Text color="red.400" fontSize="sm">
                        {error}
                    </Text>
                )}
            </VStack>
        </VStack>
    );

}