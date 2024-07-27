<!-- For some reason prettier breaks this file-->
<!-- prettier-ignore -->
<script lang="ts">
  import type { Poll, PollType, PollWithPercentage } from '$lib/types/polls';
  import * as Card from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import Icon from '$lib/components/Icon.svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '$lib/utils/shadcn';
  import { Progress } from '$lib/components/ui/progress';
  import PollOptionComponent from '../PollOption.svelte';

  let {
    poll,
    class: className,
    ...restProps
  }: HTMLAttributes<HTMLDivElement> & { poll: Poll<PollType.FPTP> } = $props();

  const getPercentages = (poll: Poll<PollType.FPTP>): PollWithPercentage[] => {
    let additionalVotes = 0;
    if (poll.selected) additionalVotes = 1;
    const totalVotes = (poll.options.reduce((acc, option) => acc + option.votes, 0) + additionalVotes);
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

<Card.Root id="poll-fptp" class={cn('my-4 rounded-xl', className)} {...restProps}>
  <Card.Header
    class="mx-auto flex flex-row items-center gap-4 space-y-0 px-4 pb-2 align-middle text-2xl"
  >
    <svelte:component this={poll.icon} class="h-6 w-6 align-middle text-2xl" />
    <h3 class="inline align-middle font-semibold">
      {poll.title}
    </h3>
  </Card.Header>
  <Card.Content class="mx-auto max-w-md px-4">
    <p class="text-card-foreground/85">
      {poll.description}
    </p>
    <div class="mt-4 grid gap-2">
      {#if !poll.selected}
        {#each poll.options as opt}
          {@const id = opt.id}
          {@const option = percentages.find((o) => o.id === id)}
          <PollOptionComponent
            option={option || opt}
            onSelect={() => (poll.selected = id)}
            selected={poll.selected === id}
          />
        {/each}
      {:else}
        {#each percentages as option}
          <PollOptionComponent
            showVotes
            {option}
            percentage={option.percentage}
            onSelect={() => (poll.selected = option.id)}
            selected={poll.selected === option.id}
          />
          <!-- {@render pollVotes({option})} -->
        {/each}
      {/if}
    </div>
  </Card.Content>
  <Card.Footer class="mx-auto flex flex-row items-center gap-4 px-4">
    <Button
      class="justify-start gap-2 bg-card/50"
      variant="outline"
      on:click={() => (poll.selected = null)}
    >
      Reset
    </Button>
  </Card.Footer>
</Card.Root>
