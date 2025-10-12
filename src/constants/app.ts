import type { TypeContact, TypeWork } from "../types/app";
import emailImage from "../assets/email.jpg";
import gitHubImage from "../assets/gitHub.png";
import whatsappImage from "../assets/whatsapp.jpg";
import linkedInImage from "../assets/linkedIn.png";

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
    name: "whatsapp",
    link: "https://wa.me/5531975994719",
    image: whatsappImage,
  },
  {
    name: "email",
    link: "mailto:pablo.f.moura17@gmail.com",
    image: emailImage,
  },
  {
    name: "gitHub",
    link: "https://github.com/Pablo-Francisco-Moura",
    image: gitHubImage,
  },
  {
    name: "linkedIn",
    link: "https://www.linkedin.com/in/pablo-francisco-moura/",
    image: linkedInImage,
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
