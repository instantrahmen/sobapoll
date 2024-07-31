<script lang="ts">
  import Link from '$lib/components/Header/HeaderLink.svelte';
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
  <div class="container flex items-center justify-between px-0">
    <div class="flex items-center gap-2">
      <SoupIcon class="h-6 w-6" />
      <p>
        © 2023 <a
          href="https://cudd.io"
          class="font-bold text-blue-800 hover:underline dark:text-blue-400">Erika Cudd</a
        >
      </p>
    </div>

    <!-- <input
      type="color"
      name="theme-color"
      id="theme-color"
      bind:value={theme.state.customColor}
    />
    <Button on:click={() => (theme.state.customColor = null)} variant="ghost" size="icon">
      Reset
    </Button> -->

    <nav class="flex items-center gap-4">
      <a class="hover:underline" href="/"> Privacy </a>
      <a class="hover:underline" href="/"> Terms </a>
      <a class="hover:underline" href="/"> Contact </a>

      <Link variant="ghost" size="icon" iconOnly icon="fa6-brands:github-alt" class="text-3xl" />
      <Link on:click={toggleMode} variant="ghost" size="icon" iconOnly icon={icons[mode]}>
        Toggle theme to {mode === 'light' ? 'dark' : 'light'}
      </Link>
    </nav>
  </div>
</footer>
