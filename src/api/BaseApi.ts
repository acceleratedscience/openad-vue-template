// This is the base API class that all APIs classes extend.
// - - -
// The triple-slash directive below is meant for for TypeScript
// to recognize the type for process.env.NODE_ENV
// Note: types were installed as a dev dependency @types/node
// https://www.typescriptlang.org/docs/handbook/triple-slash-directives.html#-reference-types-
/// <reference types="node" />

// Modules
import axios from 'axios'

// Stores
import { useMainStore } from '@/stores/MainStore'

// Type declarations
type AxiosError = {
	response: {
		status: number
		statusText: string
		data?: any
	}
	code: string
}

// API urls
const BASE_URL_PROD = 'https://someservice.com/api/v1/'
const BASE_URL_DEV = 'http://127.0.0.1:8100/api/v1/'

//
//
//
//

type BaseApiType = {
	apiClient: any
	setupInterceptors: () => void
}

class BaseApi implements BaseApiType {
	static isInitialized = false
	apiClient: any

	constructor({
		name,
		baseURLProd,
		baseURLDev,
		withCredentials,
	}: {
		name?: string
		baseURLProd?: string
		baseURLDev?: string
		withCredentials?: boolean
	}) {
		// Create axios instance for API.
		const baseURL = process.env.NODE_ENV == 'development' ? baseURLDev || BASE_URL_DEV : baseURLProd || BASE_URL_PROD
		this.apiClient = axios.create({
			baseURL,
			withCredentials: withCredentials || false, // Set to true if using cookies
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})

		// Set up response/request interceptors.
		this.setupInterceptors()

		// Registration message
		if (name && process.env.NODE_ENV == 'development') {
			console.log('Registered API module:', name)
		}

		// API health check
		if (!BaseApi.isInitialized) {
			if (process.env.NODE_ENV == 'development') this.healthCheck(baseURL)
			BaseApi.isInitialized = true
		}
	}

	// Set up response/request interceptors.
	async setupInterceptors() {
		// Intercept requests
		this.apiClient.interceptors.request.use(
			async (req: object) => {
				// Request interceptor go here
				// Attach auth tokens etc.
				return req
			},
			// Do nothing with request errors
			(error: object) => Promise.reject(error),
		)

		// Intercept responses
		this.apiClient.interceptors.response.use(
			async (res: object) => {
				// Response interceptors here
				// Store authTokens, etc.
				return res
			},

			// Handle response errors
			async (err: AxiosError) => {
				return _handleError(err)
			},
		)

		// Catch errors and return { status, error }
		function _handleError(err: AxiosError) {
			let { response } = err
			const { code } = err
			if (response) {
				// Regular http error (might still have data)
				const { status, data } = response
				// HTTP/2 doesn't support response.statusText, can add manual statusText to response.
				const statusText = data.statusText || response.statusText
				delete data.statusText
				response = { status, statusText, data }
			} else {
				// Invalid URL
				if (code == 'ENOTFOUND') {
					// This is a the not-found in Mongo, massage this as needed depending on the API.
					response = { status: 500, statusText: 'Invalid URL' }
				} else {
					response = { status: 500, statusText: 'API Offline' }
				}
			}
			return response
		}
	}

	// Check if the API is available.
	healthCheck(baseURL: string) {
		this.apiClient.get('/health').then((res: any) => {
			if (res.status == 200) {
				console.log(`The API is available on ${baseURL}`)
			} else {
				setTimeout(() => {
					const errorMsg: string[] = [
						'',
						'- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -',
						'%cThe API is not available.%c',
						`It should be available on ${baseURL}.`,
						'- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -',
						'',
					]
					console.log(errorMsg.join('\n'), 'color:#d00;font-weight:bold;font-size:14px;text-transform:uppercase', '')
					const mainStore = useMainStore()
					mainStore.setApiOffline(true)
				}, 0)
			}
		})
	}
}

export default BaseApi
