import profileImage from "../assets/profile.jpg";

export function Profile() {
  return (
    <section
      style={{
        width: "100%",
        display: "flex",
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
