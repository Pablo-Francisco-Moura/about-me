import { useEffect, useState } from "react";
import { CONTACTS, SKILLS, WORKS } from "./constants/app";
import { Alert, Button, Tooltip, Typography } from "@mui/material";
import profile from "./assets/profile.jpg";

function App() {
  const [alert, setAlert] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setAlert(false), 10000);
    return () => clearTimeout(timer);
  }, []);

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
        <Alert
          sx={{
            display: alert ? "flex" : "none",
            top: "30px",
            left: "235px",
            width: "calc(100% - 40px)",
            zIndex: 1000,
            position: "fixed",
            maxWidth: 400,
            transform: "translateX(-50%)",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          }}
          severity="info"
        >
          Este é um portfólio em desenvolvimento. Logo teremos mais novidades!
        </Alert>
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
              width: 150,
              height: 150,
              borderRadius: "50%",
              marginBottom: 16,
            }}
          />
          <h1>Pablo Francisco Moura</h1>
          <h2 style={{ color: "#646cff", fontWeight: 400 }}>Programador</h2>
          <p>Bem-vindo ao meu portfólio!</p>
          <p>
            Aqui você encontra minhas principais habilidades, trabalhos e formas
            de contato.
          </p>
        </section>

        <section
          style={{
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
                  width: "60px",
                  height: "60px",
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
