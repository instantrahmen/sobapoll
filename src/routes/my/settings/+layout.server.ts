import type { UsersResponse } from '$lib/types/gen/pocketbase-types';
import { redirect } from '@sveltejs/kit';

// Should never redirect since we're checking if user is logged in inside `hooks.server.ts` so this is mainly just for type safety
const ensureUser = (user: UsersResponse | undefined) => {
  if (!user) {
    throw redirect(303, '/auth/login');
  }

  return user;
};

export const load = async ({ locals, parent }) => {
  const { user: unsafeUser, ...restData } = await parent();
  const user = ensureUser(unsafeUser);

  return {
    ...restData,
    user,
  };
};
