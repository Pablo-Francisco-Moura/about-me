import { Subtitle } from "./Subtitle";
import { useTranslation } from "react-i18next";
import { EDUCATION_KEYS, EXPERIENCE_KEYS } from "../constants/trajectory";
import { Box, Typography, useTheme } from "@mui/material";

export function Trajectory() {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <section
      id="trajectory"
      style={{
        width: "calc(100% - 45px)",
        margin: "auto 20px auto 25px",
        border: `1px solid ${theme.palette.divider}`,
        padding: "20px",
        maxWidth: "1000px",
        boxSizing: "border-box",
        borderRadius: "10px",
        backgroundColor: theme.palette.background.b1,
      }}
    >
      <Subtitle
        subtitle={t("trajectory.title")}
        description={t("trajectory.description")}
      />

      <Box
        sx={{
          mt: 2,
          gap: 3,
          display: "grid",
        }}
      >
        <Box
          sx={{
            p: 1,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: "10px",
            backgroundColor: theme.palette.background.b2,
          }}
        >
          <Typography variant="h5" gutterBottom>
            {t("trajectory.summary.title")}
          </Typography>
          <Typography sx={{ lineHeight: 1.8 }}>
            {t("trajectory.summary.content")}
          </Typography>
        </Box>

        <Box
          sx={{
            p: 1,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: "10px",
            backgroundColor: theme.palette.background.b2,
          }}
        >
          <Typography variant="h5" gutterBottom>
            {t("trajectory.courses.title")}
          </Typography>
          <Box sx={{ display: "grid", gap: 2, p: 1 }}>
            {EDUCATION_KEYS.map((key) => (
              <Box
                key={key}
                sx={{
                  p: 1,
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: "10px",
                  backgroundColor: theme.palette.background.b3,
                }}
              >
                <Typography sx={{ fontWeight: 700 }}>
                  {t(`trajectory.courses.${key}.title`)}
                </Typography>
                <Typography color="text.secondary">
                  {t(`trajectory.courses.${key}.period`)}
                </Typography>
                <Typography sx={{ mt: 1, lineHeight: 1.7 }}>
                  {t(`trajectory.courses.${key}.content`)}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            p: 1,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: "10px",
            backgroundColor: theme.palette.background.b2,
          }}
        >
          <Typography variant="h5" gutterBottom>
            {t("trajectory.experience.title")}
          </Typography>
          <Box sx={{ display: "grid", gap: 2.5, p: 1 }}>
            {EXPERIENCE_KEYS.map((key, index) => (
              <Box
                key={key}
                sx={{
                  p: 1,
                  border: `1px solid ${index === 0 ? theme.palette.primary.main : theme.palette.divider}`,
                  borderRadius: "10px",
                  backgroundColor: theme.palette.background.b3,
                }}
              >
                <Typography variant="h6">
                  {t(`trajectory.experience.${key}.role`)}
                </Typography>
                <Typography
                  color={
                    index === 0 ? theme.palette.primary.main : "text.secondary"
                  }
                  sx={{ mb: 1 }}
                >
                  {t(`trajectory.experience.${key}.period`)}
                </Typography>
                <Box component="ul" sx={{ m: 0, pl: 3 }}>
                  {Array.from({ length: 5 }, (_, index) => {
                    const item = t(
                      `trajectory.experience.${key}.items.${index}`,
                      { defaultValue: "" },
                    );
                    return item ? <li key={index}>{item}</li> : null;
                  })}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </section>
  );
}
