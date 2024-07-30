<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { formSchema, type FormSchema } from './schema';
  import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
  import * as Card from '$lib/components/ui/card';

  import { zodClient } from 'sveltekit-superforms/adapters';
  import Icon from '@iconify/svelte';

  export let data: SuperValidated<Infer<FormSchema>>;

  const form = superForm(data, {
    validators: zodClient(formSchema),
    dataType: 'json',
  });

  const { form: formData, enhance } = form;
</script>

<Card.Root class="m-4 mx-auto max-w-lg">
  <Card.Header class="text-center text-2xl font-semibold">
    <Card.Title class="text-center text-2xl font-semibold">Register for an account</Card.Title>
    <Card.Description class="text-center font-normal text-muted"
      >Already have an account? <a class="text-primary underline" href="/auth/login">Sign in</a
      ></Card.Description
    >
  </Card.Header>
  <Card.Content class="">
    <form method="POST" class="flex flex-col gap-2" use:enhance>
      <Form.Field {form} name="username">
        <Form.Control let:attrs>
          <Form.Label>Username</Form.Label>
          <Input class=" " {...attrs} bind:value={$formData.username} />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="email">
        <Form.Control let:attrs>
          <Form.Label>Email</Form.Label>
          <Input class=" " {...attrs} bind:value={$formData.email} />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="password">
        <Form.Control let:attrs>
          <Form.Label>Password</Form.Label>
          <Input class="" {...attrs} type="password" bind:value={$formData.password} />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>

      <Form.Field {form} name="passwordConfirm">
        <Form.Control let:attrs>
          <Form.Label>Confirm Password</Form.Label>
          <Input class="" {...attrs} type="password" bind:value={$formData.passwordConfirm} />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
      <Form.Button variant="glass-primary" class="w-full">Sign in</Form.Button>

      <div class="my-2 flex items-center justify-center">
        <div class="h-px w-20 bg-muted/50"></div>
        <span class="mx-3 text-center text-lg font-normal tracking-widest text-muted/50"
          >or continue with</span
        >
        <div class="h-px w-20 bg-muted/50"></div>
      </div>

      <!-- <span class="mb-4 text-center text-lg font-normal tracking-widest text-muted/50"
        >continue with</span
      > -->

      <!-- oauth buttons -->
      <div class="flex flex-row gap-2">
        <Form.Button variant="google" size="lg">
          <Icon icon="cib:google" class="mr-2" />
          Google
        </Form.Button>
        <Form.Button variant="discord" size="lg">
          <Icon icon="cib:discord" class="mr-2" />
          Discord
        </Form.Button>
        <Form.Button variant="patreon" size="lg">
          <Icon icon="cib:patreon" class="mr-2" />
          Patreon
        </Form.Button>
      </div>
    </form>
  </Card.Content>
</Card.Root>
