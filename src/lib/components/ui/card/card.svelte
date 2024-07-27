<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '$lib/utils/shadcn';
  import { type Snippet } from 'svelte';
  import { backgroundStore } from '$lib/state/background.svelte';

  type Props = HTMLAttributes<HTMLDivElement> & {
    children: Snippet;
    performant?: boolean;
  };

  let { class: className, performant = false, children, ...restProps }: Props = $props();

  const performantClasses = 'card-performant';
  let bgState = backgroundStore();

  $effect(() => {
    if (bgState.state.value) {
      console.log('bg.state.value state::', bgState.state.value);
    }
  });
</script>

<div class={cn(' border', performant ? performantClasses : 'card', className)} {...restProps}>
  {@render children()}
</div>
