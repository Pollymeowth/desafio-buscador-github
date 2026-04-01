import { Box, Image, Text, Button, Flex } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { type User } from "../schemas/github";
import { FiUsers, FiHeart, FiBriefcase, FiMapPin, FiMail, FiLink, FiTwitter } from "react-icons/fi";

type UserCardProps = {
  user: User;
};

export function UserCard({ user }: UserCardProps) {
  const { t } = useTranslation();
  return (
    <Box p={4} borderWidth="1px" borderColor="gray.200" borderRadius="xl" boxShadow="sm" bg="white" w={{ base: "100%", md: "300px" }} flexShrink={0}>
      <Image
        borderRadius="full"
        boxSize="80px"
        src={user.avatar_url}
        alt={user.name ?? user.login}
      />
      <Text fontWeight="bold" fontSize="lg" mt={2}>
        {user.name}
      </Text>
      <Text color="gray.500">@{user.login}</Text>
      {user.bio && (
        <Text mt={2} fontSize="sm">
          {user.bio}
        </Text>
      )}

      <Flex gap={2} mt={3} align="center">
        <FiUsers size={14} color="gray" />
        <Text fontSize="sm">{user.followers} {t("followers")}</Text>
      </Flex>
      <Flex gap={2} align="center">
        <FiHeart size={14} color="gray" />
        <Text fontSize="sm">{user.following} {t("following")}</Text>
      </Flex>

      {user.company && (
        <Flex gap={2} mt={2} align="center">
          <FiBriefcase size={14} color="gray" />
          <Text fontSize="sm">{user.company}</Text>
        </Flex>
      )}
      {user.location && (
        <Flex gap={2} align="center">
          <FiMapPin size={14} color="gray" />
          <Text fontSize="sm">{user.location}</Text>
        </Flex>
      )}
      {user.email && (
        <Flex gap={2} align="center">
          <FiMail size={14} color="gray" />
          <Text fontSize="sm">{user.email}</Text>
        </Flex>
      )}
      {user.blog && (
        <Flex gap={2} align="center">
          <FiLink size={14} color="gray" />
          <Text
            as="a"
            href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
            target="_blank"
            rel="noreferrer"
            fontSize="sm"
            color="purple.500"
          >
            {user.blog}
          </Text>
        </Flex>
      )}
      {user.twitter_username && (
        <Flex gap={2} align="center">
          <FiTwitter size={14} color="gray" />
          <Text
            as="a"
            href={`https://twitter.com/${user.twitter_username}`}
            target="_blank"
            rel="noreferrer"
            fontSize="sm"
            color="purple.500"
          >
            @{user.twitter_username}
          </Text>
        </Flex>
      )}

      <Button
        mt={4}
        w="full"
        colorScheme="purple"
        as="a"
        href={user.html_url}
        target="_blank"
        rel="noreferrer"
      >
        {t("contact")}
      </Button>
    </Box>
  );
}
