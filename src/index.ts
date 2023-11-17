import { Context, Hono } from 'hono';
export { DurableObjectExample } from './DurableObjects/DurableObjectExample';
import workspaceApi from './workspace';
import { Env } from './environment';

async function fetch(ctx: Context): Promise<Response> {
	let id = ctx.env.EXAMPLE_CLASS.idFromName(new URL(ctx.req.url).pathname);

	let stub = ctx.env.EXAMPLE_CLASS.get(id);

	let response = await stub.fetch(ctx.req.url);

	return response;
}

const app = new Hono<{
	Bindings: Env;
}>();

app.get('/', (c) => c.text('Hello Cloudflare Workers!'));
app.get('/test', fetch);
app.route('/workspaces', workspaceApi);

export default app;
