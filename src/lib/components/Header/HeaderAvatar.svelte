<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import type { ComponentProps } from 'svelte';
  import * as Avatar from '../ui/avatar';
  import { cn } from '$lib/utils';

  type Props = ComponentProps<Avatar.Image> & {
    initials?: string;
  };

  const { src, initials = '', alt = 'Your profile picture', ...restProps }: Props = $props();
</script>

<Avatar.Root>
  <Avatar.Image {src} {alt} class={cn('h-10 w-10 rounded-full', restProps.class)} {...restProps} />
  <Avatar.Fallback class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
    {initials}
  </Avatar.Fallback>
</Avatar.Root>

<style lang="postcss">
</style>
