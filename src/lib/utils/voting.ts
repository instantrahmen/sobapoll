import { stv } from 'stv';

export type STVVote = {
  selection: {
    optionId: string;
  }[];
};

export const calculateSTV = <T extends STVVote>(votes: T[]) => {
  const result = stv({
    seatsToFill: 1,
    candidates: votes.map((vote) => vote.selection.map((selection) => selection.optionId)),
    votes: votes.map((vote) => ({
      weight: 1,
      preferences: vote.selection.map((selection) => selection.optionId),
    })),
  });
  return result;
};
