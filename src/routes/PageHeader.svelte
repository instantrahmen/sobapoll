<script lang="ts">
  import Header from '$lib/components/Header';
  import { Sun, Moon } from 'lucide-svelte';
  import { toggleMode, mode as modeStore } from 'mode-watcher';
  import { page } from '$app/stores';

  let loggedIn = $state(false);

  let mode = $derived($modeStore); // Just wrapping the mode store in a derived rune for more consistency
</script>

<Header>
  {#snippet children({ Link, Avatar })}
    <Link
      on:click={toggleMode}
      variant="ghost"
      size="icon"
      iconOnly
      icon={mode === 'light' ? Moon : Sun}
    >
      Toggle theme to {mode === 'light' ? 'dark' : 'light'}
    </Link>
    <Link variant="link" href="/">Home</Link>
    <Link variant="link" href="/polls/{crypto.randomUUID()}">Polls</Link>
    <Link variant="glass-primary" class="hover:shadow-lg" href="/">Create Poll</Link>
    {#if loggedIn}
      <!-- Avatar dropdown -->
      <Avatar src={''} alt="Avatar" class="h-10 w-10" />
    {:else}
      <Link variant="glass-neutral" class="hover:shadow-lg" on:click={() => (loggedIn = true)}>
        Login
      </Link>
    {/if}
  {/snippet}
</Header>
