<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '$lib/utils/shadcn';
  import type { Snippet } from 'svelte';

  type Props = HTMLAttributes<HTMLParagraphElement> & {
    children: Snippet;
  };

  let { class: className, children, ...restProps }: Props = $props();
</script>

<p class={cn('text-sm text-muted/90', className)} {...restProps}>
  {@render children()}
</p>
