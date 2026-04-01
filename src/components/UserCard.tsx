import { Box, Image, Text } from "@chakra-ui/react";

export function UserCard({ user }) {
  return (
    <Box p={4} borderWidth="1px" borderRadius="lg">
      <Image
        borderRadius="full"
        boxSize="80px"
        src={user.avatar_url}
      />

      <Text fontWeight="bold">{user.name}</Text>
      <Text color="gray.500">@{user.login}</Text>

      <Text mt={2}>{user.bio}</Text>

      <Text mt={2}>👥 {user.followers}</Text>
      <Text>📦 {user.public_repos}</Text>
    </Box>
  );
}