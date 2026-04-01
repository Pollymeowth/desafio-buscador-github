import { Input, Button, Flex } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

type SearchBarProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
};


export function SearchBar({ value, onChange, onSearch } : SearchBarProps) {
    const { t } = useTranslation();

    return (
        <Flex gap={2}>
            <Input
                placeholder={t("search_placeholder")}
                value={value}
                onChange={onChange}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        onSearch();
                    }
                }}
            />

            <Button colorScheme="purple" onClick={onSearch}>
                {t("search_button")}
            </Button>
        </Flex>
  );
}