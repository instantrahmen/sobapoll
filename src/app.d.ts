// See https://kit.svelte.dev/docs/types#app
import type { UsersResponse, TypedPocketBase } from '$lib/types/gen/pocketbase-types';
import 'unplugin-icons/types/svelte';

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      pb: TypedPocketBase; // PocketBase instance
      user?: UsersResponse; // Logged in user. Undefined if not logged in.
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
