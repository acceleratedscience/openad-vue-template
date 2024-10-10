import BaseApi from './BaseApi'

export default class MainApi extends BaseApi {
	constructor() {
		super({ name: 'MainApi' })
	}

	//
	//

	// Execute command.
	execCommand(command: string) {
		return this.apiClient.post('/exec-command', { command })
	}
}
