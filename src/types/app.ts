export type TypeContact = {
  name: string;
  link: string;
  image: string;
  tooltip: string;
};

type TypeFile = {
  name: string;
  link: string;
};

export type TypeWork = {
  title: string;
  link: string;
  image?: string;
  description: string;
  information: string[];
  files?: TypeFile[];
};
