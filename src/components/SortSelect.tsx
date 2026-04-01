import { Select, Box, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

type SortSelectProps = {
    value: string;
    onChange: (value: string) => void;
}

export function SortSelect({ value, onChange }: SortSelectProps) {
    const { t } = useTranslation();
    return (
        <Box>
            <Text fontSize="xs" color="gray.500" mb={1}>
                {t("sort_label")}
            </Text>
            <Select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                maxW="220px"
            >
                <option value="created">{t("sort_created")}</option>
                <option value="updated">{t("sort_updated")}</option>
                <option value="pushed">{t("sort_pushed")}</option>
                <option value="full_name">{t("sort_full_name")}</option>
            </Select>
        </Box>
    );
}
