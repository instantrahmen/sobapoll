<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "$lib/utils/shadcn";
	import type { Snippet } from 'svelte';

	type Props = HTMLAttributes<HTMLDivElement> & {
		children: Snippet;
	};

	let {
		class: className,
		children,
		...restProps
	}: Props = $props();
</script>

<div class={cn("p-6 pt-0", className)} {...restProps}>
	{@render children()}
</div>
