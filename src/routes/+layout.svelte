<script>
  import '../app.pcss';
  import { SoupIcon } from 'lucide-svelte';
  import Header from '$lib/components/Header.svelte';
  import { ModeWatcher } from 'mode-watcher';
</script>

<ModeWatcher />

<div class="flex min-h-dvh flex-col">
  <Header />

  <div class="flex-1">
    <slot />
  </div>

  <footer class="card rounded-none border-t p-4">
    <div class="container flex items-center justify-between px-0">
      <div class="flex items-center gap-2">
        <SoupIcon class="h-6 w-6" />
        <p>© 2023 SobaPoll. All rights reserved.</p>
      </div>
      <nav class="flex items-center gap-4">
        <a class="hover:underline" href="/"> Privacy </a>
        <a class="hover:underline" href="/"> Terms </a>
        <a class="hover:underline" href="/"> Contact </a>
      </nav>
    </div>
  </footer>
</div>
