<script lang="ts">
  import Link from '$lib/components/Header/HeaderLink.svelte';
  import { Button } from '$lib/components/ui/button';
  import Icon from '@iconify/svelte';
  import { Sun, Moon, SunMoon, SoupIcon, Github } from 'lucide-svelte';
  import { mode as modeStore, toggleMode } from 'mode-watcher';

  let mode: 'light' | 'dark' | 'system' = $derived($modeStore || 'system'); // Just wrapping the mode store in a derived rune for more consistency

  const icons = {
    light: Moon,
    dark: Sun,
    system: SunMoon,
  };
</script>

<footer class="card rounded-none border-t px-4 py-2 md:m-2 md:rounded-lg md:border">
  <div class="container flex flex-wrap items-center justify-between px-0">
    <div class="flex items-center gap-2">
      <SoupIcon class="h-6 w-6" />
      <p>
        © 2023 <a
          href="https://erika.cafe"
          class="font-bold text-blue-800 hover:underline dark:text-blue-400"
        >
          Erika Cudd
        </a>
      </p>
    </div>

    <nav class="flex flex-wrap items-center gap-4">
      <!-- <a class="hover:underline" href="/">Privacy</a>
      <a class="hover:underline" href="/">Terms</a> -->
      <!-- <a class="hover:underline" href="/">Contact</a> -->

      <Link variant="ghost" size="icon" iconOnly icon="fa6-brands:github-alt" class="text-3xl" />

      <Button on:click={toggleMode} variant="ghost" size="icon">
        <Sun
          class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
        <Moon
          class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
        <span class="sr-only">Toggle theme</span>
      </Button>
      <!-- <Link on:click={toggleMode} variant="ghost" size="icon" iconOnly icon={icons[mode]}>
        Toggle theme to {mode === 'light' ? 'dark' : 'light'}
      </Link> -->
    </nav>
  </div>
</footer>
