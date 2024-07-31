<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import RegisterForm, { formSchema, type FormSchema } from '$forms/register/RegisterForm.svelte';
  import { type SuperValidated, type Infer, superForm, type FormPath } from 'sveltekit-superforms';
  import * as Card from '$lib/components/ui/card';
  import { z } from 'zod';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import Icon from '@iconify/svelte';
  import type { HTMLInputTypeAttribute } from 'svelte/elements';
  import { toTitleCase } from '$lib/utils';
  import StateViewer from '$lib/components/tools/StateViewer/StateViewer.svelte';
  import { onMount } from 'svelte';

  // export let data: SuperValidated<Infer<FormSchema>>;
  const { data } = $props();

  const form = superForm(data.form, {
    validators: zodClient(formSchema),
  });

  const { form: formData, enhance } = form;

  type FieldProps = {
    type: HTMLInputTypeAttribute;
    name: FormPath<z.infer<typeof formSchema>>;
    label?: string;
    description?: string;
  };

  // TODO: remove this once the form is fully working. It's a pretty big security risk and I'm just using it right now for convenience

  const saveToLocalStorage = () => {
    localStorage.setItem('form-register', JSON.stringify($formData));
  };

  const getFromLocalStorage = () => {
    const data = localStorage.getItem('form-register');
    if (data) {
      $formData = JSON.parse(data);
    }
  };

  onMount(() => {
    getFromLocalStorage();
  });

  const isEmptyForm = () => {
    // check if the form values are empty
    return Object.values($formData).every((value) => value === '');
  };

  $effect(() => {
    if (!isEmptyForm()) {
      saveToLocalStorage();
    }
  });
</script>

<Card.Root class="m-4 mx-auto max-w-lg">
  <Card.Header class="text-center text-2xl font-semibold">
    <Card.Title class="text-center text-2xl font-semibold">Register for an account</Card.Title>
    <Card.Description class="text-center font-normal text-muted">
      Already have an account?
      <a class="text-primary underline" href="/auth/login">Sign in</a>
    </Card.Description>
  </Card.Header>
  <Card.Content class="">
    <RegisterForm data={data.form} />
  </Card.Content>
</Card.Root>
<!-- {JSON.stringify($formData, null, 2)} -->

<StateViewer inspectState={$formData} />

{#snippet formField({ type, name, label, description }: FieldProps)}
  <Form.Field {form} {name}>
    <Form.Control let:attrs>
      <Form.Label>{label ?? toTitleCase(name)}</Form.Label>
      <Input {type} {...attrs} bind:value={$formData[name]} />
    </Form.Control>
    {#if description}
      <Form.Description class="text-muted/80">{description}</Form.Description>
    {/if}
    <Form.FieldErrors />
  </Form.Field>
{/snippet}
