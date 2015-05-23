$(document).ready(function(){
	
	var clickAnchor = function(){
		var id = $(this).attr('href');
		
		if($(id).is(':visible')){
			return false;
		}
		
		try{
			$(this)
				.closest('ul')
				.find('.selected')
				.removeClass('selected');
			$(this).addClass('selected');
		}catch(e){}
		
		
		$('.column').not(id).each(function(){
			if($(this).is(':visible')){
				$(this).stop().slideUp();
			}
		});
		
		$(id).slideDown();
		
		if(typeof _gaq != 'undefined'){
			_gaq.push(['_trackEvent', 'Convert', 'Preview', id]);
		}
		
		return false;
	}
		
	var processInput = function(){
		
		var data = $input.val();
		var template = $('[name="template"]:checked').val();
		var htmlTable = new HtmlTable();
		if($('#automatic-caption').is(':checked')){
			htmlTable.automaticCaption = true;
		}
		var headings = [];
		if($('#firstrow-heading').is(':checked')){
			headings = [0];
		}
		htmlTable.createFromBlob(data,headings);
		
		var defaultTable = 'htmlTable';
		var outputTable = htmlTable.make(defaultTable);
		
		if(template != defaultTable){
			var outputSource = htmlTable.make(template);
		} else {
			outputSource = outputTable;
		}
		
		var animationComplete =function(){
			$('#output').text(outputSource);
			$('#preview').html(outputTable);
			$results.fadeIn();
			clickAnchor.call($('#defaultView'));
			$('html,body').animate({scrollTop : $results.offset().top - 10});
		}
		var columns = $('.column:visible')
		if(columns.length > 0) {
			columns.slideUp(animationComplete);
		} else {
			animationComplete();
		}
		
		if(typeof _gaq != 'undefined'){
			_gaq.push(['_trackEvent', 'Convert', 'Commencify',template]);
		}
		
		return false;
	};
	
	var $input = $('<textarea id="graphall"></textarea>');
	var $form = $('<form method="post" action="#"><p>Paste cells from a spreadsheet, another table, or any other (tab delineated) data source to convert into a nice wiki or HTML source.</p><label for="graphall">Paste Data Here</label><br/></form>')
		.append($input)
		.submit(processInput)
		.append('<fieldset><legend>Convert To</legend><ul class="toggly"><li><input type="radio" id="wiki" value="wikiTable" checked name="template"><label for="wiki">Wiki Code</label></li><li><input type="radio" value="htmlTable" id="html" name="template"><label for="html">HTML Code</label></li></ul></fieldset><fieldset><legend>Nice Things</legend><ul class="toggly"><li><input type="checkbox" value="true" id="firstrow-heading" checked><label for="firstrow-heading">First row is a Heading</label></li><li><input type="checkbox" value="true" id="automatic-caption" checked><label for="automatic-caption">Automatic Caption</label></li></ul></fieldset><div class="submit"><button type="submit">Commencify</button></div>');
	var $results = $('<div id="results"><ul><li><a id="defaultView" href="#output">Output</a></li><li><a href="#preview">Preview</a></li></ul><div id="preview" class="column"></div><pre id="output" class="column">Paste some table rows.</pre></div>')
		.hide()
		.find('a')
			.click(clickAnchor)
		.end()
		.find('.column')
			.hide()
		.end();
			
	$('body')
		.hide()
		.append($form)
		.append($results)
		.fadeIn();
	
});
