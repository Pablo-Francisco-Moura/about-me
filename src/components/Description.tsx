import { useTranslation } from "react-i18next";
import profileImage from "../assets/profile.jpg";

export function Description() {
  const { t } = useTranslation();

  return (
    <section
      style={{
        position: "relative",
        textAlign: "center",
      }}
    >
      <img
        src={profileImage}
        alt="Avatar"
        style={{
          width: 150,
          height: 150,
          borderRadius: "50%",
          marginBottom: 16,
        }}
      />
      <h1>Pablo Francisco Moura</h1>
      <h2 style={{ color: "#646cff", fontWeight: 400 }}>
        {t("description.role")}
      </h2>
      <p>{t("description.welcome")}</p>
      <p>{t("description.intro")}</p>
    </section>
  );
}
