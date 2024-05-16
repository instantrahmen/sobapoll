<script lang="ts" context="module">
  export type Poll = {
    id: string;
    title: string;
    description: string;
    image: string;
    imageDark: string;
    icon: any;
    options: {
      id: string;
      title: string;
      votes: number;
      description?: string;
    }[];
    selected?: string;
  };
</script>

<script lang="ts">
  import { page } from '$app/stores';
  import { CheckIcon, SoupIcon } from 'lucide-svelte';
  import * as Card from '$lib/components/ui/card';

  import { Button } from '$lib/components/ui/button';
  import * as RadioGroup from '$lib/components/ui/radio-group';
  import { Label } from '$lib/components/ui/label';
  import { cn } from '$lib/utils/shadcn';
  import bodyClass, { cssVariable } from '$lib/actions/body-class';
  import { mode } from 'mode-watcher';

  let { pollId } = $page.params;

  let examplePoll: Poll = $state({
    id: pollId,
    title: 'Favorite Noodle Dish',
    description: "What's your go-to noodle dish? Cast your vote and see how your tastes compare.",
    image: 'https://placewaifu.com/image/1920/1080',
    imageDark: 'https://placewaifu.com/image/1280/720',
    icon: SoupIcon,
    options: [
      {
        id: `1`,
        title: 'Ramen',
        votes: 100,
        description: 'Wheat noodles in a savory broth',
      },
      {
        id: `2`,
        title: 'Yakisoba',
        votes: 50,
        description: 'Stir fried soba noodles',
      },
      {
        id: `3`,
        title: 'Udon',
        description: 'Thick, chewy wheat noodles',
        votes: 20,
      },
      {
        id: `4`,
        title: 'Soba',
        votes: 10,
        description: 'Buckwheat noodles with a nutty flavor',
      },
    ],
    selected: undefined,
  });

  let bgImage = $derived(cssVariable('--page-background'));
</script>

<svelte:head>
  <title>{examplePoll.title} - SobaPoll</title>
</svelte:head>

<svelte:body
  use:bgImage={$mode === 'dark' ? `url(${examplePoll.imageDark})` : `url(${examplePoll.image})`}
/>

{$mode}

<div class="mx-auto w-full max-w-2xl">
  <Card.Root class={cn('mt-6')}>
    <Card.Header>
      <Card.Title>{examplePoll.title}</Card.Title>
      <Card.Description class="text-muted">{examplePoll.description}</Card.Description>
    </Card.Header>
    <Card.Content class="flex flex-col gap-4">
      <RadioGroup.Root bind:value={examplePoll.selected}>
        {#each examplePoll.options as option}
          <div class="flex items-center space-x-2">
            <RadioGroup.Item class="peer sr-only" id={`${option.id}`} value={`${option.id}`} />
            <Label
              class={cn(
                `card flex cursor-pointer items-center gap-3 rounded-lg border p-4 text-card-foreground hover:bg-card/30`,
                examplePoll.selected === option.id && 'bg-card/100'
              )}
              for={`${option.id}`}
            >
              <div class="flex-1">
                <div class="font-medium">{option.title}</div>
                <div class="text-sm text-muted">
                  {option.description}
                </div>
              </div>
              <CheckIcon
                class="hidden h-6 w-6 text-primary peer-checked:block"
                aria-hidden="true"
              />
            </Label>
          </div>
        {/each}
      </RadioGroup.Root>
    </Card.Content>

    <Card.Footer>
      <Button>Submit</Button>
    </Card.Footer>
  </Card.Root>
</div>

<style lang="postcss">
  :global(body) {
    background: var(--page-background);
  }
</style>
