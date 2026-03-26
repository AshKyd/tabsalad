<script>
	let {
		title = 'Tabsalad | Precision Table Markup Generator',
		description = 'Quickly create table markup in HTML, GitHub, JIRA, MediaWiki and JSON formats',
		type = 'website',
		url = 'https://tabsalad.kyd.au/',
		image = 'https://tabsalad.kyd.au/og-image.png',
		themeColor = '#f68f34'
	} = $props();
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:type" content={type} />
	<meta property="og:url" content={url} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />
	<link rel="canonical" href={url} />
	<meta name="theme-color" content={themeColor} />
</svelte:head>
