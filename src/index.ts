/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
	//
	// Example binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/
	// MY_QUEUE: Queue;

	EXAMPLE_CLASS: DurableObjectNamespace;
}

export class DurableObjectExample {
	state: DurableObjectState;
	createdOn: Date;
	loadedFromStorage: boolean = false;

	constructor(state: DurableObjectState, env: Env) {
		this.state = state;
		this.createdOn = new Date();

		this.state.blockConcurrencyWhile(async () => {
			let value = await this.state.storage.get<Date>('createdOn');
			if (value) {
				this.createdOn = value;
				this.loadedFromStorage = true;
			} else {
				await this.state.storage.put<Date>('createdOn', this.createdOn);
			}
		});
	}

	async fetch(request: Request) {
		return new Response(`Hello World, created on ${this.createdOn.toISOString()} ${this.loadedFromStorage ? '(loaded from storage)' : ''}`);
	}
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		let id = env.EXAMPLE_CLASS.idFromName(new URL(request.url).pathname);

		let stub = env.EXAMPLE_CLASS.get(id);

		let response = await stub.fetch(request);

		return response;
	},
};
