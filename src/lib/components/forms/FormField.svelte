<script context="module" lang="ts">
</script>

<script lang="ts" generics="SuperForm extends SuperValidated<Record<string, unknown>>">
  import Input from '$lib/components/ui/input/input.svelte';
  import * as Form from '$lib/components/ui/form';
  import type { SuperValidated, Infer } from 'sveltekit-superforms';

  const {
    name,
    type,
    form,
    ...restProps
  }: IFieldInfo & {
    form: SuperForm;
  } = $props();
</script>

<!-- <Form.Field form={null} name="username">
  <Form.Control let:attrs>
    <Form.Label>Username</Form.Label>
    <Input {...attrs} bind:value={$formData.username} />
  </Form.Control>
  <Form.Description>This is your public display name.</Form.Description>
  <Form.FieldErrors />
</Form.Field> -->
