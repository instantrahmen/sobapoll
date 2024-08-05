<script lang="ts" context="module">
  import { z } from 'zod';
  import type { FormFieldsArray } from '$lib/types/forms';

  export const formSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
  });

  export type FormSchema = typeof formSchema;

  export const fields: FormFieldsArray<typeof formSchema.shape> = [
    {
      name: 'email',
      type: 'text',
      label: 'Email',
    },
  ];
</script>

<script lang="ts">
  import FormBuilder from '../FormBuilder.svelte';
  import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { XIcon } from 'lucide-svelte';
  import { Button } from '$lib/components/ui/button';
  import * as Form from '$lib/components/ui/form';

  const {
    data,
    action = '?/forgot',
  }: { data: SuperValidated<Infer<FormSchema>>; action?: string } = $props();

  const form = superForm(data, {
    validators: zodClient(formSchema),
  });

  const { message } = form;
</script>

{#if $message}
  <div
    class="glass flex flex-row items-center justify-between rounded-md border bg-green-500/35 p-2 text-card-foreground"
  >
    <span>
      {$message}
    </span>

    <Button variant="ghost" on:click={() => form.reset()} size="icon">
      <XIcon></XIcon>
    </Button>
  </div>
{/if}
<FormBuilder {fields} {form} {action} zodSchema={formSchema}>
  {#snippet after()}
    <Form.Button variant="glass-primary" class="my-2 w-full">Reset Password</Form.Button>
    <a href="/auth/login" class="link">Back to login</a>
  {/snippet}
</FormBuilder>
