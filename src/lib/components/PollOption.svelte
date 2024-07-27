<script lang="ts" generics="ShowVotes extends boolean">
  import type { PollOption, PollWithPercentage } from '$lib/types/polls';
  import { cn } from '$lib/utils';
  import Icon from './Icon.svelte';
  import { Button } from './ui/button';
  import { Progress } from './ui/progress';
  import { themeStore } from '$lib/state/theme.svelte';
  import chroma from 'chroma-js';

  let {
    option,
    selected,
    onSelect,
    percentage,
    showVotes,
  }: {
    showVotes?: ShowVotes;
    selected: boolean;
    option: PollOption<ShowVotes>;
    percentage?: number;
    onSelect: (id: string) => void;
  } = $props();

  let id = $derived(option.id);

  const theme = themeStore();
  const progressClasses = `
    items-center whitespace-nowrap rounded-md text-sm
    font-medium ring-offset-background transition-colors
    border border-input h-10 justify-start gap-2 bg-card/50
    text-shadow-sm shadow-card
  `;

  const invertColor = (color: string): chroma.Color => {
    if (!color) return chroma('#000000');
    console.log('color', color);
    const colorChroma = chroma(color);
    const [r, g, b] = colorChroma.rgb();
    const rgb = chroma.rgb(255 - r, 255 - g, 255 - b);

    // max saturation and 50% lightness
    const inverted = rgb.set('hsl.l', 0.5).set('hsl.s', 1);

    return inverted;
  };

  let accentColor = $derived(theme.state.customColor || theme.state.averageColor);

  let invertedColor = $derived(invertColor(accentColor));
</script>

<!-- {showVotes}::{invertedColor} -->
{#if !showVotes}
  <Button
    class={cn('justify-start gap-2 border', selected ? 'bg-average' : '')}
    variant="glass"
    on:click={() => onSelect(id)}
    disabled={selected}
  >
    {#if option?.icon}
      <Icon icon={option!.icon} class="h-4 w-4" />
    {/if}
    {option?.title}
  </Button>
{:else}
  {@render optionWithVotes()}
{/if}

{#snippet optionWithVotes()}
  {@const id = option.id}
  <Progress
    class={cn(progressClasses, !selected ? 'bg-card/20' : '')}
    indicatorClass={cn(selected ? 'bg-average' : 'bg-primary/50')}
    value={percentage}
    max={100}
  >
    <!-- indicatorStyle={!selected ? `background-color: ${invertedColor.css()};` : ''} -->
    <div
      role="button"
      onclick={() => onSelect(id)}
      onkeydown={() => onSelect(id)}
      tabindex="0"
      class="
        flex h-10 w-full flex-row
        items-center justify-start gap-2
        whitespace-nowrap p-2
        px-4 text-sm font-medium text-card-foreground shadow-card
        ring-offset-background text-shadow-sm
    "
    >
      {#if option?.icon}
        <Icon icon={option!.icon} class="h-4 w-4 shadow-card drop-shadow-sm text-shadow-sm" />
      {/if}
      <span class="flex-1">
        {option?.title}
      </span>
      {#if option.votes}
        <span>{option?.votes}</span>
      {/if}
    </div>
  </Progress>
{/snippet}

<style lang="postcss">
</style>
