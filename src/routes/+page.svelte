<script lang="ts">
  import { DrumstickIcon, PlusIcon, SoupIcon, TrendingUpIcon } from 'lucide-svelte';
  import * as Card from '$lib/components/ui/card';
  import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import PollFptp from '$lib/components/poll-types/PollFPTP.svelte';
  import { type Poll, PollType } from '$lib/types/polls';

  let featuredPolls: Poll<PollType.FPTP>[] = $state([
    {
      id: '1',
      type: PollType.FPTP,
      imageDark: 'https://picsum.photos/id/69/800/600',
      title: 'Favorite Noodle Dish',
      description: "What's your go-to noodle dish? Cast your vote and see how your tastes compare.",
      image: 'https://picsum.photos/id/69/800/600',
      showVotes: true,
      icon: SoupIcon,
      options: [
        {
          id: '1',
          title: 'Ramen',
          votes: 100,
        },
        {
          id: '2',
          title: 'Pad Thai',
          votes: 50,
        },
        {
          id: '3',
          title: 'Udon',
          votes: 20,
        },
        {
          id: '4',
          title: 'Soba',
          votes: 10,
        },
      ],
      selected: null,
    },
    {
      id: '2',
      title: 'Noodle Toppings',
      description: `What's your favorite noodle topping? Vote now!`,
      image: 'https://picsum.photos/id/69/800/600',
      icon: PlusIcon,
      type: PollType.FPTP,
      showVotes: true,
      imageDark: 'https://picsum.photos/id/69/800/600',
      options: [
        {
          id: '1',
          title: 'Pork Belly',
          votes: 100,
        },
        {
          id: '2',
          title: 'Soft Boiled Egg',
          votes: 50,
        },
        {
          id: '3',
          title: 'Scallions',
          votes: 20,
        },
        {
          id: '4',
          title: 'Bamboo Shoots',
          votes: 10,
        },
      ],
      selected: null,
    },
    {
      id: '3',
      title: 'Noodle Texture',
      description: `What's your preferred noodle texture? Cast your vote!`,
      icon: TrendingUpIcon,
      type: PollType.FPTP,
      showVotes: true,
      imageDark: '"https://placewaifu.com/image/800/600"',
      image: 'https://placewaifu.com/image/800/600',
      options: [
        {
          id: '1',
          title: 'Chewy',
          votes: 100,
        },
        {
          id: '2',
          title: 'Firm',
          votes: 50,
        },
        {
          id: '3',
          title: 'Soft',
          votes: 20,
        },
        {
          id: '4',
          title: 'Al Dente',
          votes: 10,
        },
      ],
      selected: null,
    },
    {
      id: '4',
      title: 'Noodle Broth',
      description: `What's your preferred noodle broth? Cast your vote!`,
      icon: DrumstickIcon,
      type: PollType.FPTP,
      showVotes: true,
      imageDark:
        'https://cdn.magicdecor.in/com/2023/10/20172003/Anime-Girl-and-Mystical-Creature-Wallpaper-for-Wall-710x488.jpg',
      image:
        'https://cdn.magicdecor.in/com/2023/10/20172003/Anime-Girl-and-Mystical-Creature-Wallpaper-for-Wall-710x488.jpg',
      options: [
        {
          id: '1',
          title: 'Miso',
          votes: 100,
        },
        {
          id: '2',
          title: 'Shoyu',
          votes: 50,
        },
        {
          id: '3',
          title: 'Tonkatsu',
          votes: 20,
        },
        {
          id: '4',
          title: 'Vegetable',
          votes: 10,
        },
      ],
      selected: null,
    },
  ]);
</script>

<section class="flex min-h-[calc(100lvh-200px)] flex-col items-center justify-center">
  <div class="container grid items-center gap-8 px-4 text-left md:grid-cols-1 md:px-6">
    <div class=" flex flex-col space-y-4 rounded-xl p-8 text-center">
      <h2 class="md:text-8px w-full text-6xl font-normal tracking-wide">
        Get started with SobaPoll
      </h2>
      <div class=" mx-auto w-full max-w-md py-8 text-xl">
        Discover and participate in polls on a variety of polls, or create your own. Choose between
        multiple voting methods, visibility options, and more.
      </div>
      <div class="mx-auto flex w-full justify-center gap-4">
        <div>
          <Button variant="glass-primary" size="lg" class="">Create Poll</Button>
          <span class="block text-center text-xs font-light text-muted">No account needed</span>
        </div>
        <Button href="/auth/login" variant="glass-neutral" size="lg">Login</Button>
      </div>
    </div>
  </div>
</section>

<main class="container grid gap-12 px-4 py-12 md:grid-cols-[1fr] md:px-6 md:py-20">
  <section id="featured">
    <h3 class="mb-4 text-center text-4xl font-semibold tracking-wide">Featured Polls</h3>

    <div class="space-y-8">
      <div class="grid grid-cols-fluid-300 gap-6">
        {#each featuredPolls as poll}
          <PollFptp {poll} />
        {/each}
      </div>
    </div>
  </section>
</main>
