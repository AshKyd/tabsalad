var HtmlTableCell = function(contents, index) {
  this.value = contents;
  this.index = index;
};

HtmlTableCell.prototype = {
  lineBreak: "\n",
  wikiSeparator: function() {
    if (this.index === 0) {
      return "|";
    } else {
      return "||";
    }
  }
};

module.exports = HtmlTableCell;
