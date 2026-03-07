import { create } from "zustand";
import type { TypeMode, TypeLanguageCode } from "../types/app";
import i18n from "../settings/i18n";

interface PreferencesState {
  mode: TypeMode;
  setMode: (mode: TypeMode) => void;
  lang: TypeLanguageCode;
  setLang: (lang: TypeLanguageCode) => void;
}

export const usePreferencesStore = create<PreferencesState>((set) => ({
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
}));
