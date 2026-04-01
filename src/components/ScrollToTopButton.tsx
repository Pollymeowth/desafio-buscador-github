import { Box, Tooltip } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 300);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (!visible) return null;

  return (
    <Tooltip label={t("scroll_to_top")} placement="left" hasArrow>
      <Box
        as="button"
        onClick={scrollToTop}
        position="fixed"
        bottom={8}
        right={8}
        w="48px"
        h="48px"
        borderRadius="full"
        background="linear-gradient(135deg, #667eea, #764ba2)"
        color="white"
        fontSize="20px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        boxShadow="0 4px 20px rgba(118, 75, 162, 0.5)"
        cursor="pointer"
        border="none"
        zIndex={100}
        _hover={{
          background: "linear-gradient(135deg, #764ba2, #667eea)",
          transform: "translateY(-3px)",
          boxShadow: "0 8px 25px rgba(118, 75, 162, 0.6)",
        }}
        transition="all 0.2s ease"
        aria-label={t("scroll_to_top")}
      >
        ↑
      </Box>
    </Tooltip>
  );
}
