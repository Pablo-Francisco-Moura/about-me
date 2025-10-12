import { Button, Typography } from "@mui/material";
import { CONTACTS, SKILLS, WORKS } from "./constants/app";
import profile from "./assets/profile.jpg";

function App() {
  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        minWidth: "100vw",
        maxWidth: "100vw",
        overflow: "hidden",
        minHeight: "100vh",
        maxHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          gap: "12px",
          flex: 1,
          border: "1px solid #ccc",
          display: "flex",
          padding: "20px",
          minWidth: "calc(100vw - 40px)",
          maxWidth: "calc(100vw - 40px)",
          overflow: "auto",
          minHeight: "calc(100vh - 40px)",
          maxHeight: "calc(100vh - 40px)",
          alignItems: "center",
          borderRadius: "10px",
          flexDirection: "column",
          backgroundColor: "#f9f9f9",
        }}
      >
        <section
          style={{
            textAlign: "center",
            marginBottom: 40,
          }}
        >
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

        <section
          style={{
            flex: 1,
            width: "100%",
            border: "1px solid #ccc",
            padding: "12px",
            maxWidth: "1000px",
            borderRadius: "10px",
            backgroundColor: "#edeaeaff",
          }}
        >
          <h3>Habilidades</h3>
          <ul
            style={{
              gap: 12,
              display: "flex",
              padding: 0,
              flexWrap: "wrap",
              listStyle: "none",
            }}
          >
            {SKILLS.map((skill) => (
              <li
                key={skill}
                style={{
                  color: "#646cff",
                  padding: "8px 16px",
                  background: "#646cff22",
                  fontWeight: 500,
                  borderRadius: 8,
                }}
              >
                {skill}
              </li>
            ))}
          </ul>
        </section>

        <section
          style={{
            flex: 1,
            width: "100%",
            border: "1px solid #ccc",
            padding: "12px",
            maxWidth: "1000px",
            borderRadius: "10px",
            backgroundColor: "#edeaeaff",
          }}
        >
          <h3>Trabalhos</h3>
          <ul
            style={{
              gap: 12,
              display: "flex",
              padding: 0,
              flexWrap: "wrap",
              listStyle: "none",
              flexDirection: "column",
            }}
          >
            {WORKS.map((work) => (
              <div
                key={work.name}
                style={{
                  gap: "12px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "start",
                  padding: "12px",
                  background: "#dadae5ff",
                  fontWeight: 500,
                  borderRadius: 8,
                }}
              >
                <Button variant="contained">{work.name}</Button>
                <Typography color="text.primary">{work.description}</Typography>
                <Typography color="text.primary">{work.information}</Typography>
              </div>
            ))}
          </ul>
        </section>

        <section style={{ marginTop: "auto", textAlign: "center" }}>
          {CONTACTS.map((contact) => (
            <a
              key={contact.name}
              rel="noopener noreferrer"
              href={contact.link}
              style={{
                marginRight: 16,
                textTransform: "capitalize",
              }}
              target="_blank"
            >
              <img
                src={contact.image}
                alt={contact.name}
                style={{
                  width: 45,
                  height: 45,
                  marginRight: 8,
                  backgroundColor: "red",
                }}
              />
            </a>
          ))}
        </section>
      </div>
    </div>
  );
}

export default App;
