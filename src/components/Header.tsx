import { Box, Flex, Heading, Text, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getUser } from "../services/github";
import { FiSearch } from "react-icons/fi";

export function Header() {
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { t } = useTranslation();

    async function handleSearch() {
        if (!username.trim()) return;

        setError("");

        try {
            await getUser(username);
            navigate(`/profile/${username}`);
            setUsername("");
        } catch {
            setError(t("not_found"));
        }
    }

    return (
        <Box
            position="sticky"
            top={0}
            zIndex={10}
            bg="white"
            boxShadow="sm"
            borderBottom="1px solid"
            borderColor="gray.200"
        >
            <Flex
                px={{ base: 4, md: 8 }}
                py={4}
                alignItems="center"
                position="relative"
                flexWrap="wrap"
                gap={2}
            >

                <Heading
                    fontSize={{ base: "xl", md: "2xl" }}
                    cursor="pointer"
                    onClick={() => navigate("/")}
                    zIndex={1}
                >
                    <Text as="span" color="blue.400">Search </Text>
                    <Text as="span" color="purple.500">d_evs</Text>
                </Heading>

                {/* Input — para mobile */}
                <Box display={{ base: "block", md: "none" }} w="full" mt={2}>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none" color="gray.400">
                            <FiSearch size={16} />
                        </InputLeftElement>
                        <Input
                            placeholder={t("search_placeholder")}
                            value={username}
                            onChange={(e) => { setUsername(e.target.value); setError(""); }}
                            onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
                            borderColor="purple.400"
                            focusBorderColor="purple.500"
                            borderRadius="md"
                        />
                    </InputGroup>
                    {error && <Text color="red.400" fontSize="xs" mt={1}>{error}</Text>}
                </Box>


                <Box
                    display={{ base: "none", md: "block" }}
                    position="absolute"
                    left="50%"
                    transform="translateX(-50%)"
                    w="400px"
                >
                    <InputGroup>
                        <InputLeftElement pointerEvents="none" color="gray.400">
                            <FiSearch size={16} />
                        </InputLeftElement>
                        <Input
                            placeholder={t("search_placeholder")}
                            value={username}
                            onChange={(e) => { setUsername(e.target.value); setError(""); }}
                            onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
                            borderColor="purple.400"
                            focusBorderColor="purple.500"
                            borderRadius="md"
                        />
                    </InputGroup>
                    {error && <Text color="red.400" fontSize="xs" mt={1} textAlign="center">{error}</Text>}
                </Box>
            </Flex>
        </Box>
    );
}
