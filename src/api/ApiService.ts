import type { Ref } from 'vue'

// Define the API services
import MainApi from '@/api/MainApi'
export const mainApi = new MainApi()

type FetchOptions = {
	onSuccess?: ((response: any) => void) | null
	onError?: ((error: any) => void) | null

	// Option A:
	// Link the loading status to a reactive variable (most cases)
	loading?: Ref<boolean | null>
	loadingError?: Ref<string | null>
	status?: Ref<number | null> // API response status

	// Option B:
	// Use loading status callback functions (for use in pinia stores)
	setLoading?: (value: boolean) => void
	setLoadingError?: (value: string | null) => void
	setStatus?: (value: number | null) => void
}

export async function apiFetch(
	apiCall: Promise<any>,
	{ onSuccess, onError, loading, loadingError, status, setLoading, setLoadingError, setStatus }: FetchOptions,
) {
	// Option A:
	if (loading) loading.value = true
	if (loadingError) loadingError.value = null
	if (status) status.value = null

	// Option B:
	if (setLoading) setLoading(true)
	if (setLoadingError) setLoadingError(null)
	if (setStatus) setStatus(null)

	try {
		const response = await apiCall
		if (response.status === 200) {
			// Success
			if (onSuccess) onSuccess(response.data)
		} else {
			// Error from server
			if (loadingError) loadingError.value = response.statusText
			if (setLoadingError) setLoadingError(response.statusText)
			if (onError) onError(response)
			const data = response.data && typeof response.data === 'string' ? `\n${response.data}` : ''
			console.log(
				`\n%cAPI Error ${response.status}:%c ${response.statusText}%c${data}\n`,
				'color:#d00;text-transform:uppercase',
				'text-transform:uppercase',
				'font-style:italic',
			)
		}
		if (status) status.value = response.status
		if (setStatus) setStatus(response.status)
	} catch (error) {
		// Error in frontend
		const errMsg = 'Something went wrong connecting to the API.'
		if (loadingError) loadingError.value = errMsg
		if (setLoadingError) setLoadingError(errMsg)
		if (onError) onError(error)
		if (status) status.value = 0
		if (setStatus) setStatus(0)
		console.error(errMsg, '\n', error)
	} finally {
		if (loading) loading.value = false
		if (setLoading) setLoading(false)
	}
}
