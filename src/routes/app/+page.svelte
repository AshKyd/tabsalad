<script>
	import { TabSalad } from '$lib/tabsalad.svelte.js';
	import {
		Tabs,
		Select,
		Header,
		Button,
		MenuButton,
		MenuItem,
		Modal,
		Icon,
		InputGroup
	} from 'svelte-akui';
	import { onMount, untrack } from 'svelte';
	import Prism from 'prismjs';
	import 'prismjs/components/prism-wiki';
	import 'prismjs/components/prism-markdown';
	import 'prismjs/components/prism-json';
	import 'prismjs/themes/prism.css';

	const app = new TabSalad();

	const formats = [
		{ value: 'HTML', label: 'HTML' },
		{ value: 'MediaWiki', label: 'MediaWiki' },
		{ value: 'GitHub markdown', label: 'GitHub markdown' },
		{ value: 'JSON', label: 'JSON' }
	];

	let activeId = $state('markup');
	let isMobile = $state(false);

	onMount(() => {
		const checkMobile = () => {
			isMobile = window.innerWidth < 1024;
		};
		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	});

	// If we move to mobile, and activeId is markup/preview, keep it.
	// If we move from mobile, and activeId is 'edit', switch to 'markup'.
	$effect(() => {
		if (!isMobile && activeId === 'edit') {
			untrack(() => (activeId = 'markup'));
		}
	});

	const tabItems = $derived.by(() => {
		const base = [
			{ id: 'markup', label: 'Markup' },
			{ id: 'preview', label: 'Preview' }
		];
		if (isMobile) {
			return [{ id: 'edit', label: 'Edit' }, ...base];
		}
		return base;
	});

	const highlightedOutput = $derived.by(() => {
		if (typeof window === 'undefined') return app.output;
		const mode = app.mode;
		let lang = 'markup';
		if (mode === 'MediaWiki') lang = 'wiki';
		if (mode === 'GitHub markdown') lang = 'markdown';
		if (mode === 'JSON') lang = 'json';

		const grammar = Prism.languages[lang] || Prism.languages.markup;
		if (!grammar || !app.output) return app.output || '';
		return Prism.highlight(app.output, grammar, lang);
	});

	let showAbout = $state(false);
	let copied = $state(false);
	function copyOutput() {
		navigator.clipboard.writeText(app.output);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<Header>
	{#snippet title()}
		<img src="/favicon.ico" alt="" style="height: 1.5rem; margin-right: 0.5rem;" />
		Tabsalad
	{/snippet}

	<div class="header-controls">
		<label class="checkbox-label">
			<input type="checkbox" bind:checked={app.heading} />
			<span>Include headings</span>
		</label>

		<div class="select-wrapper">
			<Select options={formats} bind:value={app.mode} />
		</div>

		{#snippet menuItems()}
			<MenuItem label={copied ? 'Copied!' : 'Copy Markup'} icon="clipboard" onclick={copyOutput} />
			<MenuItem label="About Tabsalad" icon="info-circle" onclick={() => (showAbout = true)} />
		{/snippet}

		<MenuButton
			menu={menuItems}
			size="medium"
			variant="regular"
			origin="bottom-right"
			icon="list"
		/>
	</div>
</Header>

<main class="app-container" class:mobile={isMobile}>
	<div class="editor-area">
		{#if !isMobile}
			<div class="input-panel">
				<textarea
					bind:value={app.input}
					placeholder="Paste spreadsheet cells here (Tab separated)"
					class="raw-textarea"
				></textarea>
			</div>
		{/if}

		<div class="output-panel">
			<div class="output-tabs">
				<Tabs bind:activeId items={tabItems} />
			</div>

			<div class="output-content">
				{#if activeId === 'edit' && isMobile}
					<textarea
						bind:value={app.input}
						placeholder="Paste spreadsheet cells here (Tab separated)"
						class="raw-textarea"
					></textarea>
				{:else}
					<div class="content-view" class:hidden={activeId !== 'markup'}>
						<div class="markup-scroll">
							<pre class="highlighted-code"><code
									class="language-{app.mode === 'MediaWiki'
										? 'wiki'
										: app.mode === 'GitHub markdown'
											? 'markdown'
											: app.mode === 'JSON'
												? 'json'
												: 'markup'}">{@html highlightedOutput}</code
								></pre>
						</div>
					</div>
					<div class="content-view" class:hidden={activeId !== 'preview'}>
						<div class="preview-area">
							{#if app.input.trim()}
								{@const data = app.data}
								<table>
									{#if data.thead}
										<thead>
											{#each data.thead.rows as row, i (i)}
												<tr>
													{#each row.cells as cell, j (j)}
														<th>{cell.value}</th>
													{/each}
												</tr>
											{/each}
										</thead>
									{/if}
									{#if data.tbody}
										<tbody>
											{#each data.tbody.rows as row, i (i)}
												<tr>
													{#each row.cells as cell, j (j)}
														<td>{cell.value}</td>
													{/each}
												</tr>
											{/each}
										</tbody>
									{/if}
								</table>
							{:else}
								<p>Paste data to see preview</p>
							{/if}
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</main>

{#if showAbout}
	<Modal title="About Tabsalad" onClose={() => (showAbout = false)} fullscreenOnMobile={true}>
		<div class="about-modal-inner">
			<div class="about-content-body">
				<div class="about-logo-row">
					<img src="/favicon.ico" alt="Tabsalad Logo" />
					<p class="about-tagline">Markdown conversion made simple.</p>
				</div>
				<p>
					Tabsalad is a high-performance utility for converting spreadsheet data into formatted
					tables for HTML, MediaWiki, GitHub Markdown, and JSON.
				</p>
				<p>Built with Svelte 5 and the AKUI design system.</p>

				<InputGroup joined={true} size="small" class="about-social-group">
					<Button
						variant="regular"
						icon="github"
						label="Source"
						onclick={() => window.open('https://github.com/AshKyd/tabsalad', '_blank')}
					/>
					<Button
						variant="regular"
						icon="exclamation-circle"
						label="Issues"
						onclick={() => window.open('https://github.com/AshKyd/tabsalad/issues', '_blank')}
					/>
				</InputGroup>

				<hr class="about-divider" />
				<p class="about-copyright">© 2008–2026 Ash Kyd</p>
			</div>
		</div>
	</Modal>
{/if}

<style>
	.header-controls {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		height: 100%;
	}

	.checkbox-label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
		font-size: 0.85rem;
		user-select: none;
		color: var(--akui-fg-secondary);
	}

	.checkbox-label:hover {
		color: var(--akui-fg);
	}

	.select-wrapper {
		width: 140px;
	}

	.app-container {
		display: flex;
		flex-direction: column;
		height: calc(100vh - 4rem);
	}

	.editor-area {
		display: flex;
		flex: 1;
		min-height: 0;
	}

	.input-panel,
	.output-panel {
		flex: 1;
		display: flex;
		flex-direction: column;
		min-width: 0;
	}

	.input-panel {
		border-right: 1px solid var(--akui-border-input);
	}

	.output-tabs {
		position: relative;
		z-index: 60; /* Above Header's z-index: 50 */
		/* Pull tabs up to overlap header border */
		margin-top: -2.25rem;
		padding-left: 0.5rem;
		pointer-events: none;
		width: fit-content;
	}

	:global(.output-tabs > *) {
		pointer-events: auto;
	}

	/* Adjust Tabs component for overlapping look */
	:global(.output-tabs .akui-tabs-list) {
		border-bottom: none !important;
		padding-bottom: 0 !important;
	}

	:global(.output-tabs .akui-tab) {
		background-color: var(--akui-bg-secondary) !important;
		border-bottom-left-radius: 0 !important;
		border-bottom-right-radius: 0 !important;
	}

	:global(.output-tabs .akui-tab.active) {
		background-color: var(--akui-bg) !important;
	}

	:global(.output-tabs .akui-tabs-filler) {
		border-bottom: none !important;
		display: none !important;
	}

	.output-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		min-height: 0;
		background-color: var(--akui-bg);
		z-index: 5;
		border-radius: 0;
	}

	.content-view {
		flex: 1;
		display: flex;
		flex-direction: column;
		min-height: 0;
	}

	.content-view.hidden {
		display: none;
	}

	.markup-scroll {
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow: auto;
		background-color: white;
		min-height: 0;
	}

	.highlighted-code {
		flex: 1;
		margin: 0 !important;
		padding: 1.5rem !important;
		background: transparent !important;
		font-family: var(--akui-font-mono, monospace) !important;
		font-size: 0.9rem !important;
		line-height: 1.5 !important;
		tab-size: 4;
		white-space: pre-wrap !important;
		word-break: break-all !important;
	}

	/* Override Prism default white background to match our UI if needed, 
	   but user asked for white, so transparent + white container is fine. */

	.raw-textarea {
		flex: 1;
		width: 100%;
		border: none;
		resize: none;
		padding: 1.5rem;
		font-family: var(--akui-font-mono, monospace);
		font-size: 1rem;
		background-color: var(--akui-bg);
		color: var(--akui-fg);
		outline: none;
		border-radius: 0;
	}

	/* Removed output-textarea usage */

	.preview-area {
		flex: 1;
		padding: 2rem;
		overflow: auto;
		background-color: white;
		color: black;
		border-radius: 0;
	}

	@media (max-width: 1023px) {
		.header-controls {
			gap: 0.75rem;
		}
		.select-wrapper {
			width: 110px;
		}
		.checkbox-label span {
			display: inline;
		}
		.output-tabs {
			margin-top: 0;
			z-index: 10;
			width: 100%;
			padding-left: 0;
		}
		.output-content {
			border-top: none;
		}
		:global(.akui-header) {
			border-bottom: none !important;
		}
	}

	.about-modal-inner {
		max-width: 480px;
		width: 100%;
		margin: 0 auto;
	}

	.about-content-body {
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		line-height: 1.5;
		color: var(--akui-fg-secondary);
	}

	.about-logo-row {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 0.5rem;
	}

	.about-logo-row img {
		height: 2.5rem;
		width: auto;
	}

	.about-tagline {
		font-weight: 600;
		color: var(--akui-fg);
		margin: 0;
	}

	.about-divider {
		border: none;
		border-top: 1px solid var(--akui-border-input);
		margin: 0.5rem 0;
	}

	.about-social-group {
		margin: 0.5rem auto;
	}

	.about-copyright {
		display: block;
		text-align: center;
		opacity: 0.7;
	}

	:global(.preview-area table) {
		width: 100%;
		border-collapse: collapse;
		margin-bottom: 1rem;
	}

	:global(.preview-area th, .preview-area td) {
		border: 1px solid #ddd;
		padding: 8px;
		text-align: left;
	}

	:global(.preview-area th) {
		background-color: #f2f2f2;
	}
</style>
