// css background state

import { browser } from '$app/environment';
import { createStore, type Store } from '$lib/utils/store.svelte';

export type BackgroundState = {
  value: string;
};

export const setCSSVar = (name: string, value: string) => {
  if (browser) {
    document.documentElement.style.setProperty(name, value);
  }
}

export const getCSSVar = (name: string) => {
  if (browser) {
    return getComputedStyle(document.documentElement).getPropertyValue(name);
  }

  return '';
}

export const initialValue = getCSSVar('--page-background');


export const backgroundStore = createStore<BackgroundState>({
  value: '',
}, 'BACKGROUND_CTX');

// export const setBackground = (value: string, bgState?: Store<BackgroundState>) => {
//   bgState = bgState ?? backgroundStore();
  
//   if (bgState.state.value === value) return;
//   bgState.state.value = value;
//   // if (browser) {
//   //   console.log('setting background', value);
//   //   document.documentElement.style.setProperty('--page-background', value);
//   // }
// };

// export const background = (): string => $state('');

// export const setBackground = (value: string) => {
//   let bg = background();
//   if (bg === value) return;
//   bg = value;
//   document.documentElement.style.setProperty('--page-background', value);
// }