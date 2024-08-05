<script lang="ts" context="module">
  import { z } from 'zod';
  import type { FormFieldsArray } from '$lib/types/forms';

  export const formSchema = z.object({
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters long')
      .max(50, 'Username must be less than 50 characters long'),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(7, 'Password must be at least 7 characters long')
      .max(256, 'Password must be less than 256 characters long'),
    passwordConfirm: z
      .string()
      .min(7, 'Password must be at least 7 characters long')
      .max(256, 'Password must be less than 256 characters long'),
    terms: z
      .literal(true)
      .refine((value) => value === true, { message: 'You must accept the terms and conditions' }),
  });

  export type FormSchema = typeof formSchema;

  export const fields: FormFieldsArray<typeof formSchema.shape> = [
    {
      name: 'username',
      type: 'text',
      label: 'Username',
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
    },
    {
      name: 'passwordConfirm',
      type: 'password',
      label: 'Confirm Password',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
    },
    {
      name: 'terms',
      type: 'checkbox',
      label: 'I agree to the <a class="link" href="/terms">terms and conditions</a>',
    },
  ];
</script>

<script lang="ts">
  import FormBuilder from '../FormBuilder.svelte';
  import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import * as Form from '$lib/components/ui/form';
  import Icon from '@iconify/svelte';

  const { data }: { data: SuperValidated<Infer<FormSchema>> } = $props();

  const form = superForm(data, {
    validators: zodClient(formSchema),
  });
</script>

<FormBuilder {fields} {form} zodSchema={formSchema} action="?/register">
  {#snippet after()}
    <Form.Button variant="glass-primary" class="my-2 w-full">Create account</Form.Button>

    <div class="my-2 flex items-center justify-center">
      <div class="h-px w-20 bg-muted/50"></div>
      <span class="mx-3 text-center text-lg font-normal tracking-widest text-muted/50">
        or continue with
      </span>
      <div class="h-px w-20 bg-muted/50"></div>
    </div>

    <div class="flex w-full flex-row gap-2">
      <Form.Button variant="google" size="lg" class="w-full">
        <Icon icon="cib:google" class="mr-2 " />
        Google
      </Form.Button>
      <Form.Button variant="discord" size="lg" class="w-full">
        <Icon icon="cib:discord" class="mr-2" />
        Discord
      </Form.Button>
      <Form.Button variant="patreon" size="lg" class="w-full">
        <Icon icon="cib:patreon" class="mr-2" />
        Patreon
      </Form.Button>
    </div>
  {/snippet}
</FormBuilder>

<style lang="postcss">
</style>
