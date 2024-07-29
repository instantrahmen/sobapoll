<script lang="ts">
  import '../app.pcss';
  import { SoupIcon } from 'lucide-svelte';
  import { ModeWatcher, mode } from 'mode-watcher';
  import { backgroundStore } from '$lib/state/background.svelte';
  import { afterNavigate, beforeNavigate } from '$app/navigation';
  import { getAverageImageColor } from '$lib/utils';
  import { averageColorDefault, themeStore } from '$lib/state/theme.svelte';

  import { Button } from '$lib/components/ui/button';
  import chroma from 'chroma-js';
  import Toaster from '$lib/components/toast/Toaster.svelte';
  import PageHeader from './PageHeader.svelte';

  const { children } = $props();

  let bgState = backgroundStore();

  let background = backgroundStore();
  let theme = themeStore();

  const setBgColor = async (color: string = '') => {
    if (!color) {
      return (theme.state.averageColor = averageColorDefault);
    }
    const colorObject: chroma.Color = await getAverageImageColor(background.state.value);

    // Return the average color but with max saturation and 50% lightness
    // We're only using this to mix in order to get the glass color. Without max saturation and 50% lightness it ends up being basically black or white
    const cssColor = colorObject.set('hsl.s', 1).set('hsl.l', 0.5).css('hsl');

    theme.state.averageColor = cssColor;
  };

  // HACK: basically just a dependency array for $effect. Does nothing else.
  // TODO: Refactor to remove this, as dependency arrays are gross
  const watch = (deps: any[]) => deps;

  $effect(() => {
    watch([bgState.state.value, $mode]);
    if (bgState.state.value) {
      console.log('state::', bgState.state.value);
      setBgColor(bgState.state.value);
    } else {
      console.log('no state', bgState.state.value);
      // theme.reset();
    }
  });

  beforeNavigate(() => {
    bgState.state.value = '';
    theme.reset();
  });

  afterNavigate(() => {
    setBgColor(bgState.state.value);
  });

  let loggedIn = $state(false);

  const tempAvatarImage = 'https://i.pravatar.cc/300';
</script>

<!-- Handlesd switching between light and dark mode -->
<ModeWatcher />
<Toaster />

<div class="flex min-h-lvh flex-col">
  <PageHeader />

  <div class="flex-1">
    {@render children()}
  </div>

  <footer class="card rounded-none border-t p-4">
    <div class="container flex items-center justify-between px-0">
      <div class="flex items-center gap-2">
        <SoupIcon class="h-6 w-6" />
        <p>© 2023 SobaPoll. All rights reserved.</p>
      </div>

      <input
        type="color"
        name="theme-color"
        id="theme-color"
        bind:value={theme.state.customColor}
      />
      <Button on:click={() => (theme.state.customColor = null)} variant="ghost" size="icon">
        Reset
      </Button>

      <nav class="flex items-center gap-4">
        <a class="hover:underline" href="/"> Privacy </a>
        <a class="hover:underline" href="/"> Terms </a>
        <a class="hover:underline" href="/"> Contact </a>
      </nav>
    </div>
  </footer>
</div>

<!-- Preview colors for debugging -->
<!-- TODO: Move to a component -->
{#snippet colorPreview(name: string, color: string)}
  <span
    class="inline-block aspect-square rounded-xl border border-violet-600 p-3 text-sm"
    style="background-color: {color}"
  >
    {name}
    {color}
  </span>
{/snippet}

<style lang="postcss">
</style>
