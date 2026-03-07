import { useTranslation } from "react-i18next";
import profileImage from "../assets/profile.jpg";

export function Profile() {
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
        }}
      />
      <h1>Pablo Francisco Moura</h1>
      <h2 style={{ color: "#646cff", fontWeight: 400 }}>
        {t("description.role")}
      </h2>
    </section>
  );
}
