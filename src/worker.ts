import { DurableObject } from 'cloudflare:workers';
import sv from '../.svelte-kit/cloudflare/_worker.js';

// Write a Durable Object class using SQL API
export class MyDurableObject extends DurableObject<Env> {
    constructor(ctx: DurableObjectState, env: Env) {
        // Required, as we're extending the base class.
        super(ctx, env)
    }

    async sayHello(): Promise<string> {
        let result = this.ctx.storage.sql
            .exec("SELECT 'Hello, World!' as greeting")
            .one();
        return result.greeting as string;
    }
}

export default {
    async fetch(request, env, ctx): Promise<Response> {
        return sv.fetch(request, env, ctx);
    },
} satisfies ExportedHandler<Env>;
