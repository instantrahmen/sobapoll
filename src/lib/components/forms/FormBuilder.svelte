<script
  lang="ts"
  generics="T extends Record<string, unknown>, U extends FormPath<T>, Fields extends FormFieldsArray<T>"
>
  import type { HTMLFormAttributes, HTMLInputTypeAttribute } from 'svelte/elements';
  import * as Form from '$lib/components/ui/form';
  import type { Snippet } from 'svelte';
  import type { Infer, SuperForm } from 'sveltekit-superforms';
  import { z, ZodObject } from 'zod';
  import type { FormPath } from 'sveltekit-superforms';
  import type { FormFieldsArray } from '$lib/types/forms';
  import { cn, toTitleCase } from '$lib/utils';
  import { Input } from '../ui/input';
  import { Checkbox } from '../ui/checkbox';

  // type: pick 'form' from ComponentProps<Form.Field>

  type FieldProps = {
    type: HTMLInputTypeAttribute;
    name: U;
    label?: string;
    description?: string;
  };

  type Props = HTMLFormAttributes & {
    fields: Fields;
    before?: Snippet;
    after?: Snippet;
    form: SuperForm<T>;
    zodSchema: ZodObject<Infer<T>>;
    action?: string;
    ignoreFields?: U[];
    children?: Snippet<
      [
        {
          form: SuperForm<T>;
          formData: typeof form.form;
          fields: Fields;
        },
      ]
    >;
  };

  let {
    // Props
    fields,
    action = '',
    before,
    after,
    form,
    zodSchema,
    ignoreFields,
    class: className,
    children,
  }: Props = $props();

  const { form: formData, enhance } = form;
</script>

<form {action} use:enhance method="POST" class={cn('flex flex-col gap-1', className)}>
  {#if before}
    {@render before()}
  {/if}

  {#each fields as { type, name, label, description }}
    {@render formField({ type, name: name as U, label, description })}
  {/each}

  {#if children}
    {@render children({
      form,
      formData,
      fields,
    })}
  {/if}

  {#if after}
    {@render after()}
  {/if}
</form>
{#snippet formField({ type, name, label, description }: FieldProps)}
  {#if !ignoreFields?.includes(name)}
    {#if type === 'checkbox'}
      <Form.Field {form} {name} class="flex flex-row items-center space-x-2 align-middle">
        <Form.Control let:attrs>
          <Form.Label
            id="remember-me-label"
            for="remember-me"
            class="m-0 block align-middle text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            <Checkbox
              {...attrs}
              id="remember-me"
              class=" mb-1 inline-block rounded-[0.4rem] align-middle"
              aria-labelledby="remember-me-label"
            />
            {@html label ?? toTitleCase(name)}
          </Form.Label>
        </Form.Control>
        {#if description}
          <Form.Description class="text-muted/80">{@html description}</Form.Description>
        {/if}
        <Form.FieldErrors />
      </Form.Field>
    {:else}
      <Form.Field {form} {name}>
        <Form.Control let:attrs>
          <Form.Label>{@html label ?? toTitleCase(name)}</Form.Label>
          <Input {type} {...attrs} bind:value={$formData[name]} />
        </Form.Control>

        {#if description}
          <Form.Description class="text-muted/80">{@html description}</Form.Description>
        {/if}
        <Form.FieldErrors />
      </Form.Field>
    {/if}
  {/if}
{/snippet}
