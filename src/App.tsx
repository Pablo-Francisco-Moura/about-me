import { CONTACTS, SKILLS } from "./constants/app";
import profile from "./assets/profile.jpg";

function App() {
  return (
    <div
      style={{
        flex: 1,
        border: "1px solid #ccc",
        width: "90vw",
        maxWidth: "1000px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "auto",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <section style={{ textAlign: "center", marginBottom: 40 }}>
        <img
          src={profile}
          alt="Avatar"
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            marginBottom: 16,
          }}
        />
        <h1>Pablo Moura</h1>
        <h2 style={{ color: "#646cff", fontWeight: 400 }}>Programador</h2>
        <p>Bem-vindo ao meu portfólio!</p>
        <p>
          Aqui você encontra minhas principais habilidades, trabalhos e formas
          de contato.
        </p>
      </section>
      <section>
        <h3>Habilidades</h3>
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            listStyle: "none",
            padding: 0,
          }}
        >
          {SKILLS.map((skill) => (
            <li
              key={skill}
              style={{
                background: "#646cff22",
                color: "#646cff",
                padding: "8px 16px",
                borderRadius: 8,
                fontWeight: 500,
              }}
            >
              {skill}
            </li>
          ))}
        </ul>
      </section>
      <section style={{ marginTop: 40, textAlign: "center" }}>
        {CONTACTS.map((contact) => (
          <a
            key={contact.name}
            href={contact.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginRight: 16,
              textTransform: "capitalize",
            }}
          >
            <img
              src={contact.image}
              alt={contact.name}
              style={{
                width: 24,
                height: 24,
                marginRight: 8,
                backgroundColor: "red",
              }}
            />
          </a>
        ))}
      </section>
    </div>
  );
}

export default App;
