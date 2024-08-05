<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import { cn } from '$lib/utils';
  import type { ComponentType, ComponentProps } from 'svelte';
  import Icon from '$lib/components/Icon.svelte';
  import type { ValidIcon } from '$lib/types/polls';
  import type { ButtonEventHandler } from 'bits-ui';
  // prop types from Button
  type Props = ComponentProps<Button> & {
    icon?: ValidIcon;
    iconOnly?: boolean;
    onClick?: (e: ButtonEventHandler<MouseEvent>) => void;
  };

  const { icon, onClick, children, iconOnly, ...buttonProps }: Props = $props();

  const linkClasses = `p-0`;

  const handleClick = (e: ButtonEventHandler<MouseEvent>) => {
    if (onClick) {
      onClick(e);
    }
  };
</script>

<Button on:click={handleClick} class={cn(linkClasses, buttonProps.class)} {...buttonProps}>
  {#if icon}
    <!-- if icon is snippet -->
    <Icon {icon}></Icon>
  {/if}
  {#if children}
    <span class:sr-only={iconOnly}>
      {@render children()}
    </span>
  {/if}
</Button>

<style lang="postcss">
</style>
