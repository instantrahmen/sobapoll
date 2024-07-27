<script lang="ts">
  import type { Toast } from '$lib/state/toast.svelte';
  import { cn } from '$lib/utils';
  import { XIcon } from 'lucide-svelte';
  import { Button } from '$lib/components/ui/button';

  const {
    toast,
    onRemove,
  }: {
    toast: Toast;
    onRemove: (id: string) => void;
  } = $props();

  const toastClasses = {
    success: 'bg-green-500/40 text-black',
    error: 'bg-destructive/40 text-destructive-foreground',
    info: '',
    warning: '',
  };
</script>

<div class={cn('card rounded-xl border p-4', toastClasses[toast.type || 'info'])}>
  <Button
    size="icon"
    on:click={() => onRemove(toast.id)}
    variant="ghost"
    class="absolute right-2 top-2"
  >
    <XIcon />
  </Button>
  <h2 class="text-lg">{toast.title}</h2>
  <p class="text-sm">{toast.message}</p>
</div>

<style lang="postcss">
</style>
