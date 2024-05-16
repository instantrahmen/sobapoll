<script lang="ts">
  import { Moon, SoupIcon, Sun } from 'lucide-svelte';
  import { Button } from './ui/button';
  import { toggleMode } from 'mode-watcher';
  import cuid from 'cuid';
</script>

<header class="card sticky top-0 z-20 flex items-center justify-between rounded-none border-b p-4">
  <a class="flex items-center gap-2" href="/">
    <SoupIcon class="h-6 w-6" />
    <h1 class="text-xl font-bold">SobaPoll</h1>
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
    <a class="hover:underline" href="/"> Create Poll </a>
    <a class="hover:underline" href="/"> Profile </a>
  </nav>
</header>
