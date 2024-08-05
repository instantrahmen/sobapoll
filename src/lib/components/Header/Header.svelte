<script lang="ts">
  import { SoupIcon } from 'lucide-svelte';
  import { cn } from '$lib/utils';
  import type { ComponentType, Snippet } from 'svelte';
  import HeaderLink from './HeaderLink.svelte';
  import HeaderAvatar from './HeaderAvatar.svelte';

  const childComponents = {
    Link: HeaderLink,
    Avatar: HeaderAvatar,
  };

  type Props = {
    children: Snippet<[childProps: typeof childComponents]>;
    class: string;
  };

  const { children, class: className }: Props = $props();
</script>

<header
  class={cn(
    'card',
    'sticky top-0 z-20 flex items-center justify-between rounded-none',
    'mb-2 border-b p-2 px-4 transition-colors duration-100 ease-in',
    'md:top-2 md:mx-2 md:rounded-md md:border',
    className
  )}
>
  <a class="flex items-center gap-2" href="/">
    <SoupIcon class="h-6 w-6" />
    <h1 class="text-xl font-bold tracking-wider">SobaPoll</h1>
  </a>
  <nav class="flex items-center gap-4">
    {@render children(childComponents)}
  </nav>
</header>
