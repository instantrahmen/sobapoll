export const actions = {
  updateName: async ({ request, locals }) => {
    const { pb } = locals;
    const body = Object.fromEntries(await request.formData());
    const { name } = body;

    console.log({ name });

    return {};
  },
};
