import type { PageServerLoad } from './$types.js';
import { setError, superValidate } from 'sveltekit-superforms';
import { formSchema } from '$forms/login/LoginForm.svelte';
import { zod } from 'sveltekit-superforms/adapters';
import { Collections, type TypedPocketBase } from '$lib/types/gen/pocketbase-types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
  const pb: TypedPocketBase = locals.pb;
  if (locals.user) {
    throw redirect(303, '/');
  }

  return {
    form: await superValidate(zod(formSchema)),
  };
};

const UserErrors = {
  DEFAULT: { target: 'password', message: 'Invalid username or password' },
  EMAIL_NOT_VERIFIED: {
    target: 'username',
    message: 'Please verify your email address and try again',
  },
};

const getErrorMessage = (error: string) => {
  if (error in UserErrors) {
    return UserErrors[error as keyof typeof UserErrors];
  }
  return UserErrors.DEFAULT;
};

export const actions = {
  login: async ({ request, locals }) => {
    const body = Object.fromEntries(await request.formData());
    const pb: TypedPocketBase = locals.pb;

    const form = await superValidate(body, zod(formSchema));

    if (!form.valid) {
      return { form };
    }

    try {
      const Users = pb.collection(Collections.Users);
      await Users.authWithPassword(form.data.username, form.data.password);

      if (!pb.authStore?.model?.verified) {
        throw new Error('EMAIL_NOT_VERIFIED');
      }
    } catch (error: any) {
      const { target, message } = getErrorMessage(error.message);
      setError(form, target as keyof typeof form.data, message);

      return { form };
    }
  },
};
