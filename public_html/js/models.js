/*
 *      Author: Steven Meyer <svm9@aber.ac.uk>
 *        File: models.coffee
 * Description: ER models.
 *
 * DO NOT EDIT THE JAVASCRIPT .js FILE DIRECTLY.
 * THE JAVASCRIPT IS GENERATED FROM COFFEESCRIPT.
*/

var Column, ColumnList;

Column = (function() {

  function Column() {}

  return Column;

})();

ColumnList = (function() {

  function ColumnList() {
    this.columns = [];
  }

  ColumnList.prototype.addColumn = function(column) {
    if (!column instanceof Column) {
      false;
    }
    return this.columns[this.size()] = column;
  };

  ColumnList.prototype.getColumns = function() {
    return this.columns;
  };

  ColumnList.prototype.size = function() {
    return this.columns.length;
  };

  return ColumnList;

})();
