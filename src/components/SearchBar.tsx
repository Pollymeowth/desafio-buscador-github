import { Input, Button, Flex } from "@chakra-ui/react";

type SearchBarProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
};


export function SearchBar({ value, onChange, onSearch } : SearchBarProps) {
  return (
    <Flex gap={2}>
      <Input
        placeholder="Search"
        value={value}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch();
          }
        }}
      />

      <Button colorScheme="purple" onClick={onSearch}>
        Search
      </Button>
    </Flex>
  );
}