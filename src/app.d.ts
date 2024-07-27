// See https://kit.svelte.dev/docs/types#app

import type { AuthModel, TypedPocketBase } from 'pocketbase';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb: TypedPocketBase; // PocketBase instance
			user?: AuthModel; // Logged in user. Undefined if not logged in.
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
