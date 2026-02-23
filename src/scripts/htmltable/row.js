import HtmlTableCell from "./cell";

const HtmlTableRow = function () {
  this.cells = [];
};
HtmlTableRow.prototype = HtmlTableCell.prototype;

export default HtmlTableRow;
