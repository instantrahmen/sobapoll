import type { ComponentType } from 'svelte';
import * as Lucide from 'lucide-svelte';

export type LucideKey = keyof typeof Lucide;
export type ValidIcon = ComponentType | LucideKey;

export enum PollType {
  FPTP = 'fptp', // First Past the Post
  STV = 'stv', // Single Transferable Vote
}

export type SelectedOptions = {
  [PollType.FPTP]: string | null;
  [PollType.STV]: string[];
};

export type Poll<T extends PollType, ShowVotes extends boolean = boolean> = {
  type: T;
  id: string;
  title: string;
  description: string;
  image: string;
  imageDark: string;
  icon: ComponentType;
  showVotes: ShowVotes;
  options: PollOption<ShowVotes>[];
  selected: SelectedOptions[T];
};

export type PollOption<ShowVotes extends boolean> = {
  id: string;
  title: string;
  votes: ShowVotes extends true ? number : never;
  description?: string;
  icon?: ValidIcon;
};

// export type PollOptionNoVotes = _PollOption<false> & {
//   votes: never;
// };

export type PollWithPercentage = PollOption<true> & {
  percentage: number;
};

// export type PollOption = PollOptionNoVotes | PollWithPercentage;
// // export type PollWithPercentage = PollOption<true> & {
// //   percentage: number;
// // };