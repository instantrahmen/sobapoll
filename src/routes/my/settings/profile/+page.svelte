<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import LockableInput from '$lib/components/LockableInput.svelte';

  const { data } = $props();

  let nameValue = $state(data.user.name);
</script>

<div class="grid gap-6">
  <Card.Root>
    <Card.Header>
      <Card.Title>Profile</Card.Title>
      <Card.Description>Update your public profile info.</Card.Description>
    </Card.Header>
    <Card.Content>
      <LockableInput
        name="name"
        label="Name"
        leadingLabel="Name"
        value={nameValue}
        asForm={{
          submitOnLock: false,
          action: '?/updateName',
          method: 'POST',
        }}
        onLock={({ form }) => {
          console.log('locked', form);

          form?.requestSubmit();
        }}
      />
      <!-- <form action="?/updateProfile">
        <Label for="name">Name</Label>
        <Input placeholder="Your Name" name="name" id="name" bind:value={nameValue} />
      </form> -->
    </Card.Content>
    <Card.Footer class="border-t px-6 py-4">
      <Button>Save</Button>
    </Card.Footer>
  </Card.Root>
  <Card.Root>
    <Card.Header>
      <Card.Title>Plugins Directory</Card.Title>
      <Card.Description>
        The directory within your project, in which your plugins are located.
      </Card.Description>
    </Card.Header>
    <Card.Content>
      <form class="flex flex-col gap-4">
        <Input placeholder="Project Name" value="/content/plugins" />
        <div class="flex items-center space-x-2">
          <Checkbox id="include" checked={true} />
          <label
            for="include"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Allow administrators to change the directory.
          </label>
        </div>
      </form>
    </Card.Content>
    <Card.Footer class="border-t px-6 py-4">
      <Button>Save</Button>
    </Card.Footer>
  </Card.Root>
</div>

<style lang="postcss">
</style>
