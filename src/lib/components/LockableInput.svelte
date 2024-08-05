<script context="module" lang="ts">
  export type FormProps = {
    submitOnLock?: boolean;
    action: string;
    method: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  };
</script>

<script lang="ts" generics="Form extends (FormProps | undefined)">
  import { cn } from '$lib/utils';
  import { Edit, Save } from 'lucide-svelte';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';

  type Props = {
    name: string;
    label: string;
    value: string;
    leadingLabel?: string;
    class?: string;
    onLock?: ({ form }: { form: HTMLFormElement | undefined }) => void;
    onUnlock?: ({ form }: { form: HTMLFormElement | undefined }) => void;
    asForm?: Form;
    startLocked?: boolean;
  };

  let {
    name,
    label,
    value = $bindable(''),
    leadingLabel,
    class: className = '',
    onLock,
    onUnlock,
    startLocked = true,
    asForm,
    ...restProps
  }: Props = $props();

  let locked = $state(startLocked);

  let form: HTMLFormElement | undefined = $state();

  function lockInput(e: Event) {
    e.preventDefault();
    locked = true;

    if (onLock) {
      if (asForm && asForm.submitOnLock) {
        form?.submit();
      }

      onLock({ form });
    }
  }

  function unlockInput(e: Event) {
    e.preventDefault();

    locked = false;

    if (onUnlock) {
      onUnlock({ form });
    }
  }
</script>

{#if asForm}
  <form
    bind:this={form}
    action={asForm.action}
    method={asForm.method}
    class={cn(className, 'w-full')}
    {...restProps}
  >
    {@render input()}
  </form>
{:else}
  {@render input()}
{/if}
{#snippet input()}
  <div class={cn('relative', className)}>
    <Input
      id={name}
      {name}
      placeholder={label}
      bind:value
      class={cn(
        'block w-full px-4 py-3 pe-20 text-sm disabled:cursor-default',
        leadingLabel && 'ps-20'
      )}
      required
      disabled={locked}
    />
    <div
      class="pointer-events-none absolute inset-y-0 start-0 z-20 flex w-[4.5rem] items-center rounded-l-lg border-r border-card/30 bg-white/30 ps-4 dark:bg-glass-darker"
    >
      <span class="text-bolder tracking-wide text-muted dark:text-white/90">{leadingLabel}</span>
    </div>
    <div class="absolute inset-y-0 end-0 flex items-center pe-px text-muted/60">
      {#if locked}
        <Button
          class="block w-full rounded-l-none border-transparent"
          variant="ghost"
          on:click={unlockInput}
        >
          <Edit />
        </Button>
      {:else}
        <Button
          variant="ghost"
          class="block w-full rounded-l-none border-transparent"
          on:click={lockInput}
        >
          <Save />
        </Button>
      {/if}
    </div>
  </div>
{/snippet}

<style lang="postcss">
</style>
