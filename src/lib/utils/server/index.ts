import { redirect, type RequestEvent } from '@sveltejs/kit';

export const protectRoute = (route: string, event: RequestEvent, redirectTo: string = '/') => {
  if (event.url.pathname.startsWith(route)) {
    if (!event.locals.user) {
      throw redirect(303, redirectTo);
    }
  }
};

export const protectRoutes = (routes: string[], event: RequestEvent, redirectTo: string = '/') => {
  for (const route of routes) {
    protectRoute(route, event, redirectTo);
  }
};
