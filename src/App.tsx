import {
  Box,
  Fade,
  Alert,
  Button,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { CONTACTS, SKILLS, WORKS } from "./constants/app";
import profile from "./assets/profile.jpg";

function App() {
  const isMobile = useMediaQuery("(max-width: 500px)");

  const [alert, setAlert] = useState(false);

  useEffect(() => {
    setAlert(true);
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
          // border: `1px solid ${isMobile ? "red" : "#ccc"}`,
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
        <Fade in={alert} timeout={3000}>
          <Alert
            sx={{
              fontSize: isMobile ? "10px" : "14px",
              top: "30px",
              width: "auto",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
              transition: "all 0.6s cubic-bezier(.4,0,.2,1)",
            }}
            severity="info"
          >
            Este é um portfólio em desenvolvimento. Logo teremos mais novidades!
          </Alert>
        </Fade>
        <section
          style={{
            textAlign: "center",
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
                  padding: "12px",
                  alignItems: "start",
                  background: "#dadae5ff",
                  fontWeight: 500,
                  borderRadius: "10px",
                  justifyContent: "center",
                  flexDirection: isMobile ? "column" : "row",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    gap: "12px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    color="text.primary"
                    sx={{
                      gap: "12px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <strong>{work.name}</strong>
                    <Tooltip title={"Acessar App"} arrow>
                      <Button
                        variant="outlined"
                        onClick={() => window.open(work.link, "_blank")}
                        sx={{
                          ":hover": {
                            backgroundColor: "#646cff",
                            color: "#fff",
                          },
                          transition: "background-color 1s, color 1s",
                        }}
                      >
                        Acessar
                      </Button>
                    </Tooltip>
                  </Typography>
                  <Typography color="text.primary">
                    {work.description}
                  </Typography>
                  <div
                    style={{
                      border: `${isMobile ? "1px" : "0px"} solid #bbbbbbff`,
                      padding: "12px",
                      whiteSpace: "nowrap",
                      borderRadius: "10px",
                    }}
                  >
                    {work.information.map((info, index) => (
                      <Typography key={index} color="text.primary">
                        {info}
                      </Typography>
                    ))}
                  </div>
                </div>
                <div
                  style={{
                    minWidth: isMobile ? "100%" : undefined,
                    maxWidth: "200px",
                  }}
                >
                  {work.files && (
                    <div
                      style={{
                        gap: "8px",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {work.files.map((file) => (
                        <Button
                          sx={{
                            ":hover": {
                              color: "#fff",
                              backgroundColor: "#646cff",
                            },
                            transition: "background-color 1s, color 1s",
                          }}
                          key={file.name}
                          variant="outlined"
                          onClick={() => window.open(file.link, "_blank")}
                        >
                          {file.name}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </ul>
        </section>

        <Typography
          sx={{
            marginTop: "auto",
          }}
          align="center"
          variant="h6"
        >
          Thank you for visiting my portfolio!
        </Typography>

        <section
          style={{
            gap: 8,
            display: "flex",
            flexWrap: "wrap",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          {CONTACTS.map((contact) => (
            <Tooltip title={contact.tooltip} arrow>
              <Box
                sx={{
                  width: `${isMobile ? 60 : 80}px`,
                  height: `${isMobile ? 60 : 80}px`,
                  border: "1px solid #646cff",
                  cursor: "pointer",
                  display: "flex",
                  padding: "12px",
                  alignItems: "center",
                  borderRadius: "12px",
                  flexDirection: "column",
                  justifyContent: "center",
                  ":hover": {
                    backgroundColor: "#646cff",
                  },
                  transition: "background-color 1s",
                }}
                key={contact.name}
                onClick={() => {
                  window.open(contact.link, "_blank");
                }}
              >
                <img
                  src={contact.image}
                  alt={contact.name}
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                />
                <Typography fontSize={isMobile ? 10 : 14}>
                  {contact.name}
                </Typography>
              </Box>
            </Tooltip>
          ))}
        </section>
      </div>
      <div
        style={{
          gap: "12px",
          flex: 1,
          bottom: "0px",
          display: "flex",
          position: "fixed",
          minWidth: "calc(100% - 40px)",
          justifyContent: "space-between",
        }}
      >
        <Typography noWrap fontSize={10}>
          {`Desenvolvido por Pablo ${
            isMobile ? "Moura" : "Francisco Moura"
          } - 2025`}
        </Typography>
        <Typography noWrap fontSize={10}>{`Versão 1.0.3${
          isMobile ? "" : " - Última atualização: 13/10/2025"
        }`}</Typography>
      </div>
    </div>
  );
}

export default App;
