<script>
	import SEO from '$lib/SEO.svelte';
</script>

<SEO />

<header class="page-header">
	<div class="container">
		<h1><img src="/favicon.ico" alt="" width="32" height="32" /> Tabsalad</h1>
	</div>
</header>

<main>
	<section class="hero">
		<div class="container">
			<div class="hero-content">
				<h2>Transform spreadsheet cells into clean markup.</h2>
				<p>
					Paste data from Excel or Google Sheets and instantly generate optimized table markup for
					HTML, GitHub, JIRA, MediaWiki, or JSON.
				</p>
				<div class="cta-group">
					<a href="/app/" class="btn btn-primary">Launch Application</a>
				</div>
			</div>
		</div>
	</section>

	<section class="formats">
		<div class="container">
			<header class="section-header">
				<h2>Seamlessly integrated formats.</h2>
				<p>One tool for all your documentation and web development needs.</p>
			</header>

			<div class="points-grid">
				<div class="point-card">
					<img style="--color: #fddb3c" alt="Mediawiki" src="/mediawiki.png" />
					<p>MediaWiki</p>
				</div>
				<div class="point-card">
					<img style="--color: #4b95d4" alt="JIRA" src="/jira.png" />
					<p>Atlassian JIRA</p>
				</div>
				<div class="point-card">
					<img style="--color: #f06527" alt="Markdown" src="/github.png" />
					<p>GitHub Markdown</p>
				</div>
				<div class="point-card">
					<img style="--color: #e2e4ec" alt="HTML5" src="/HTML5.svg" />
					<p>Clean HTML5</p>
				</div>
				<div class="point-card">
					<img style="--color: #11a55c" alt="JSON" src="/json.svg" />
					<p>Structured JSON</p>
				</div>
			</div>
		</div>
	</section>

	<section class="testimonials-section">
		<div class="container">
			<div class="testimonials-grid">
				<figure class="testimonial">
					<blockquote>
						“Great time saver! Dead easy changing my Google Sheets data into a good display in a web
						document.”
					</blockquote>
					<figcaption>— Adrian F</figcaption>
				</figure>
				<figure class="testimonial">
					<blockquote>
						“Simplest and best solution I've found for getting my data published quickly. I'm going
						to wear out my keyboard with how much I'm using this.”
					</blockquote>
					<figcaption>— A Google User</figcaption>
				</figure>
				<figure class="testimonial">
					<blockquote>
						“Great app to quickly convert tables between different formats and languages.”
					</blockquote>
					<figcaption>— Or S</figcaption>
				</figure>
			</div>
		</div>
	</section>

	<section class="cta">
		<div class="container">
			<h2>Ready to streamline your workflow?</h2>
			<div style="margin-top: 3rem">
				<a href="/app/" class="btn btn-primary">Open Tabsalad</a>
			</div>
		</div>
	</section>
</main>

<footer>
	<div class="container">
		<p>
			A project by <a href="https://ashk.au/">Ash Kyd</a>. Found on
			<a href="https://github.com/AshKyd/tabsalad">GitHub</a>.
		</p>
	</div>
</footer>

<a href="https://github.com/ashkyd/tabsalad" class="fork-me">
	<img
		alt="Fork me on GitHub"
		src="https://github.blog/wp-content/uploads/2008/12/forkme_right_darkblue_121621.png?resize=120%2C120"
		width="120"
		height="120"
	/>
</a>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap');

	:global(:root) {
		--primary: #f68f34;
		--primary-dark: #e27f27;
		--secondary: #1f1911;
		--accent: #fd7e14;

		--bg-dark: #0f0b07;
		--bg-card: #1a1612;
		--bg-light: #ffffff;

		--fg-dark: #ffffff;
		--fg-muted: rgba(255, 255, 255, 0.7);
		--fg-light: #1f1911;

		--glass: rgba(255, 252, 240, 0.05);
		--glass-border: rgba(255, 255, 255, 0.1);

		--font-main: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

		--radius-sm: 8px;
		--radius-md: 16px;
		--radius-lg: 32px;

		--transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	:global(*) {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	:global(body) {
		font-family: var(--font-main) !important;
		background-color: var(--bg-dark) !important;
		color: var(--fg-dark) !important;
		line-height: 1.6;
		overflow-x: hidden;
	}

	/* Typography */
	h1,
	h2,
	h3 {
		font-weight: 800;
		letter-spacing: -0.02em;
		line-height: 1.1;
	}

	h1 {
		font-size: clamp(2.5rem, 8vw, 4.5rem);
	}

	h2 {
		font-size: clamp(2rem, 5vw, 3rem);
		margin-bottom: 1.5rem;
	}

	p {
		font-size: 1.1rem;
		color: var(--fg-muted);
	}

	a {
		color: var(--primary);
		text-decoration: none;
		transition: var(--transition);
	}

	a:hover {
		filter: brightness(1.2);
	}

	/* Layout */
	.container {
		max-width: 1100px;
		margin: 0 auto;
		padding: 0 2rem;
	}

	section {
		padding: 100px 0;
	}

	/* Header */
	/* Page Header */
	.page-header {
		padding: 1.5rem 0;
		position: absolute;
		width: 100%;
		z-index: 100;
	}

	header h1 {
		font-size: 1.5rem;
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	header h1 img {
		width: 32px;
		height: 32px;
	}

	/* Button */
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 1rem 2.5rem;
		border-radius: var(--radius-lg);
		font-weight: 600;
		font-size: 1.1rem;
		transition: var(--transition);
		cursor: pointer;
		border: none;
	}

	.btn-primary {
		background: linear-gradient(135deg, var(--primary), var(--primary-dark));
		color: white;
		box-shadow: 0 10px 20px rgba(246, 143, 52, 0.3);
	}

	.btn-primary:hover {
		transform: translateY(-3px);
		box-shadow: 0 15px 30px rgba(246, 143, 52, 0.4);
	}

	/* Hero Section */
	.hero {
		min-height: 90vh;
		display: flex;
		align-items: center;
		background:
			radial-gradient(circle at 80% 20%, rgba(246, 143, 52, 0.15), transparent 40%),
			radial-gradient(circle at 20% 80%, rgba(226, 127, 39, 0.1), transparent 40%);
		position: relative;
	}

	.hero-content {
		max-width: 700px;
	}

	.hero h2 {
		background: linear-gradient(to right, #fff, #aaa);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		margin-bottom: 2rem;
	}

	.hero p {
		font-size: 1.25rem;
		margin-bottom: 3rem;
		max-width: 600px;
	}

	/* Formats Section */
	.formats {
		background: var(--bg-card);
	}

	.section-header {
		margin-bottom: 4rem;
		max-width: 600px;
	}

	.points-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: 2rem;
		margin-top: 4rem;
	}

	.point-card {
		background: var(--glass);
		border: 1px solid var(--glass-border);
		padding: 2.5rem 1.5rem;
		border-radius: var(--radius-md);
		text-align: center;
		transition: var(--transition);
	}

	.point-card:hover {
		transform: translateY(-10px);
		background: rgba(255, 252, 240, 0.08);
		border-color: var(--primary);
	}

	.point-card img {
		width: 48px;
		height: 48px;
		margin-bottom: 1.5rem;
		padding: 10px;
		border-radius: 12px;
		background: var(--color, #fff);
		box-shadow: 0 0 0 rgba(255, 255, 255, 0);
		transition: var(--transition);
		animation: glow 3s ease-in-out infinite;
		animation-delay: var(--delay, 0s);
	}

	.point-card:nth-child(1) img {
		--delay: 0s;
	}
	.point-card:nth-child(2) img {
		--delay: 0.6s;
	}
	.point-card:nth-child(3) img {
		--delay: 1.2s;
	}
	.point-card:nth-child(4) img {
		--delay: 1.8s;
	}
	.point-card:nth-child(5) img {
		--delay: 2.4s;
	}

	.point-card:hover img {
		transform: scale(1.1);
		box-shadow: 0 0 20px var(--color, #fff);
		filter: brightness(1.2);
	}

	.point-card p {
		color: #fff;
		font-weight: 600;
		font-size: 1.1rem;
	}

	/* Testimonials */
	.testimonials-section {
		padding-bottom: 150px;
	}

	.testimonials-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
		margin-top: 3rem;
	}

	blockquote {
		font-size: 1.2rem;
		font-style: italic;
		margin-bottom: 1.5rem;
		color: #fff;
		position: relative;
	}

	blockquote::before {
		content: '“';
		position: absolute;
		top: -20px;
		left: -20px;
		font-size: 4rem;
		opacity: 0.1;
		color: var(--primary);
	}

	figcaption {
		color: var(--fg-muted);
		font-weight: 600;
	}

	/* Call to Action */
	.cta {
		background: linear-gradient(135deg, var(--bg-card), #000);
		text-align: center;
		border-top: 1px solid var(--glass-border);
	}

	/* Footer */
	footer {
		padding: 4rem 0;
		border-top: 1px solid var(--glass-border);
		color: var(--fg-muted);
		font-size: 0.9rem;
	}

	footer p {
		max-width: 600px;
		margin: 0 auto;
	}

	.fork-me {
		position: fixed;
		top: 0;
		right: 0;
		z-index: 1000;
		opacity: 0.8;
		transition: var(--transition);
	}

	.fork-me:hover {
		opacity: 1;
	}

	/* Animations */
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.hero-content {
		animation: fadeIn 1s ease-out;
	}

	.point-card {
		animation: fadeIn 1s ease-out both;
	}

	.point-card:nth-child(1) {
		animation-delay: 0.2s;
	}
	.point-card:nth-child(2) {
		animation-delay: 0.3s;
	}
	.point-card:nth-child(3) {
		animation-delay: 0.4s;
	}
	.point-card:nth-child(4) {
		animation-delay: 0.5s;
	}
	.point-card:nth-child(5) {
		animation-delay: 0.6s;
	}

	@keyframes glow {
		0%,
		100% {
			filter: drop-shadow(0 0 2px var(--color, #fff));
			opacity: 0.8;
		}
		50% {
			filter: drop-shadow(0 0 10px var(--color, #fff));
			opacity: 1;
		}
	}
</style>
