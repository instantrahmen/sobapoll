<script lang="ts">
  import LoginForm from '$forms/login/LoginForm.svelte';
  import * as Card from '$lib/components/ui/card';

  const { data } = $props();
</script>

<Card.Root class="m-4 mx-auto w-full max-w-screen-sm">
  <Card.Header class="text-center text-2xl font-semibold">
    <Card.Title class="text-center text-2xl font-semibold">Sign into your account</Card.Title>
    <Card.Description class="text-center font-normal text-muted">
      Don't have an account? <a class="link" href="/auth/register">Sign up</a>
    </Card.Description>
  </Card.Header>
  <Card.Content>
    <LoginForm data={data.form}></LoginForm>
  </Card.Content>
</Card.Root>
