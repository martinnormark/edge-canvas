import { Hono } from 'hono';

const workspaceApi = new Hono();
workspaceApi.get('/', (c) => c.text('List Books')); // GET /book
workspaceApi.get('/:id', (c) => {
	// GET /book/:id
	const id = c.req.param('id');
	return c.text('Get Book: ' + id);
});
workspaceApi.post('/', (c) => c.text('Create Book'));

export default workspaceApi;
