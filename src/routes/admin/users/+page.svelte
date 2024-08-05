<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { css } from 'language-literals';
  const { data } = $props();
  import { ArrowDownIcon, ArrowUpIcon, Edit } from 'lucide-svelte';

  let users = $derived(data.users);

  type Column = {
    name: string;
    field: keyof (typeof users.items)[number] | null;
  };

  const columns: Column[] = [
    {
      name: 'ID',
      field: 'id',
    },
    {
      name: 'Username',
      field: 'username',
    },
    {
      name: 'Email',
      field: 'email',
    },
    {
      name: 'Role',
      field: 'role',
    },
    {
      name: 'Created',
      field: 'created',
    },
    {
      name: 'Verified',
      field: 'verified',
    },
    {
      name: 'Updated',
      field: 'updated',
    },
    {
      name: 'Edit',
      field: null,
    },
  ] as const;

  type SortKey = Exclude<Column['field'], null>;
  let sortKey: SortKey = $state('username');

  const asString = (value: unknown) => {
    if (typeof value === 'string') {
      return value;
    }
    if (typeof value === 'number') {
      return value.toString();
    }
    if (value instanceof Date) {
      return value.toISOString();
    }
    return JSON.stringify(value);
  };

  let sortDirection = $state(1);
  let sortedUsers = $derived(
    users.items.toSorted((a, b) => {
      const aValue = asString(a[sortKey]);
      const bValue = asString(b[sortKey]);
      if (aValue < bValue) {
        return -sortDirection;
      }
      if (aValue > bValue) {
        return sortDirection;
      }
      return 0;
    })
  );

  const handleHeaderClick = (index: number) => {
    if (sortKey === columns[index].field) {
      sortDirection *= -1;
    } else if (columns[index].field) {
      sortKey = columns[index].field;
      sortDirection = 1;
    }
  };
</script>

<div class="mx-auto mt-4 max-w-screen-lg">
  <h2 class="font-bol text-center text-3xl tracking-wide">Moderate Users</h2>

  <div
    class="glass grid-cols-min-content mx-auto my-4 grid w-full max-w-screen-lg gap-[2px] overflow-scroll rounded-lg border bg-foreground/20"
    style={css`
      grid-template-columns: repeat(${columns.length.toString()}, minmax(min-content, 1fr));
    `}
  >
    {#each columns as column, i}
      {@render header({ text: column.name, i, sortable: column.field !== null })}
    {/each}
    {#each sortedUsers as user, i}
      {#each columns as column}
        {#if column.field}
          {@render cell({ text: user[column.field] as string, i })}
        {:else}
          <!-- {@render cell({ text: 'Edit', i })} -->
          <div
            class="col-span-1 min-w-fit items-center overflow-scroll break-words bg-white/80 p-1 text-center text-black transition-all ease-in-out hover:bg-white/20"
          >
            <Button variant="ghost" size="icon" href="/admin/users/{user.id}">
              <span class="sr-only">Edit User</span>
              <Edit />
            </Button>
          </div>
        {/if}
      {/each}
    {/each}
  </div>
</div>

{#snippet header({ text, i, sortable = true }: { text: string; i: number; sortable: boolean })}
  <Button
    variant="glass-primary"
    class={'w-full min-w-10 rounded-none p-2 text-primary-foreground disabled:text-primary-foreground'}
    on:click={() => handleHeaderClick(i)}
    size="icon"
    disabled={!sortable}
  >
    {text}

    {#if sortKey === columns[i].field}
      {#if sortDirection === 1}
        <ArrowDownIcon />
      {:else}
        <ArrowUpIcon />
      {/if}
    {/if}
  </Button>
{/snippet}

{#snippet cell({ text, i }: { text: string; i: number })}
  <div
    class="col-span-1 min-w-fit items-center overflow-scroll break-words bg-white/80 p-1 text-center text-black transition-all ease-in-out hover:bg-white/70"
  >
    <span class="flex h-full items-center justify-center self-center text-center">
      {text}
    </span>
  </div>
{/snippet}

<!-- {#snippet header(text: string)}
  <Button variant="glass-primary" on:click={() => {}} size="icon">
    {text}
  </Button>
{/snippet} -->

<style lang="postcss">
  .grid-cols-min-content {
  }
</style>
