<script lang="ts">
  import CircleUser from 'lucide-svelte/icons/circle-user';
  import Menu from 'lucide-svelte/icons/menu';
  import Package2 from 'lucide-svelte/icons/package-2';
  import Search from 'lucide-svelte/icons/search';

  import { Button } from '$lib/components/ui/button/';
  import * as Card from '$lib/components/ui/card/';
  import { Checkbox } from '$lib/components/ui/checkbox/';
  import { Input } from '$lib/components/ui/input/';
  import HeaderLink from '$lib/components/Header/HeaderLink.svelte';

  import type { ComponentType } from 'svelte';
  import { page } from '$app/stores';
  import { cn } from '$lib/utils';

  const { children } = $props();
  type NavLink = {
    name: string;
    href: string;
    icon?: ComponentType;
  };

  let navLinks: NavLink[] = [
    {
      name: 'General',
      href: '/my/settings',
    },
    {
      name: 'Profile',
      href: '/my/settings/profile',
    },
    {
      name: 'Integrations',
      href: '/my/settings/integrations',
    },
    {
      name: 'Advanced',
      href: '/my/settings/advanced',
    },
  ];

  const getActiveLink = () => {
    const activeLinkIndex = navLinks.findIndex((link) => link.href === $page.url.pathname);
    return activeLinkIndex;
  };

  let activeLink = $derived(getActiveLink());
</script>

<div class="flex min-h-screen w-full flex-col">
  <div
    class="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 px-0 md:gap-8 md:px-2"
  >
    <div class="card mx-auto grid w-full max-w-screen-2xl gap-2 rounded-none md:rounded-lg">
      <h2 class="m-0 p-4 text-center text-3xl font-semibold tracking-wide">Settings</h2>
    </div>
    <div
      class="max-w-screen-lg-2xl mx-auto grid w-full items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]"
    >
      <nav
        class="card flex h-full flex-col justify-start gap-4 rounded-none border p-4 md:rounded-lg"
        data-x-chunk-container="chunk-container after:right-0"
      >
        {#each navLinks as link, index (index)}
          <HeaderLink
            href={link.href}
            variant="ghost"
            class={cn(
              'justify-start text-left',
              index === activeLink && 'bg-glass-white/30 font-bold dark:bg-glass-darker '
            )}
            icon={link.icon || undefined}
          >
            {link.name}
          </HeaderLink>
        {/each}
      </nav>
      {@render children()}
    </div>
  </div>
</div>
