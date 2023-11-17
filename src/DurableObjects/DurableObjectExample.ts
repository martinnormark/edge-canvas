import { Env } from '../environment';

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
