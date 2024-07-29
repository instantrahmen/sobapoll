<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import { cn } from '$lib/utils';
  import type { ComponentType, Snippet, ComponentProps } from 'svelte';

  // prop types from Button
  type Props = ComponentProps<Button> & {
    icon?: string | ComponentType;
    iconOnly?: boolean;
  };

  const { icon, children, iconOnly, ...buttonProps }: Props = $props();

  let link = $derived(buttonProps.variant === 'link');

  const linkClasses = `p-0`;
</script>

<Button class={cn(linkClasses, buttonProps.class)} {...buttonProps}>
  {#if icon}
    <svelte:component this={icon} />
  {/if}
  <span class:sr-only={iconOnly}>{@render children()}</span>
</Button>

<style lang="postcss">
</style>
