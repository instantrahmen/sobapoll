import type { PageServerLoad } from './$types.js';
import { superValidate } from 'sveltekit-superforms';
import { formSchema } from '$forms/register/RegisterForm.svelte';
import { zod } from 'sveltekit-superforms/adapters';
import {
  Collections,
  type TypedPocketBase,
  UsersRoleOptions,
} from '$lib/types/gen/pocketbase-types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod(formSchema)),
  };
};

export const actions = {
  register: async ({ request, locals }) => {
    console.log('creating user');
    const pb: TypedPocketBase = locals.pb;
    const body = Object.fromEntries(await request.formData());
    const form = await superValidate(body, zod(formSchema));
    console.log({ data: form.data, body });
    if (!form.valid) {
      return { form };
    }

    try {
      const usersCollection = pb.collection(Collections.Users);
      await usersCollection.create({ ...form.data, role: UsersRoleOptions.USER });
      await usersCollection.requestVerification(form.data.email);
    } catch (error) {
      console.error(error);
    }

    throw redirect(303, '/auth/after-register');
  },
};
