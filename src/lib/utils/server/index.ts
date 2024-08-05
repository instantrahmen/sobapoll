import { UsersRoleOptions } from '$lib/types/gen/pocketbase-types';
import { redirect, type RequestEvent } from '@sveltejs/kit';

export const protectRoute = (
  route: string,
  event: RequestEvent,
  redirectTo: string = '/',
  allowedRoles: UsersRoleOptions[] = [UsersRoleOptions.USER, UsersRoleOptions.ADMIN]
) => {
  if (event.url.pathname.startsWith(route)) {
    if (!event.locals.pb.authStore.isValid || !allowedRoles.includes(event.locals.user?.role)) {
      throw redirect(303, redirectTo);
    }
  }
};

export const protectRoutes = (
  routes: string[],
  event: RequestEvent,
  redirectTo: string = '/',
  allowedRoles: UsersRoleOptions[] = [UsersRoleOptions.USER, UsersRoleOptions.ADMIN]
  // minimumRole: UsersRoleOptions = UsersRoleOptions.USER
) => {
  for (const route of routes) {
    protectRoute(route, event, redirectTo, allowedRoles);
  }
};
