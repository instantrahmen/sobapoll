<script lang="ts">
  import type { Poll, PollType, PollOption, PollWithPercentage } from '$lib/types/polls';
  import * as Card from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import Icon from '$lib/components/Icon.svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '$lib/utils/shadcn';
  import { Progress } from '$lib/components/ui/progress';

  let {
    poll,
    class: className,
    ...restProps
  }: HTMLAttributes<HTMLDivElement> & { poll: Poll<PollType.FPTP> } = $props();

  const getPercentages = (poll: Poll<PollType.FPTP>) => {
    let additionalVotes = 0;
    if (poll.selected) additionalVotes = 1;
    const totalVotes =
      poll.options.reduce((acc, option) => acc + option.votes, 0) + additionalVotes;
    return poll.options.map((option) => {
      let actualVotes = option.votes;
      if (poll.selected === option.id) actualVotes += 1;
      const percentage = (option.votes / totalVotes) * 100;
      return {
        ...option,
        votes: actualVotes,
        percentage,
      };
    });
  };

  let percentages: PollWithPercentage[] = $derived(getPercentages(poll));
</script>

<style lang="postcss">
</style>
