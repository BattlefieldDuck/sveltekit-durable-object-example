import type { PageServerLoad } from './$types';

export const load = (async ({ request, platform }) => {
    // Instantiate and communicate with a Durable Object
    const stub = platform?.env.MY_DURABLE_OBJECT.getByName(new URL(request.url).pathname);
    const greeting = await stub?.sayHello();

    return { greeting };
}) satisfies PageServerLoad;