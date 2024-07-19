<!-- An icon component that can take a component or the string key of a Lucide icon in PascalCase. -->
<script lang="ts">
  import * as LucideIcon from 'lucide-svelte';
  import { KeyIcon } from 'lucide-svelte';
  import type { ComponentType, ComponentProps } from 'svelte';
  import type { ValidIcon, LucideKey } from '$lib/types/polls';

  let { icon, ...restProps }: ComponentProps<KeyIcon> & { icon: ValidIcon } = $props();

  let getIcon = (icon: ValidIcon): ComponentType => {
    if (typeof icon === 'string') {
      return LucideIcon[icon] as ComponentType;
    }

    return icon;
  };

  let actualIcon: ComponentType = $derived(getIcon(icon));
</script>

<svelte:component this={actualIcon} {...restProps} />
