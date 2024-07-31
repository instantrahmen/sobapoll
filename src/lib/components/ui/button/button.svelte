<script lang="ts">
  import { Button as ButtonPrimitive } from 'bits-ui';
  import { type Events, type Props, buttonVariants } from './';
  import { cn } from '$lib/utils/shadcn.js';

  // type $$Props = Props;

  // type $$Events = Events;
  const { class: className, variant, size, builders, children, ...rest }: Props = $props();

  const restProps = {
    type: 'button',
    ...rest,
  };

  // let className: $$Props['class'] = undefined;
  // export let variant: $$Props['variant'] = 'default';
  // export let size: $$Props['size'] = 'default';
  // export let builders: $$Props['builders'] = [];
  // export { className as class };
</script>

<ButtonPrimitive.Root
  {builders}
  class={cn(buttonVariants({ variant, size, className }))}
  on:click
  on:keydown
  {...restProps as ButtonPrimitive.Props}
>
  {#if children}
    {@render children()}
  {/if}
</ButtonPrimitive.Root>
