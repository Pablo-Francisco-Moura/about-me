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
    information: "Para logar use: user: admin | password: 123",
  },
] as const;
