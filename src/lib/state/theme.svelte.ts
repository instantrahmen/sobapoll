import { createStore } from '$lib/utils/store.svelte';
import { getCSSVar, setCSSVar } from './background.svelte';

export type ThemeState = {
  averageColor: string;
  customColor: string | null;
};

export const averageColorDefault = getCSSVar('--bg-average-default');

const setAverageColorVar = (value: string) => {
  setCSSVar('--bg-average', value);
};

export const themeStore = createStore<ThemeState>(
  {
    averageColor: averageColorDefault,
    customColor: null,
  },
  'THEME_CTX',
  (newThemeState) => {
    console.log('new theme state', newThemeState);
    if (newThemeState.customColor) {
      return setAverageColorVar(newThemeState.customColor);
    }
    setAverageColorVar(newThemeState.averageColor);
  },
  () => {
    setAverageColorVar(averageColorDefault);
  }
);
