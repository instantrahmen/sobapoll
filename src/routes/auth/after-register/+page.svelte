<!-- After register page -->
<script lang="ts">
  import Header from '$lib/components/Header/Header.svelte';
  import * as Card from '$lib/components/ui/card';
  import Button from '$lib/components/ui/button/button.svelte';
</script>

<Card.Root>
  <Card.Header class="text-center text-2xl font-semibold">
    <Card.Title class="text-center text-2xl font-semibold">Successfully created account</Card.Title>
    <Card.Description class="text-center font-normal text-muted">
      Please check your email to verify your account
    </Card.Description>
  </Card.Header>

  <Card.Content>
    <Button class="w-full" href="/auth/login">Login</Button>
  </Card.Content>
</Card.Root>

<style lang="postcss">
</style>
