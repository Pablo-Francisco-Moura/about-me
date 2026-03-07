import type {
  TypeWork,
  TypeSkill,
  TypeContact,
  TypeLanguage,
} from "../types/app";
import gmailImage from "../assets/gmail.png";
import gitHubImage from "../assets/gitHub.png";
import whatsappImage from "../assets/whatsapp.png";
import linkedInImage from "../assets/linkedin.png";
import miniKanbanImage from "../assets/miniKanban.png";
import myGuidelinesImage from "../assets/myGuidelines.png";
import financeManagerImage from "../assets/financeManager.png";
import brImage from "../assets/flag-br.svg";
import usImage from "../assets/flag-us.svg";

export const SKILLS: TypeSkill[] = [
  {
    name: "React",
    link: "https://react.dev/",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    blocked: false,
  },
  {
    name: "TypeScript",
    link: "https://www.typescriptlang.org/",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    blocked: false,
  },
  {
    name: "JavaScript",
    link: "https://www.javascript.com/",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    blocked: true,
  },
  {
    name: "HTML",
    link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    blocked: true,
  },
  {
    name: "CSS",
    link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    blocked: true,
  },
  {
    name: "Node.js",
    link: "https://nodejs.org/",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    blocked: false,
  },
  {
    name: "Docker",
    link: "https://www.docker.com/",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    blocked: true,
  },
  {
    name: "Git",
    link: "https://git-scm.com/",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    blocked: false,
  },
  {
    name: "Vite",
    link: "https://vitejs.dev/",
    image: "https://vite.dev/logo-without-border.svg",
    blocked: false,
  },
  {
    name: "VitePress",
    link: "https://vitepress.dev/",
    image: "https://vitepress.dev/vitepress-logo-large.svg",
    blocked: false,
  },
  {
    name: "Next.js",
    link: "https://nextjs.org/",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    blocked: true,
  },
  {
    name: "PorstgreSQL",
    link: "https://www.postgresql.org/",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    blocked: true,
  },
  {
    name: "NestJS",
    link: "https://nestjs.com/",
    image: "https://nestjs.com/img/logo-small.svg",
    blocked: false,
  },
  {
    name: "Prisma",
    link: "https://www.prisma.io/",
    image: "https://www.prisma.io/favicon.ico",
    blocked: true,
  },
  {
    name: "Django",
    link: "https://www.djangoproject.com/",
    image: "https://static.djangoproject.com/img/logo-dj.462bae7a9243.svg",
    blocked: true,
  },
  {
    name: "Python",
    link: "https://www.python.org/",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    blocked: true,
  },
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
    link: "https://mini-kanban-portal.vercel.app/",
    title: "miniKanban.title",
    image: miniKanbanImage,
    description: "miniKanban.description",
  },
  {
    link: "https://my-guidelines.vercel.app",
    title: "my_guidelines.title",
    image: myGuidelinesImage,
    description: "my_guidelines.description",
  },
] as const;

export const LANGUAGES: TypeLanguage[] = [
  {
    code: "pt",
    label: "Português",
    image: brImage,
    color: "#3E9A00",
    countryCode: "br",
  },
  {
    code: "en",
    label: "English",
    image: usImage,
    color: "#3C3B6E",
    countryCode: "us",
  },
] as const;
