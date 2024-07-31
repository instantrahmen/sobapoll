import PocketBase from 'pocketbase';
import type { TypedPocketBase } from '$lib/types/gen/pocketbase-types';
import { serializeNonPOJOs } from '$lib/utils';
import { PB_URL } from '$env/static/private';

export const handle = async ({ event, resolve }) => {
  event.locals.pb = new PocketBase(PB_URL) as TypedPocketBase;
  // Load the authenticated user from cookie if there is one
  event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');
  // return resolve(event);

  if (event.locals.pb.authStore.isValid) {
    event.locals.user = serializeNonPOJOs(event.locals.pb.authStore.model);
  } else {
    event.locals.user = undefined;
  }

  const response = await resolve(event);

  response.headers.set(
    'set-cookie',
    event.locals.pb.authStore.exportToCookie({
      secure: false,
    })
  );

  return response;
};
