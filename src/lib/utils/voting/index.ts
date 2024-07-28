import { stv } from './stv';

export type STVVote = {
  selection: {
    optionId: string;
  }[];
};

const getCandidates = <T extends STVVote>(votes: T[]): string[] => {
  // old version: votes.map((vote) => vote.selection.map((selection) => selection.optionId)),
  const candidates: string[] = [];
  votes.forEach((vote) => {
    vote.selection.forEach((selection) => {
      if (!candidates.includes(selection.optionId)) {
        candidates.push(selection.optionId);
      }
    });
  });
  return candidates;
};

export const calculateSTV = <T extends STVVote>(votes: T[]) => {
  const result = stv({
    seatsToFill: 1,
    candidates: getCandidates(votes),
    votes: votes.map((vote) => ({
      weight: 1,
      preferences: vote.selection.map((selection) => selection.optionId),
    })),
  });
  return result;
};
