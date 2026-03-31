import { Input, Button, VStack, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../services/github";

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
        <VStack gap={4} p={6}>
            <Heading>Search Dev's</Heading>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
            }}>
                <label htmlFor="username">Username:</label>

                <Input
                    id="username"
                    placeholder="Search"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
                <Button type="submit">Search</Button>
            </form>

        </VStack>

    )

}