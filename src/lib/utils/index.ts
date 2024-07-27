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



export * from './color-utils.svelte'