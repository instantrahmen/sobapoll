<script lang="ts">
  import { Moon, SoupIcon, Sun } from 'lucide-svelte';
  import { Button } from './ui/button';
  import { toggleMode } from 'mode-watcher';
  import cuid from 'cuid';
  import * as Avatar from './ui/avatar/';
  import { themeStore } from '$lib/state/theme.svelte';
  import { cn } from '$lib/utils';

  // TODO: Add actual logged in check
  let loggedIn = $state(false);
  let tempAvatarImage = $state('https://placewaifu.com/image/100');

  let theme = themeStore();

  // Opacity from 0 to 1 based on scroll position with a max of 100px
  const getOpacity = (scrollAmount = 0) => {
    return Math.min(scrollAmount / 100, 1) * 0.15;
  };

  // let hasScrolled = $state(false);
  let scrollAmount = $state(0);

  let opacity = $derived(getOpacity(scrollAmount));
</script>

<svelte:window
  on:scroll={() => {
    scrollAmount = window.scrollY;
    // hasScrolled = window.scrollY > 100;
  }}
/>

<header
  class={cn(
    `sticky top-0 z-20 flex items-center justify-between rounded-none p-4 transition-colors duration-100 ease-in`,
    `card`
  )}
>
  <a class="flex items-center gap-2" href="/">
    <SoupIcon class="h-6 w-6" />

    <h1 class="text-xl font-bold tracking-wider">SobaPoll</h1>
  </a>
  <nav class="flex items-center gap-4">
    <Button on:click={toggleMode} variant="ghost" size="icon">
      <Sun
        class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <Moon
        class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
      <span class="sr-only">Toggle theme</span>
    </Button>
    <a class="hover:underline" href="/"> Home </a>
    <a class="hover:underline" href="/polls/{cuid()}"> Polls </a>
    <Button variant="glass-primary" class="hover:shadow-lg" href="/">Create Poll</Button>
    {#if loggedIn}
      <!-- Avatar dropdown -->
      <Avatar.Root>
        <Avatar.Image
          src={tempAvatarImage}
          alt="Your profile picture"
          class="h-10 w-10 rounded-full"
        />
        <Avatar.Fallback
          class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400"
        >
          EC
        </Avatar.Fallback>
      </Avatar.Root>
    {:else}
      <Button variant="glass-neutral" class="hover:shadow-lg" on:click={() => (loggedIn = true)}
        >Login</Button
      >
    {/if}
  </nav>
</header>
