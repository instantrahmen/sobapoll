<!-- An icon component that can take a component or the string key of a Lucide icon in PascalCase. -->
<script lang="ts">
  import * as LucideIcon from 'lucide-svelte';
  import { KeyIcon } from 'lucide-svelte';

  import type { ComponentType, ComponentProps } from 'svelte';
  import type { ValidIcon, LucideKey } from '$lib/types/polls';
  import Iconify, { type IconifyIcon, type IconifyIconName } from '@iconify/svelte';

  let { icon, ...restProps }: ComponentProps<KeyIcon> & { icon: ValidIcon | string } = $props();

  let getIconType = (icon: ValidIcon): 'iconify' | 'lucide' | 'component' => {
    if (typeof icon === 'string') {
      if (icon in LucideIcon) {
        // return LucideIcon[icon as LucideKey] as ComponentType;
        return 'lucide';
      } else {
        // Icon must be an iconify icon
        return 'iconify';
      }
    }

    return 'component';
  };

  let iconType: string = $derived(getIconType(icon));
</script>

{#if iconType === 'lucide'}
  <svelte:component this={LucideIcon[icon as LucideKey]} {...restProps} />
{/if}
{#if iconType === 'iconify'}
  <Iconify icon={icon as string} />
{/if}
{#if iconType === 'component'}
  <svelte:component this={icon} {...restProps} />
{/if}
