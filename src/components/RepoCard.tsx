import { Box, Text, Flex } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { type Repo } from "../schemas/github";
import { FiStar } from "react-icons/fi";

type RepoCardProps = {
  repo: Repo;
};

function daysAgo(dateStr: string): number {
  const diff = Date.now() - new Date(dateStr).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function RepoCard({ repo }: RepoCardProps) {
  const { t } = useTranslation();

  return (
    <Box py={4} borderBottom="1px solid" borderColor="gray.200">

      <Text fontWeight="bold" fontSize="md">
        <a href={repo.html_url} target="_blank" rel="noreferrer">
          {repo.name}
        </a>
      </Text>

      {repo.description && (
        <Text color="gray.600" fontSize="sm" mt={1}>
          {repo.description}
        </Text>
      )}

      <Flex gap={4} mt={2} align="center">
        <Flex align="center" gap={1}>
          <FiStar size={14} color="gray" />
          <Text fontSize="sm">{repo.stargazers_count}</Text>
        </Flex>
        <Text fontSize="sm">
          {t("updated")} {daysAgo(repo.updated_at)} {t("days_ago")}
        </Text>
      </Flex>

    </Box>
  );
}
