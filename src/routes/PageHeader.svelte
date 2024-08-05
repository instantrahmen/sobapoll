<script lang="ts">
  import Header from '$lib/components/Header';
  import * as Dropdown from '$lib/components/ui/dropdown-menu';
  import {
    Sun,
    Moon,
    SunMoon,
    PlusIcon,
    LogOut,
    LogIn,
    UserPlus,
    Settings2Icon,
    UserIcon,
    Shield,
  } from 'lucide-svelte';
  import { mode as modeStore, setMode, resetMode, toggleMode } from 'mode-watcher';
  import { page } from '$app/stores';
  import { Button } from '$lib/components/ui/button';
  import type { AuthModel } from 'pocketbase';
  import { UsersRoleOptions } from '$lib/types/gen/pocketbase-types';

  let user: AuthModel | undefined = $derived($page.data.user);

  let logoutForm: HTMLFormElement | null = $state(null);
</script>

<Header class="items-center">
  {#snippet children({ Link })}
    {#if user}
      <Link
        href="/auth/register"
        class="rounded-full"
        size="icon"
        icon={PlusIcon}
        variant="glass-neutral"
      >
        <span class="sr-only">New</span>
      </Link>
      <Dropdown.Root>
        <Dropdown.Trigger class="rounded-full text-3xl" let:builder asChild>
          <Button
            variant="outline"
            size="icon"
            class="overflow-hidden rounded-full"
            builders={[builder]}
          >
            <img src={user.avatar} alt="Avatar" class="overflow-hidden rounded-full" />
            <!-- EC -->
          </Button>
        </Dropdown.Trigger>
        <Dropdown.Content
          class="glass card backdrop-blur- w-56 rounded-lg border-white/15 bg-glass text-card-foreground"
          align="end"
        >
          {#if user.role === UsersRoleOptions.ADMIN}
            <Dropdown.Item href="/admin/users">
              <Shield class="mr-2 h-4 w-4" />
              Admin Panel
            </Dropdown.Item>
            <Dropdown.Separator />
          {/if}
          <Dropdown.Item href="/profile">
            <UserIcon class="mr-2 h-4 w-4" />
            Profile
          </Dropdown.Item>

          <Dropdown.Item href="/my/settings">
            <Settings2Icon class="mr-2 h-4 w-4" />
            Settings
          </Dropdown.Item>

          <Dropdown.Separator />
          <Dropdown.Label>Theme</Dropdown.Label>
          <Dropdown.Item
            on:click={() => {
              setMode('light');
            }}
          >
            <Sun class="mr-2 h-4 w-4" />
            Light
          </Dropdown.Item>
          <Dropdown.Item
            on:click={() => {
              setMode('dark');
            }}
          >
            <Moon class="mr-2 h-4 w-4" />
            Dark
          </Dropdown.Item>
          <Dropdown.Item
            on:click={() => {
              setMode('system');
            }}
          >
            <SunMoon class="mr-2 h-4 w-4" />
            System
          </Dropdown.Item>

          <Dropdown.Separator />

          <form bind:this={logoutForm} action="/auth/logout" method="POST">
            <Dropdown.Item
              on:click={() => {
                if (logoutForm) logoutForm.submit();
              }}
            >
              <LogOut class="mr-2 h-4 w-4" />
              Sign out
            </Dropdown.Item>
          </form>
        </Dropdown.Content>
      </Dropdown.Root>
    {:else}
      <Link variant="glass-secondary" class="hover:shadow-lg" icon={LogIn} href="/auth/login">
        Login
      </Link>
      <Link variant="glass-primary" class="hover:shadow-lg" icon={UserPlus} href="/auth/register">
        Register
      </Link>
    {/if}
  {/snippet}
</Header>

<!-- <pre>
  {JSON.stringify($page.data.user, null, 2)}
</pre> -->
