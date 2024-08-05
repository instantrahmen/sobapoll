<script lang="ts">
  import ResetForm from '$forms/password-reset/PasswordResetForm.svelte';
  import * as Card from '$lib/components/ui/card';

  const { data } = $props();
</script>

<Card.Root class="m-4 mx-auto w-full max-w-screen-sm">
  <Card.Header class="text-center text-2xl font-semibold">
    <Card.Title class="text-center text-2xl font-semibold">Reset your password</Card.Title>
    <Card.Description class="text-center font-normal text-muted">
      Enter your email and we'll send you a link to reset your password
    </Card.Description>
  </Card.Header>
  <Card.Content>
    <ResetForm data={data.form}></ResetForm>
  </Card.Content>
</Card.Root>

<pre>
{JSON.stringify(data.form, null, 2)}
</pre>
