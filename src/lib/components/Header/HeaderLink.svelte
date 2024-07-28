<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import type { ComponentType, Snippet, ComponentProps } from 'svelte';

  // prop types from Button
  type Props = ComponentProps<Button> & {
    icon: string | ComponentType;
  };

  const { icon, children, ...buttonProps }: Props = $props();
</script>

<Button {...buttonProps}>
  <svelte:component this={icon} />
  <span class="sr-only">{@render children()}</span>
</Button>

<style lang="postcss">
</style>
