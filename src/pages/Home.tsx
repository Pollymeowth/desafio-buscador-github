import { Input, Button, VStack, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../services/github";
import { SearchBar } from "../components/SearchBar";

export function Home() {
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleSearch() {
        if (!username.trim()) return;
        try {
            await getUser(username);
            navigate(`/profile/${username}`);
        } catch (error) {
            setError("User not found")
        }

    }

    return (
        <VStack
            height="100vh"
            justify="center"
            align="center"
            gap={6}
        >
            <Heading
                fontSize="5xl"
                bgGradient="linear(to-r, blue.400, purple.500)"
                bgClip="text"
            >
                Search Devs
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
                    <Heading size="sm" color="red.400">
                        {error}
                    </Heading>
                )}
            </VStack>
        </VStack>
    );

}