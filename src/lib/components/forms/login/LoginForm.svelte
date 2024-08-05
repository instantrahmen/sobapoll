<script lang="ts" context="module">
  import { z } from 'zod';
  import type { FormFieldsArray } from '$lib/types/forms';

  export const formSchema = z.object({
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters long')
      .max(50, 'Username must be less than 50 characters long'),
    password: z
      .string()
      .min(7, 'Password must be at least 7 characters long')
      .max(256, 'Password must be less than 256 characters long'),
    remember: z.boolean(),
  });

  export type FormSchema = typeof formSchema;

  export const fields: FormFieldsArray<typeof formSchema.shape> = [
    {
      name: 'username',
      type: 'text',
      label: 'Email or Username',
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
    },
    {
      name: 'remember',
      type: 'checkbox',
      label: 'Keep me signed in',
    },
  ];
</script>

<script lang="ts">
  import FormBuilder from '../FormBuilder.svelte';
  import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import * as Form from '$lib/components/ui/form';
  import Icon from '@iconify/svelte';
  import { Checkbox } from '$lib/components/ui/checkbox';

  const { data }: { data: SuperValidated<Infer<FormSchema>> } = $props();

  const form = superForm(data, {
    validators: zodClient(formSchema),
  });

  const rememberField = $derived(fields.find((field) => field.name === 'remember'));
</script>

<div class="text-right"></div>

<FormBuilder {fields} {form} action="?/login" zodSchema={formSchema} ignoreFields={['remember']}>
  {#snippet children()}
    {@const { name, type, label } = rememberField!}
    <div class="flex flex-row justify-between">
      <Form.Field
        {form}
        name={rememberField!.name}
        class="flex flex-row items-center space-x-2 align-middle"
      >
        <Form.Control let:attrs>
          <Form.Label
            id="remember-me-label"
            for="remember-me"
            class="m-0 block align-middle text-sm font-medium leading-none text-muted peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            <Checkbox
              {...attrs}
              id="remember-me"
              class="items-center rounded-[0.4rem] align-middle"
              aria-labelledby="remember-me-label"
            />
            {@html label}
          </Form.Label>
        </Form.Control>
      </Form.Field>
      <a href="/auth/forgot" class="link">Forgot password</a>
    </div>
  {/snippet}
  {#snippet after()}
    <Form.Button variant="glass-primary" class="my-2 w-full">Sign in</Form.Button>

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

{#snippet forgotPassword()}
  <a href="/auth/forgot" class="text-right text-primary underline">Forgot Password</a>
{/snippet}

<style lang="postcss">
</style>
