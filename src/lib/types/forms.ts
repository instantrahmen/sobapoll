import type { Snippet } from 'svelte';
import type { HTMLInputAttributes, HTMLInputTypeAttribute } from 'svelte/elements';
import type { FormPath } from 'sveltekit-superforms';

export type FieldType = HTMLInputTypeAttribute | 'button';

export type IFieldInfo = HTMLInputAttributes & {
  type: FieldType;
  label?: string;
  description?: string;
  children?: Snippet;
};

export type FormFields<T extends Record<string, unknown>> = Record<FormPath<T>, IFieldInfo>;

export type FormFieldsArray<T extends Record<string, unknown>> = (IFieldInfo & {
  name: FormPath<T>;
})[];
