var HtmlTableCell = require('./cell');
var HtmlTableRow = function(contents){
	this.cells = [];
};
HtmlTableRow.prototype = HtmlTableCell.prototype;

module.exports = HtmlTableRow;
