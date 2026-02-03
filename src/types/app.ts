export type TypeContact = {
  name: string;
  link: string;
  image: string;
  tooltip: string;
};

export type TypeWork = {
  title: string;
  link: string;
  image?: string;
  description: string;
};

export type TypeLanguage = {
  code: TypeLanguageCode;
  label: string;
  color: string;
  countryCode: string;
};

export type TypeLanguageCode = "pt" | "en";

export type TypeMode = "light" | "dark";
