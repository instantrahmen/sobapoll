import { Collections, type TypedPocketBase } from '$lib/types/gen/pocketbase-types';

export const load = async ({ locals, parent }) => {
  const data = await parent();
  const pb: TypedPocketBase = locals.pb;

  const Users = pb.collection(Collections.Users);
  const users = await Users.getList(1, 500, {
    // filter: 'verified = true',
    sort: '-created',
  });
  return {
    ...data,
    users,
  };
};
