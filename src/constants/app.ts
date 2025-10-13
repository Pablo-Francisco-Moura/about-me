import type { TypeContact, TypeWork } from "../types/app";
import gmailImage from "../assets/gmail.png";
import gitHubImage from "../assets/gitHub.png";
import whatsappImage from "../assets/whatsapp.png";
import linkedInImage from "../assets/linkedin.png";

export const SKILLS: string[] = [
  "React",
  "TypeScript",
  "JavaScript",
  "HTML",
  "CSS",
  "Node.js",
  "Docker",
  "Git",
  "Vite",
  "VitePress",
  "Next.js",
  "PorstgreSQL",
  "NestJS",
  "Prisma",
  "Django",
  "Python",
] as const;

export const CONTACTS: TypeContact[] = [
  {
    name: "Whatsapp",
    link: "https://wa.me/5531975994719",
    image: whatsappImage,
    tooltip: "Entre em contato pelo WhatsApp",
  },
  {
    name: "Gmail",
    link: "mailto:pablo.f.moura17@gmail.com",
    image: gmailImage,
    tooltip: "Envie um email",
  },
  {
    name: "GitHub",
    link: "https://github.com/Pablo-Francisco-Moura",
    image: gitHubImage,
    tooltip: "Acesse meu GitHub",
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/pablo-francisco-moura/",
    image: linkedInImage,
    tooltip: "Acesse meu LinkedIn",
  },
] as const;

export const WORKS: TypeWork[] = [
  {
    name: "Gestão Financeira",
    link: "https://finance-manager-eight-beta.vercel.app",
    description: "Plataforma de gestão financeira para controle de despesas.",
    image:
      "https://logodownload.org/wp-content/uploads/2019/07/easynvest-logo-1.png",
    information: ["Para logar use:", "user: admin", "password: 123"],
    files: [
      {
        name: "Vídeo explicativo 1",
        link: "https://www.loom.com/share/e0d441c6b5194d1ba6de437e399ef7f0?sid=f513f4a4-8582-4d54-b622-5586a1648557",
      },
      {
        name: "Vídeo explicativo 2",
        link: "https://www.loom.com/share/d99adcb570504acaa2b13c8606a046d7?sid=b861a0d5-3945-4517-a718-fd4264c78d26",
      },
      {
        name: "Vídeo explicativo 3",
        link: "https://www.loom.com/share/66b2f90ee3d14e75b80e0b3e5e200706?sid=49dca3f7-ca74-46b6-aa01-ab7ce4ff8d29",
      },
    ],
  },
] as const;
