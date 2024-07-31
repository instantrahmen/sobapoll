<script lang="ts">
  import Header from '$lib/components/Header';
  import { Sun, Moon, SunMoon, PlusIcon, PlusCircleIcon } from 'lucide-svelte';
  import { mode as modeStore, setMode, resetMode, toggleMode } from 'mode-watcher';
  import { page } from '$app/stores';

  PlusCircleIcon;
  let loggedIn = $state(false);

  let mode: 'light' | 'dark' | 'system' = $derived($modeStore || 'system'); // Just wrapping the mode store in a derived rune for more consistency

  const icons = {
    light: Moon,
    dark: Sun,
    system: SunMoon,
  };
</script>

<Header>
  {#snippet children({ Link, Avatar })}
    <!-- <Link on:click={toggleMode} variant="ghost" size="icon" iconOnly icon={icons[mode]}>
      Toggle theme to {mode === 'light' ? 'dark' : 'light'}
    </Link> -->
    <!-- <Link variant="link" href="/polls/{crypto.randomUUID()}">Polls</Link> -->
    {#if loggedIn}
      <!-- TODO: Create user dropdown menu -->
      <Avatar src={''} alt="Avatar" class="h-10 w-10" />
    {:else}
      <Link variant="glass-secondary" class="hover:shadow-lg" href="/auth/login">Login</Link>
      <Link variant="glass-primary" class="hover:shadow-lg" href="/auth/register">Register</Link>
    {/if}

    <!-- <Link variant="glass-primary" class="hover:shadow-lg" href="/">Create Poll</Link> -->
    <Link variant="glass-neutral" size="icon" iconOnly icon={PlusIcon} class="text-3xl" />
  {/snippet}
</Header>
