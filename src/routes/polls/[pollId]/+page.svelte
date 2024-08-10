<script lang="ts">
  import { page } from '$app/stores';
  import { SoupIcon } from 'lucide-svelte';
  import { mode } from 'mode-watcher';
  import PollFPTP from '$lib/components/poll-types/PollFPTP.svelte';
  import { backgroundStore } from '$lib/state/background.svelte';
  import { afterNavigate } from '$app/navigation';
  import { PollType, type Poll } from '$lib/types/polls';
  let { pollId } = $page.params;

  let examplePoll: Poll<PollType.FPTP> = $state({
    type: PollType.FPTP,
    id: pollId,
    title: 'Favorite Noodle Dish',
    description: "What's your favorite japanese noodle dish?",
    image: 'https://ch-admin.nyc3.digitaloceanspaces.com/Item%20Images/etc/wp10876289.jpg',
    imageDark:
      'https://ch-admin.nyc3.digitaloceanspaces.com/Item%20Images/etc/wp13840086-pink-sailor-moon-desktop-wallpapers.jpg',
    icon: SoupIcon,
    showVotes: true,
    options: [
      {
        id: `1`,
        title: 'Ramen',
        votes: 15,
        description: 'Wheat noodles in a savory broth',
        icon: SoupIcon,
      },
      {
        id: `2`,
        title: 'Yakisoba',
        votes: 2,
        description: 'Stir fried soba noodles',
        icon: 'Wheat',
      },
      {
        id: `3`,
        title: 'Udon',
        description: 'Thick, chewy wheat noodles',
        votes: 2,
        icon: 'Flower',
      },
      {
        id: `4`,
        title: 'Soba',
        votes: 2,
        description: 'Buckwheat noodles with a nutty flavor',
        icon: 'SoupIcon',
      },
    ],
    selected: null,
  });

  let examplePollRanked: Poll<PollType.STV> = $state({
    type: PollType.STV,
    id: pollId,
    title: 'Favorite Noodle Dish',
    description: "What's your go-to noodle dish? Cast your vote and see how your tastes compare.",
    image: 'https://placewaifu.com/image/1920/1080',
    imageDark: 'https://placewaifu.com/image/1280/720',
    icon: SoupIcon,
    showVotes: true,
    options: [
      {
        id: `1`,
        title: 'Ramen',
        votes: 100,
        description: 'Wheat noodles in a savory broth',
        icon: SoupIcon,
      },
      {
        id: `2`,
        title: 'Yakisoba',
        votes: 50,
        description: 'Stir fried soba noodles',
        icon: 'Wheat',
      },
      {
        id: `3`,
        title: 'Udon',
        description: 'Thick, chewy wheat noodles',
        votes: 20,
        icon: 'Flower',
      },
      {
        id: `4`,
        title: 'Soba',
        votes: 10,
        description: 'Buckwheat noodles with a nutty flavor',
      },
    ],
    selected: [],
  });

  // let bgImage = $derived(cssVariable('--page-background'));

  const bg = backgroundStore();

  $effect(() => {
    // set background
    // console.log('set background', $mode, examplePoll.imageDark, examplePoll.image);
    // if ($mode === 'dark') {
    //   bg.state.value = `url(${examplePoll.imageDark})`;
    // } else {
    //   bg.state.value = `url(${examplePoll.image})`;
    // }
  });

  afterNavigate(() => {
    console.log('after navigate');
  });
</script>

<svelte:head>
  <title>{examplePoll.title} - SobaPoll</title>
</svelte:head>

<!-- <svelte:body
  use:bgImage={$mode === 'dark' ? `url(${examplePoll.imageDark})` : `url(${examplePoll.image})`}
/> -->

<div class="mx-auto w-full max-w-2xl">
  <PollFPTP poll={examplePoll} class="flex flex-col" />
</div>

<!-- <div class="mx-auto w-full max-w-2xl">
  <PollRanked poll={examplePoll} class="flex flex-col" />
</div> -->

<style lang="postcss">
  :global(body) {
    background: var(--page-background);
  }
</style>
