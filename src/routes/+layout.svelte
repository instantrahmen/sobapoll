<script lang="ts">
  import '../app.pcss';
  import { SoupIcon, PlusIcon, BellPlus } from 'lucide-svelte';
  import { ModeWatcher, mode } from 'mode-watcher';
  import { SideMenu } from '@leveluptuts/svelte-side-menu';
  import { backgroundStore } from '$lib/state/background.svelte';
  import { afterNavigate, beforeNavigate } from '$app/navigation';
  import { getAverageImageColor } from '$lib/utils';
  import { averageColorDefault, themeStore } from '$lib/state/theme.svelte';

  import { Button } from '$lib/components/ui/button';
  import chroma from 'chroma-js';
  import Toaster from '$lib/components/toast/Toaster.svelte';
  import Link from '$lib/components/Header/HeaderLink.svelte';
  import PageHeader from './PageHeader.svelte';
  import PageFooter from './PageFooter.svelte';
  import { getToastState, setToastState } from '$lib/state/toast.svelte';
  import { UsersRoleOptions } from '$lib/types/gen/pocketbase-types';

  setToastState();
  const toastState = getToastState();

  const { children, data } = $props();

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

{#if data.user && data.user.role === UsersRoleOptions.ADMIN}
  <SideMenu
    right
    top="5rem"
    theme="dark"
    nub="🩷"
    links={[
      {
        text: 'Side Menu',
      },
      {
        text: 'Login',
        path: '/auth/login',
      },
      {
        text: 'Register',
        path: '/auth/register',
      },
      {
        text: 'My::Dashboard',
        path: '/my/dashboard',
      },
      {
        text: 'My::Polls',
        path: '/my/polls',
      },
      {
        text: 'My::Profile',
        path: '/my/profile',
      },
      {
        text: 'My::Settings',
        path: '/my/settings',
      },
      {
        text: 'Admin::Users',
        path: '/admin/users',
      },
      {
        text: 'Example Poll',
        path: '/polls/example',
      },
    ]}
  >
    <pre class="overflow-scroll bg-slate-800 font-mono text-sm text-slate-100">
{JSON.stringify(data, null, 2)}
  </pre>
  </SideMenu>
{/if}

<!-- FAB bar -->
<div class="fixed bottom-20 right-5 z-50 flex flex-row justify-end gap-4">
  <!-- FAB button -->
  <Link
    variant="glass-neutral"
    size="icon"
    iconOnly
    icon={PlusIcon}
    class="rounded-full text-3xl"
  />
  <Link
    variant="glass-neutral"
    size="icon"
    iconOnly
    icon={BellPlus}
    onClick={() => {
      toastState.add({
        title: 'Test Toast',
        message: 'This is a test toast.',
        type: 'success',
      });
    }}
    class="rounded-full text-3xl"
  />
</div>

<div class="flex min-h-dvh flex-col transition-all ease-in">
  <PageHeader />

  <div class="flex-1">
    {@render children()}
  </div>

  <PageFooter></PageFooter>
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
