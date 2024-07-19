<script lang="ts">
	import { Progress as ProgressPrimitive } from "bits-ui";
	import { cn } from "$lib/utils/shadcn.js";
  import { onMount, type Snippet } from 'svelte';
	import {spring} from 'svelte/motion';

	type Props = ProgressPrimitive.Props & {
		indicatorClass?: string;
		children?: Snippet<[reanimate: () => void]>;
	};

	const getCurrentValue = (mounted: boolean, value?: number | null) => {
		if (mounted) {
			return value ?? 0;
		}
		return 0;
	}

	let {class: className, value = $bindable(0), max, indicatorClass = '', children, ...restProps}: Props = $props();

	let mounted = $state(false);

	let currentValue = spring(0, {
		stiffness: 0.2,
		damping: 0.5,
	});

	onMount(() => {
		mounted = true;
		$currentValue = getCurrentValue(mounted, value);
	});

	$effect(() => {
		$currentValue = getCurrentValue(mounted, value);
	});

	const reanimate = () => {
		$currentValue = 0;
		
		setTimeout(() => {
			$currentValue = getCurrentValue(mounted, value);
		}, 250);
	}
</script>

<ProgressPrimitive.Root
	class={cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className)}
	{...restProps}
>
	<div
		class={cn('h-full w-full flex-1 bg-primary transition-none', indicatorClass)}
		style={`transform: translateX(-${100 - (100 * ($currentValue)) / (max ?? 1)}%)`}
	></div>
	{#if children}
		<div class="absolute inset-0 flex items-center justify-start py-2">
			{@render children(reanimate)}
		</div>
	{/if}
</ProgressPrimitive.Root>
