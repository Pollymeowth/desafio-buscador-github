import { Box, Text } from "@chakra-ui/react";

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string;
};

export function RepoCard({ repo }) {
    return (
        <Box p={4} borderBottom="1px solid #eee">
            <a href={repo.html_url} target="_blank" rel="noreferrer">
                <Text fontWeight="bold" color="blue.500">
                    {repo.name}
                </Text>
            </a>

            <Text color="gray.600">
                {repo.description}
            </Text>

            <Text mt={2} fontSize="sm">
                ⭐ {repo.stargazers_count} • 🍴 {repo.forks_count}
            </Text>
        </Box>
    );
}