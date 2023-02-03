var fs = require("fs");
var Mustache = require("mustache");
var HtmlTableCell = require("./cell");
var HtmlTableRow = require("./row");
var templateMarkdown = require("./template-markdown");
var strPad = require("./strpad");

function cast(val) {
  if ($.isNumeric(val)) {
    return Number(val);
  }

  if (val === "true") {
    return true;
  }

  if (val === "false") {
    return false;
  }

  if (val === "null") {
    return null;
  }

  return val;
}

var HtmlTable = function() {};
HtmlTable.prototype = {
  zebra: false,
  rowNumbers: false,
  caption: false,
  createFromBlob: function(blob, headings) {
    var i;
    var data = blob
      .replace(/^\s/m, "") // Trim starting space.
      .replace(/\r/g, "")
      .split(/\n/);

    var caption = $.trim(data[0]);

    for (i = 0; i < data.length; i++) {
      data[i] = data[i].split(/\t/);
    }

    if (this.automaticCaption && $.trim(data[0][0]) == caption) {
      this.caption = caption;
      data.shift();
    }

    if (headings) {
      var head = [];
      for (i = 0; i < headings.length; i++) {
        head.push(data.splice(headings[i], 1)[0]);
      }
      this.setHead(head);
    }

    this.setData(data);
  },

  convertToTableCells: function(data) {
    var newData = [];
    for (var i in data) {
      if (typeof data[i] != "object" || this.isEmptyRow(data[i])) continue;

      var newRow = new HtmlTableRow();
      for (var j in data[i]) {
        newRow.cells.push(new HtmlTableCell(data[i][j], j));
      }
      newData.push(newRow);
    }
    return newData;
  },

  setHead: function(head) {
    this.thead = {
      rows: this.convertToTableCells(head)
    };
  },

  setData: function(data) {
    data = $.extend([], data);

    this.tbody = {
      rows: this.convertToTableCells(data)
    };
  },

  /**
   * Is this table row ampty?
   */
  isEmptyRow: function(row) {
    row = row.join("");

    if ($.trim(row).length === 0) return true;

    return false;
  },

  make: function(template, options) {
    if (typeof this.templates[template] == "undefined") {
      console.error("template undefined");
      return;
    }
    return this.templates[template].call(this);
  }
};

HtmlTable.prototype.templates = {};

HtmlTable.prototype.templates.HTML = function() {
  var template = fs.readFileSync("src/templates/htmlTable.mustache", "utf8");
  return Mustache.to_html(template, this);
};

HtmlTable.prototype.templates.MediaWiki = function() {
  // {|
  // |Orange||Apple||more
  // |-
  // |Bread||Pie||more
  // |-
  // |Butter||Ice<br/>cream||and<br/>more
  // |}

  var rowSize = this.getRowSize();

  var cellMap = function(cell, i) {
    return strPad(cell.value, rowSize[i] + 1);
  };

  var rowHeadMap = function(row) {
    return row.cells.map(cellMap).join(" !! ");
  };

  var rowBodyMap = function(row) {
    return row.cells.map(cellMap).join(" || ");
  };

  var str = "";

  if (this.caption) {
    str += "|+ " + this.caption;
  }

  if (this.thead && this.thead.rows && this.thead.rows.length) {
    str += "! " + this.thead.rows.map(rowHeadMap).join("\n! ") + "\n|-\n";
  }

  if (this.tbody && this.tbody.rows && this.tbody.rows.length) {
    str += "| " + this.tbody.rows.map(rowBodyMap).join("\n|-\n| ");
  }

  return "{|\n" + str + "\n|}";
};

HtmlTable.prototype.getRowSize = function(max) {
  var _this = this;
  max = max || 20;
  var rowSize = {};
  ["thead", "tbody"].forEach(function(rowName) {
    _this[rowName].rows.forEach(function(row) {
      row.cells.forEach(function(cell, i) {
        rowSize[i] = rowSize[i] || 0;
        if (rowSize[i] < cell.value.length) {
          rowSize[i] = Math.min(max, cell.value.length);
        }
      });
    });
  });
  return rowSize;
};

HtmlTable.prototype.templates["GitHub markdown"] = function() {
  return templateMarkdown.call(this, {
    headingDivider: true
  });
};

HtmlTable.prototype.templates["JSON"] = function() {
  var output;
  if (this.thead && this.thead.rows && this.thead.rows.length) {
    // If we have headings, return an object with named keys
    var headings = this.thead.rows[0].cells;
    if (this.tbody && this.tbody.rows && this.tbody.rows.length) {
      output = this.tbody.rows.map(function(row) {
        var newRow = {};
        row.cells.forEach(function(cell, i) {
          newRow[headings[i].value] = cast(cell.value);
        });
        return newRow;
      });
    }
  } else {
    // Without headings, juts return a plain old array.
    output = this.tbody.rows.map(function(row) {
      return row.cells.map(function(cell) {
        return cast(cell.value);
      });
    });
  }
  return JSON.stringify(output, null, 4);
};

module.exports = HtmlTable;
