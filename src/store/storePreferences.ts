import { create } from "zustand";
import type { TypeMode, TypeLanguageCode } from "../types/app";
import i18n from "../settings/i18n";

interface PreferencesState {
  mode: TypeMode;
  setMode: (mode: TypeMode) => void;
  lang: TypeLanguageCode;
  setLang: (lang: TypeLanguageCode) => void;
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
}

const getIsMobile = () =>
  typeof window !== "undefined" ? window.innerWidth <= 650 : false;

export const usePreferencesStore = create<PreferencesState>((set) => {
  const updateIsMobile = () => set({ isMobile: getIsMobile() });

  if (typeof window !== "undefined") {
    window.addEventListener("resize", updateIsMobile);
    updateIsMobile();
  }

  return {
    mode: (localStorage.getItem("themeMode") as TypeMode) || "light",
    setMode: (mode) => {
      localStorage.setItem("themeMode", mode);
      set({ mode });
    },
    lang: (i18n.language as TypeLanguageCode) || "en",
    setLang: (lang) => {
      i18n.changeLanguage(lang);
      set({ lang });
    },
    isMobile: getIsMobile(),
    setIsMobile: (isMobile) => set({ isMobile }),
  };
});
