<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import type { HeadingLevel } from "./index.js";
	import { cn } from "$lib/utils/shadcn";
  import type { Snippet } from 'svelte';

	type Props = HTMLAttributes<HTMLHeadingElement> & {
		tag?: HeadingLevel;
		children: Snippet;
	};

	let {
		class: className,
		tag = "h3",
		children,
		...restProps
	}: Props = $props();

</script>

<svelte:element
	this={tag}
	class={cn("text-lg font-semibold leading-none tracking-tight", className)}
	{...restProps}
>
	{@render children()}
</svelte:element>
