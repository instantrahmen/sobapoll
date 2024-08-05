import PocketBase from 'pocketbase';
import {
  UsersRoleOptions,
  type TypedPocketBase,
  type UsersResponse,
} from '$lib/types/gen/pocketbase-types';
import { serializeNonPOJOs } from '$lib/utils';
import { PB_URL } from '$env/static/private';
import { protectRoutes } from '$lib/utils/server';

export const handle = async ({ event, resolve }) => {
  // Create a new PocketBase instance for each request
  event.locals.pb = new PocketBase(PB_URL) as TypedPocketBase;

  // Load the authenticated user from cookie if there is one
  event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

  // If authenticated, set the user as locals.user for use later
  if (event.locals.pb.authStore.isValid) {
    event.locals.user = serializeNonPOJOs(event.locals.pb.authStore.model) as UsersResponse;
  } else {
    event.locals.user = undefined;
  }

  const response = await resolve(event);

  // Set auth cookies
  response.headers.set(
    'set-cookie',
    event.locals.pb.authStore.exportToCookie({
      secure: false,
    })
  );

  // User routes
  protectRoutes(['/my'], event, '/auth/login', [UsersRoleOptions.USER, UsersRoleOptions.ADMIN]);

  // Admin routes
  protectRoutes(['/admin'], event, '/my/dashboard', [UsersRoleOptions.ADMIN]);

  return response;
};
