<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import LoginForm, { formSchema, type FormSchema } from '$forms/login/LoginForm.svelte';
  import { type SuperValidated, type Infer, superForm, type FormPath } from 'sveltekit-superforms';
  import * as Card from '$lib/components/ui/card';
  import Icon from '@iconify/svelte';

  import { zodClient } from 'sveltekit-superforms/adapters';
  import { toTitleCase } from '$lib/utils';
  import type { HTMLInputTypeAttribute } from 'svelte/elements';
  import { z } from 'zod';
  const { data } = $props();
</script>

<Card.Root class="m-4 mx-auto max-w-fit">
  <Card.Header class="text-center text-2xl font-semibold">
    <Card.Title class="text-center text-2xl font-semibold">Sign into your account</Card.Title>
    <Card.Description class="text-center font-normal text-muted">
      Don't have an account? <a class="text-primary underline" href="/auth/register">Sign up</a>
    </Card.Description>
  </Card.Header>
  <Card.Content>
    <LoginForm data={data.form}></LoginForm>
  </Card.Content>
</Card.Root>
