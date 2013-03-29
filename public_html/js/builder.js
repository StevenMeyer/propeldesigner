/*
 *      Author: Steven Meyer <svm9@aber.ac.uk>
 *        File: builder.coffee
 * Description: Generates a JS model from Propel XML schemata and vice versa.
 *
 * DO NOT EDIT THE JAVASCRIPT .js FILE DIRECTLY.
 * THE JAVASCRIPT IS GENERATED FROM COFFEESCRIPT.
*/

var Builder;

Builder = (function() {

  function Builder() {}

  Builder.buildFromXML = function(xml) {
    var build, buildColumn, buildTable;
    build = function(xml) {
      var $database, database, _xml;
      try {
        _xml = $($.parseXML(xml));
      } catch (ex) {
        $.error(ex.message);
      }
      $database = _xml.find("database:first");
      if ($database.length === 0) {
        $.error("No database element found");
      }
      try {
        database = new Database($database.attr("name"), $database.attr("defaultIdMethod"));
      } catch (ex) {
        $.error("The database element is malformed (" + ex.message + ")");
      }
      $database.children("table").each(function() {
        return buildTable($(this), database);
      });
      return database;
    };
    buildColumn = function($column, table) {
      var column;
      column = new Column($column.attr("name"));
      table.addColumn(column);
      return table;
    };
    buildTable = function($table, database) {
      var table;
      table = new Table($table.attr("name"));
      database.addTable(table);
      $table.children("column").each(function() {
        return buildColumn($(this), table);
      });
      return database;
    };
    return build(xml);
  };

  return Builder;

})();
