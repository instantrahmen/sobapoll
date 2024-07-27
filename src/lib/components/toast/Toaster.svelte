<script lang="ts">
  import Toast from './Toast.svelte';
  import {
    getToastState,
    setToastState,
    type PartialToast,
    type Toast as ToastType,
  } from '$lib/state/toast.svelte';

  const testToast: PartialToast = {
    title: 'Test Toast',
    message: 'This is a test toast.',
    type: 'success',
  };

  setToastState();

  const toastState = getToastState();
</script>

<div class=" absolute right-2 top-2 z-50 flex min-w-52 flex-col gap-2">
  <!-- <Toast {toast} /> -->
  {#each toastState.toasts as toast}
    <Toast {toast} onRemove={toastState.remove} />
  {/each}
</div>

<!-- Test button -->
<div class="absolute bottom-10 right-2">
  <button
    on:click={() => {
      toastState.add(testToast);
    }}
  >
    Add Toast
  </button>
</div>

<style lang="postcss">
</style>
