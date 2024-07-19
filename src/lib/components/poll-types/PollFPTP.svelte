<script lang="ts">
  import type { Poll, PollType, PollOption } from '$lib/types/polls';
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

  type PollWithPercentage = PollOption<true> & {
    percentage: number;
  };

  let percentages: PollWithPercentage[] = $derived(getPercentages(poll));
</script>

<Card.Root class={cn('rounded-xl my-4', className)} {...restProps}>
  <Card.Header class="mx-auto flex flex-row items-center gap-4 space-y-0 px-4 pb-2 align-middle text-2xl">
    <svelte:component this={poll.icon} class="align-middle text-2xl h-6 w-6" />
    <h3 class="inline align-middle font-semibold">
      {poll.title}
    </h3>
  </Card.Header>
  <Card.Content class="mx-auto max-w-md px-4">
    <p class="text-card-foreground/85">
      {poll.description}
    </p>
    <div class="mt-4 grid gap-2">
      {#if !poll.selected }
        {#each poll.options as option}
          {@const id = option.id}
          {@render pollOptions({opt: option})}
        {/each}
      {:else}
        {#each percentages as option}
          {@render pollVotes({option})}
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

{#snippet pollOptions({opt}: {opt: PollOption<true>})}
  {@const id = opt.id}
  {@const option = percentages.find((o) => o.id === id)}
  <Button
    class={cn('justify-start gap-2 bg-card/50', poll.selected === id ? 'bg-primary' : '')}
    variant="outline"
    on:click={() => (poll.selected = id)}
    disabled={poll.selected === id}
  >
    {#if option?.icon}
      <Icon icon={option!.icon} class="h-4 w-4" />
    {/if}
    {option?.title}
    <!-- {#if poll.showVotes}
      {option?.votes}
    {/if} -->
  </Button>
{/snippet}

{#snippet pollVotes({option}: {option: PollWithPercentage})}
  {@const id = option.id}
  <Progress
    class={cn(`
      items-center whitespace-nowrap rounded-md text-sm
      font-medium ring-offset-background transition-colors
      border border-input h-10 justify-start gap-2 bg-card/50
      text-shadow-sm shadow-card
    `, poll.selected !== id ? 'bg-card/20' : '')}
    indicatorClass={cn(poll.selected === id ? 'bg-secondary light' : 'bg-primary/20')}
    value={option?.percentage}
    max={100}
  >
    <div 
      role="button"
      onclick={() => (poll.selected = id)}
      onkeydown={() => (poll.selected = id)}
      tabindex="0"
      class="
        p-2 w-full flex flex-row
        items-center whitespace-nowrap text-sm
        font-medium ring-offset-background
        h-10 justify-start gap-2 px-4
    ">
        {#if option?.icon}
          <Icon icon={option!.icon} class="h-4 w-4 text-shadow-sm shadow-card drop-shadow-sm" />
        {/if}
        <span class="flex-1">
          {option?.title}
        </span>
        {#if poll.showVotes}
          <span>{option?.votes}</span>
        {/if}
    </div>
  </Progress>
{/snippet}
