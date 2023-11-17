import { Context, Hono } from 'hono';
import { Env } from './environment';

const testApi = new Hono<{
	Bindings: Env;
}>();

testApi.get('*', async (ctx) => {
	let id = ctx.env.EXAMPLE_CLASS.idFromName(new URL(ctx.req.url).pathname);

	let stub = ctx.env.EXAMPLE_CLASS.get(id);

	let response = await stub.fetch(ctx.req.url);

	return response;
});

export default testApi;
