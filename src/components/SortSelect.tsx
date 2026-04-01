import { Select } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

type SortSelectProps = {
    value: string;
    onChange: (value: string) => void;
}

export function SortSelect({ value, onChange }: SortSelectProps) {
    const { t } = useTranslation();
    return (
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
    );
}