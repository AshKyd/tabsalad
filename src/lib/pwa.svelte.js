import { browser } from '$app/environment';

class PWAState {
	/** @type {any} */
	installPrompt = $state(null);

	async install() {
		if (!this.installPrompt) return;
		this.installPrompt.prompt();
		const { outcome } = await this.installPrompt.userChoice;
		this.installPrompt = null;
		return outcome;
	}
}

export const pwa = new PWAState();

if (browser) {
	window.addEventListener('beforeinstallprompt', (e) => {
		e.preventDefault();
		pwa.installPrompt = e;
	});
}
