import {
  Box,
  Fade,
  Alert,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Works } from "./components/works";
import { Copyright } from "./components/Copyright";
import { CONTACTS, SKILLS } from "./constants/app";
import { useEffect, useState } from "react";
import profile from "./assets/profile.jpg";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

function App() {
  const isMobile = useMediaQuery("(max-width: 500px)");

  const [alert, setAlert] = useState(false);

  useEffect(() => {
    setAlert(true);
    const timer = setTimeout(() => setAlert(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  const paddingX: number = 10;
  const paddingY: number[] = [10, 14];

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
      <SimpleBar
        style={{
          flex: 1,
          border: "1px solid #ccc",
          padding: "20px",
          display: "flex",
          minWidth: `calc(100vw - ${paddingX * 2}px)`,
          maxWidth: `calc(100vw - ${paddingX * 2}px)`,

          borderRadius: "25px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <div
          style={{
            gap: 12,
            flex: 1,
            display: "flex",
            position: "relative",
            minHeight: `calc(100vh - ${paddingY[0] + paddingY[1]}px)`,
            maxHeight: `calc(100vh - ${paddingY[0] + paddingY[1]}px)`,
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Fade in={alert} timeout={3000}>
            <Alert
              sx={{
                mb: "20px",
                marginX: "auto",
                maxWidth: "530px",
                fontSize: isMobile ? "10px" : "14px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                transition: "all 0.6s cubic-bezier(.4,0,.2,1)",
              }}
              severity="info"
            >
              Este é um portfólio em desenvolvimento. Logo teremos mais
              novidades!
            </Alert>
          </Fade>

          <section
            style={{
              textAlign: "center",
              position: "relative",
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
              Aqui você encontra minhas principais habilidades, trabalhos e
              formas de contato.
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
            <Works />
          </section>

          <Typography
            sx={{
              mt: "auto",
              position: "relative",
              marginTop: "50px",
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
      </SimpleBar>
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
            <Works />
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
        <Copyright isMobile={isMobile} />
      </div>
    </div>
  );
}

export default App;
