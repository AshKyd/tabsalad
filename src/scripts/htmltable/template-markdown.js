var strPad = require('./strpad');

module.exports = function(opts){

	// First Header  | Second Header
	// ------------- | -------------
	// Content Cell  | Content Cell
	// Content Cell  | Content Cell

	var rowSize = this.getRowSize();

	var cellMap = function(cell, i){
		return strPad(cell.value, rowSize[i]+1, ' ');
	};

	var rowBodyMap = function(row, separator, wrap){
        separator = separator || ' | ';
        var textRow = row.cells.map(cellMap).join(separator);
        if(wrap){
            textRow = wrap + ' ' + textRow + ' ' + wrap;
        }
		return textRow;
	}

	var str = '';

	// if(this.caption){
	// 	str += '|+ '+this.caption;
	// }

	if(this.thead && this.thead.rows && this.thead.rows.length){
		str += this.thead.rows.map(function(row){
            return rowBodyMap(row, opts.separatorHeading, opts.wrapLineHeading);
        }).join('\n')+'\n';

		// Second level heading thing.
        if(opts.headingDivider){
    		str += Object.keys(rowSize).map(function(i, row){
    			return strPad('', rowSize[i]+1, '-');
    		}).join('-|-')+'\n';
        }
	}


	if(this.tbody && this.tbody.rows && this.tbody.rows.length){
		str += this.tbody.rows.map(function(row){
            return rowBodyMap(row, opts.separatorBody, opts.wrapLineContent);
        }).join('\n');
	}

	return str;

};
