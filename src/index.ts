import { Hono } from 'hono';
export { DurableObjectExample } from './DurableObjects/DurableObjectExample';
import { Env } from './environment';
import workspaceApi from './workspace';
import testApi from './test';

const app = new Hono<{
	Bindings: Env;
}>();

app.get('/', (c) => c.text('Hello Cloudflare Workers!'));
app.route('/test', testApi);
app.route('/workspaces', workspaceApi);

export default app;
