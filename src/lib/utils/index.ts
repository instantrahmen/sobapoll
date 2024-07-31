export * from './shadcn';

export const serializeNonPOJOs = <T = unknown>(obj: T) => {
  return structuredClone(obj);
};

type ItemWithId = { id: number | string };
export const dedupItems = <T extends ItemWithId>(input: T[]): T[] => {
  return input.reduce((accumulator, current) => {
    const exists = accumulator.find((item) => {
      return item.id === current.id;
    });

    if (!exists) {
      accumulator = accumulator.concat(current);
    }

    return accumulator;
  }, [] as T[]);
};

export const repeat = (numberOfRepeats: number, fn: (i: number) => void) => {
  for (let i = 0; i < numberOfRepeats; i++) {
    fn(i);
  }
};

export const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const toTitleCase = (str: string) => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export * from './color-utils.svelte';
