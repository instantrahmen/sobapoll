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
      imageDark: 'https://picsum.photos/id/69/800/600',
      image: 'https://picsum.photos/id/69/800/600',
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
      imageDark: 'https://picsum.photos/id/69/800/600',
      image: 'https://picsum.photos/id/69/800/600',
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

<section class=" py-12 md:py-20">
  <div class="container grid items-center gap-8 px-4 md:grid-cols-2 md:px-6">
    <!-- class="space-y-4 rounded-xl " -->
    <Card.Root class="text-center flex flex-col"
      style={`
        aspect-ratio: 800/600;
        object-fit: cover;
      `}
      
    >
      <div class="flex justify-center flex-1 text-4xl"><SoupIcon></SoupIcon></div>
      <Card.Header class="text-4xl font-bold tracking-tight md:text-5xl  w-full">
        Welcome to SobaPoll
      </Card.Header>
      <Card.Content class="max-w-md text-xl w-full mx-auto">
        Discover and participate in polls on a variety of polls, or create your own. Choose between
        multiple voting methods, visibility options, and more.
      </Card.Content>
      <Card.Footer class="flex gap-4 w-full mx-auto justify-center">
        <Button variant="outline" size="lg" class="bg-secondary">Explore Polls</Button>
        <Button variant="outline" size="lg">Create Poll</Button>
      </Card.Footer>
    </Card.Root>
    <img
      alt="Noodle Bowl"
      class="rounded-xl object-cover"
      height={600}
      width={800}
      src="https://placewaifu.com/image/800/600"
      style={`
        aspect-ratio: 800/600;
        object-fit: cover;
      `}
    />
  </div>
</section>
<main class="container grid gap-12 px-4 py-12 md:grid-cols-[1fr_300px] md:px-6 md:py-20">
  <div class="space-y-8">
    <div class="grid grid-cols-fluid-250 gap-6">
      {#each featuredPolls as poll}
        <PollFptp
          {poll} />
      {/each}
    </div>
  </div>
  <div class="space-y-6">
    <Card.Root class="rounded-xl ">
      <Card.Header class="text-lg font-semibold">Categories</Card.Header>
      <Card.Content class="max-w-md">
        <nav class="mt-4 grid gap-2">
          <a
            class="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            href="/"
          >
            <SoupIcon class="h-4 w-4" />
            Noodle Dishes
          </a>
          <a
            class="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            href="/"
          >
            <DrumstickIcon class="h-4 w-4" />
            Noodle Toppings
          </a>
          <a
            class="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            href="/"
          >
            <SoupIcon class="h-4 w-4" />
            Noodle Textures
          </a>
          <a
            class="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            href="/"
          >
            <SoupIcon class="h-4 w-4" />
            Noodle Broths
          </a>
          <a
            class="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            href="/"
          >
            <TrendingUpIcon class="h-4 w-4" />
            Popular Polls
          </a>
          <a
            class="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
            href="/"
          >
            <PlusIcon class="h-4 w-4" />
            Create Poll
          </a>
        </nav>
      </Card.Content>
    </Card.Root>
    <Card.Root class="rounded-xl ">
      <Card.Header class="text-lg font-semibold">Top Creators</Card.Header>
      <Card.Content class="max-w-md">
        <div class="mt-4 space-y-2">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <Avatar>
                <AvatarImage alt="Avatar 1" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p class="font-medium">John Doe</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">1,234 Votes</p>
              </div>
            </div>
            <Badge
              class="bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-50"
              variant="outline"
            >
              1
            </Badge>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <Avatar>
                <AvatarImage alt="Avatar 2" />
                <AvatarFallback>JA</AvatarFallback>
              </Avatar>
              <div>
                <p class="font-medium">Jane Appleseed</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">987 Votes</p>
              </div>
            </div>
            <Badge
              class="bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-50"
              variant="outline"
            >
              2
            </Badge>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <Avatar>
                <AvatarImage alt="Avatar 3" />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <div>
                <p class="font-medium">Sarah Mayer</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">789 Votes</p>
              </div>
            </div>
            <Badge
              class="bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-50"
              variant="outline"
            >
              3
            </Badge>
          </div>
        </div>
      </Card.Content>
    </Card.Root>
  </div>
</main>
