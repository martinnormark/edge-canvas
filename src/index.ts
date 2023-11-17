import { Hono } from 'hono';
import { serveStatic } from 'hono/cloudflare-workers';
export { DurableObjectExample } from './DurableObjects/DurableObjectExample';
import { Env } from './environment';
import workspaceApi from './workspace';
import testApi from './test';

const app = new Hono<{
	Bindings: Env;
}>();

app.get('/app/*', serveStatic({ root: './' }));
app.route('/test', testApi);
app.route('/workspaces', workspaceApi);

export default app;
