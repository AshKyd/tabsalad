import Mustache from 'mustache';

const HTML_TEMPLATE = `<table>
{{#caption}}<caption>{{caption}}</caption>
{{/caption}}
{{#thead}}
<thead>
{{#rows}}
<tr>{{#cells}}<th>{{value}}</th>{{/cells}}</tr>
{{/rows}}
</thead>
{{/thead}}
{{#tbody}}
<tbody>
{{#rows}}
<tr>{{#cells}}<td>{{value}}</td>{{/cells}}</tr>
{{/rows}}
</tbody>
{{/tbody}}
</table>`;

function cast(val) {
	if (!isNaN(val) && !isNaN(parseFloat(val))) {
		return Number(val);
	}
	if (val === 'true') return true;
	if (val === 'false') return false;
	if (val === 'null') return null;
	return val;
}

export class TabSalad {
	input = $state('');
	heading = $state(false);
	mode = $state('HTML');

	constructor() {
		// Initialize from localStorage if on client
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('tabsalad-settings');
			if (saved) {
				try {
					const { heading, mode } = JSON.parse(saved);
					this.heading = heading;
					this.mode = mode;
				} catch (e) {
					console.error('Failed to load settings', e);
				}
			}

			// Persist settings on change
			$effect(() => {
				localStorage.setItem(
					'tabsalad-settings',
					JSON.stringify({ heading: this.heading, mode: this.mode })
				);
			});
		}
	}

	data = $derived.by(() => {
		const lines = this.input
			.trim()
			.replace(/\r/g, '')
			.split('\n')
			.map((line) => line.split('\t'));

		if (lines.length === 0 || (lines.length === 1 && lines[0][0] === '')) {
			return { thead: null, tbody: { rows: [] } };
		}

		const result = {
			thead: null,
			tbody: { rows: [] }
		};

		let workingLines = [...lines];

		if (this.heading && workingLines.length > 0) {
			result.thead = {
				rows: [{ cells: workingLines.shift().map((val) => ({ value: val })) }]
			};
		}

		result.tbody.rows = workingLines
			.filter((row) => row.join('').trim().length > 0)
			.map((row) => ({
				cells: row.map((val) => ({ value: val }))
			}));

		return result;
	});

	output = $derived.by(() => {
		const data = this.data;
		if (!data.tbody.rows.length && !data.thead) return '';

		switch (this.mode) {
			case 'HTML':
				return Mustache.render(HTML_TEMPLATE, data).trim();
			case 'MediaWiki':
				return this.renderMediaWiki(data).trim();
			case 'GitHub markdown':
				return this.renderMarkdown(data).trim();
			case 'JSON':
				return this.renderJSON(data).trim();
			default:
				return '';
		}
	});

	renderMediaWiki(data) {
		let str = '{|\n';
		if (data.thead) {
			str += '! ' + data.thead.rows[0].cells.map((c) => c.value).join(' !! ') + '\n|-\n';
		}
		str +=
			'| ' + data.tbody.rows.map((r) => r.cells.map((c) => c.value).join(' || ')).join('\n|-\n| ');
		str += '\n|}';
		return str;
	}

	renderMarkdown(data) {
		let str = '';
		if (data.thead) {
			const head = data.thead.rows[0].cells.map((c) => c.value);
			str += '| ' + head.join(' | ') + ' |\n';
			str += '| ' + head.map(() => '---').join(' | ') + ' |\n';
		}
		str += data.tbody.rows
			.map((r) => '| ' + r.cells.map((c) => c.value).join(' | ') + ' |')
			.join('\n');
		return str;
	}

	renderJSON(data) {
		if (data.thead) {
			const keys = data.thead.rows[0].cells.map((c) => c.value);
			const rows = data.tbody.rows.map((r) => {
				const obj = {};
				r.cells.forEach((c, i) => {
					obj[keys[i] || `column${i}`] = cast(c.value);
				});
				return obj;
			});
			return JSON.stringify(rows, null, 2);
		}
		const rows = data.tbody.rows.map((r) => r.cells.map((c) => cast(c.value)));
		return JSON.stringify(rows, null, 2);
	}
}
