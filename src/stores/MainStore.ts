/**
 * This store is responsible for storing any general,
 * app-wide state that doesn't require its own store.
 */

import { defineStore } from 'pinia'
import router from '@/router'

// Type declarations
type State = {
	_screenWidth: number | null
	_contentWidth: number | null
	_onClickAnywhere: (e: MouseEvent) => void
	_blockRouting: boolean
	_scrollY: number
	_apiOffline: boolean
}

export const useMainStore = defineStore('mainStore', {
	state: (): State => ({
		_screenWidth: null, // The available width of the viewport
		_contentWidth: null, // The width of the content area (screen - padding)
		_onClickAnywhere: () => {}, // Executes when the user clicks anywhere on the page
		_blockRouting: false, // Prevents the router from changing routes, including changes to the query
		_scrollY: 0, // The current scroll position
		_apiOffline: false, // Whether the API is offline
	}),
	getters: {
		screenWidth(): number | null {
			return this._screenWidth
		},
		contentWidth(): number | null {
			return this._contentWidth
		},
		onClickAnywhere(): (e: MouseEvent) => void {
			return this._onClickAnywhere
		},
		blockRouting(): boolean {
			return this._blockRouting
		},
		scrollY(): number {
			return this._scrollY
		},
		apiOffline(): boolean {
			return this._apiOffline
		},
	},
	actions: {
		// Set screen width
		setScreenWidth(width: number) {
			this._screenWidth = width
		},

		// Set content width
		setContentWidth(width: number) {
			this._contentWidth = width
		},

		// Set onBlur function
		setOnClickAnywhere(fn: (e: MouseEvent) => void) {
			this._onClickAnywhere = fn
		},

		// Set blockRouting
		setBlockRouting(bool: boolean) {
			this._blockRouting = bool
		},

		// Set scroll position
		setScrollY(scrollY: number) {
			this._scrollY = scrollY
		},

		// Set API offline error
		setApiOffline(state: boolean) {
			this._apiOffline = state
		},
	},
})
