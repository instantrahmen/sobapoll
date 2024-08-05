import type { PageServerLoad } from './$types.js';
import { message, setError, superValidate } from 'sveltekit-superforms';
import { formSchema } from '$forms/password-reset/PasswordResetForm.svelte';
import { zod } from 'sveltekit-superforms/adapters';
import { Collections, type TypedPocketBase } from '$lib/types/gen/pocketbase-types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user) {
    throw redirect(303, '/');
  }

  return {
    form: await superValidate(zod(formSchema)),
  };
};

export const actions = {
  forgot: async ({ request, locals }) => {
    const pb: TypedPocketBase = locals.pb;
    const body = Object.fromEntries(await request.formData());
    const form = await superValidate(body, zod(formSchema));

    if (!form.valid) {
      return { form };
    }

    try {
      await pb.collection(Collections.Users).requestPasswordReset(form.data.email);
      return message(form, 'Password reset email sent. Please check your inbox.');
    } catch (error) {
      console.error(error);
      setError(form, 'email', 'Unable to reset password. Please contact the admin for support');

      return { form };
    }
  },
};
