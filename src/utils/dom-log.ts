/**
 * Quick and dirty way to log onto the DOM.
 * For when console access is not possible or convenient.
 */

const domLogSettings: {
	top: string | 0
	bottom: string | 0
	background: string
	color: string
	height: string
} = {
	top: 'auto',
	bottom: 0,
	background: 'white',
	color: 'black',
	height: '100px',
}

export default function domLog(msg: any) {
	// Find logger element or create it.
	let log = document.getElementById('dom-log') as HTMLTextAreaElement

	// Parse settings
	const { top, bottom, background, color, height } = domLogSettings

	if (!log) {
		log = document.createElement('textarea') as HTMLTextAreaElement
		log.id = 'dom-log'
		log.style.cssText = `position:fixed;top:${top};bottom:${bottom};left:0;right:0;z-index:10000;height:${height};background:${background};color:${color};border:none;box-shadow:0 0 50px rgba(0,0,0,.1);overflow-y:scroll;`
		document.body.appendChild(log)

		// Close button
		const exit = document.createElement('a') as HTMLAnchorElement
		const exitTop = top == 'auto' ? 'auto' : parseInt(String(top)) + parseInt(height) + 5 + 'px'
		const exitBottom = bottom == 'auto' ? 'auto' : parseInt(String(bottom)) + parseInt(height) + 5 + 'px'
		exit.style.cssText = `position:fixed;top:${exitTop};bottom:${exitBottom};right:10px;z-index:10000;font-size:12px;`
		exit.textContent = 'close'
		exit.href = '#'
		exit.onclick = () => {
			log.remove()
			exit.remove()
			return false
		}
		document.body.appendChild(exit)
	}

	// Parse message
	if (typeof msg === 'object') {
		if (Array.isArray(msg)) {
			msg = '[' + msg.join(', ') + ']'
		} else if (msg instanceof Error) {
			msg = msg.stack
		} else if (msg !== null) {
			msg = JSON.stringify(msg, null, 2)
		}
	}

	// Log message
	if (log.value.length) msg = '\n' + msg
	log.value += msg
}
