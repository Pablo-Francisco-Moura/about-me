import { useTranslation } from "react-i18next";

export function Description() {
  const { t } = useTranslation();

  return (
    <section
      style={{
        position: "relative",
        textAlign: "center",
      }}
    >
      <p>{t("description.welcome")}</p>
      <p>{t("description.intro")}</p>
    </section>
  );
}
