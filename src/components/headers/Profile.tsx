import profileImage from "../../assets/profile.jpg";

export function Profile() {
  return (
    <section
      style={{
        display: "flex",
        minWidth: "150px",
        maxWidth: "150px",
        position: "relative",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={profileImage}
        alt="Avatar"
        style={{
          width: 150,
          height: 150,
          margin: "0 auto",
          display: "block",
          borderRadius: "50%",
        }}
      />
    </section>
  );
}
