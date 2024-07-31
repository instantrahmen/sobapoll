<script lang="ts" generics="T extends Record<string, unknown>">
  import Portal from 'svelte-portal';
  import { Button } from '$lib/components/ui/button';
  import { Atom } from 'lucide-svelte';
  import Icon from '@iconify/svelte';

  const {
    inspectState = $bindable(),
  }: {
    inspectState: T;
  } = $props();

  let isOpen: boolean = $state(false);

  let keys: string[] = $derived(Object.keys(inspectState || {}));
</script>

<!-- <Portal target="body"> -->
<Button
  on:click={() => (isOpen = !isOpen)}
  size="icon"
  variant="glass-neutral"
  class="fixed right-0 top-20 z-50 h-16 w-16 rounded-none rounded-l-lg text-8xl"
>
  <Atom size="42" />
  <!-- <Icon icon="lucide:atom" /> -->
  <!-- console.log(' :', ); -->
</Button>

<div
  class="card grid-col-2 fixed top-40 grid rounded-none rounded-l-lg border p-4 transition-all"
  class:right-[-300px]={!isOpen}
  class:right-0={isOpen}
>
  {#if isOpen}
    {#each keys as key}
      <span class="font-bold text-primary">{key}</span>
      <span class="card rounded bg-secondary-foreground/75 p-2 font-mono text-sm text-secondary"
        >{inspectState[key]}</span
      >
    {/each}
  {/if}
</div>

<!-- </Portal> -->

<style lang="postcss">
</style>
