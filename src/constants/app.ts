import type { TypeContact, TypeWork } from "../types/app";
import gmailImage from "../assets/gmail.png";
import gitHubImage from "../assets/gitHub.png";
import whatsappImage from "../assets/whatsapp.png";
import linkedInImage from "../assets/linkedin.png";
import myGuidelinesImage from "../assets/myGuidelines.png";
import financeManagerImage from "../assets/financeManager.png";

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
    tooltip: "contacts.whatsapp",
  },
  {
    name: "Email",
    link: "mailto:pablo.f.moura17@gmail.com",
    image: gmailImage,
    tooltip: "contacts.email",
  },
  {
    name: "GitHub",
    link: "https://github.com/Pablo-Francisco-Moura",
    image: gitHubImage,
    tooltip: "contacts.gitHub",
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/pablo-francisco-moura/",
    image: linkedInImage,
    tooltip: "contacts.linkedIn",
  },
] as const;

export const WORKS: TypeWork[] = [
  {
    link: "https://finance-manager-eight-beta.vercel.app",
    title: "finance_manager.title",
    image: financeManagerImage,
    description: "finance_manager.description",
  },
  {
    title: "Minhas diretrizes",
    link: "https://my-guidelines.vercel.app",
    image: myGuidelinesImage,
    description: "my_guidelines.description",
  },
] as const;
