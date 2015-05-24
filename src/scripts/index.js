// Globals and general ugliness.
window.$ = require('jquery');
window.jQuery = $;
var fs = require('fs');
var HTMLTable = require('./htmltable');
var settings = require('./settings');

// Register our service worker.
require('../worker/register');

$(window).resize(function(){
    var bodyHeight = $(window).innerHeight();
    $('body').height(bodyHeight);
    $('#editor').height(bodyHeight - $('.navbar-static-top').outerHeight());
});

$(document).ready(function(){
    $(window).trigger('resize');

    // Populate the select
    var $select = $('select');
    Object.keys(HTMLTable.prototype.templates).forEach(function(templateName){
        var $option = $('<option></option>').text(templateName).attr('value', templateName);
        $select.append($option);
    });

    var $left = $('.left').focus();
    var $right = $('.right');
    var $bottom = $('.bottom');
    var $tabs = $('.nav-tabs');

    // Screw it, I should have used a proper library.
    var $heading = $('#heading');
    var $compact = $('#compact');

    // Load up our settings
    settings.get(function(err, settings){
        if(err){
            return;
        }
        $select.val(settings.mode);
        $heading.prop('checked', settings.heading);
        $compact.prop('checked', settings.compact);
    });

    // Main render
    function renderplz(){
        var state = {
            mode: $select.val(),
            heading: $heading.is(':checked'),
            compact: $compact.is(':checked'),
        };
        settings.set(state);

        var table = new HTMLTable();
		table.createFromBlob($left.val(), state.heading ? [0] : []);
        $right.text(table.make(state.mode));
        $bottom.html($(table.make('HTML')).addClass('table'));
    }

    // Re-render on change
    $('input, select, .left').on('change keyup', renderplz);

    // Switch to markup view so we have feedback + can see what's going on
    $('select').on('change', function(){
        $('a[href="#markup"]').click();
    });

    // Implement tabs.
    $('.nav-tabs a').on('click', function(){
        $(this).closest('.nav-tabs').find('li').removeClass('active');
        $(this).closest('li').addClass('active');
        $('.tabcontent').addClass('hidden');
        $($(this).attr('href')).removeClass('hidden');
        return false;
    });

    // Disable tab navigation feature.
    // This is a bit of an usability nightmare.
    // http://stackoverflow.com/questions/6637341/use-tab-to-indent-in-textarea
    $("textarea").keydown(function(e) {
        var $this, end, start;
        $this = $(this);

        // Include tab in textarea.
        if (e.keyCode === 9) {
            start = this.selectionStart;
            end = this.selectionEnd;
            $this.val($this.val().substring(0, start) + "\t" + $this.val().substring(end));
            this.selectionStart = this.selectionEnd = start + 1;
            return false;
        }

        // On "escape" key, jump out to the next checkbox.
        if(e.keyCode === 27){
            $('.checkbox input:eq(0)').focus();
        }
    });


});
