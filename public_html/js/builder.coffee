###
 *      Author: Steven Meyer <svm9@aber.ac.uk>
 *        File: builder.coffee
 * Description: Generates a JS model from Propel XML schemata and vice versa.
 *
 * DO NOT EDIT THE JAVASCRIPT .js FILE DIRECTLY.
 * THE JAVASCRIPT IS GENERATED FROM COFFEESCRIPT.
###

#jQuery ($) ->
class Builder
  @buildFromXML = (xml) ->
    build = (xml) ->
      try
        _xml = $ $.parseXML xml
      catch ex
        $.error ex.message
      $database = _xml.find "database:first"
      if $database.length is 0 then $.error "No database element found"
      try
        database = new Database ($database.attr "name"), ($database.attr "defaultIdMethod")
      catch ex
        $.error "The database element is malformed (#{ex.message})"
      $database.children("table").each () ->
        buildTable ($ this), database
      database
      
    buildColumn = ($column, table) ->
      column = new Column $column.attr "name"
      table.addColumn column
      table

    buildTable = ($table, database) ->
      table = new Table $table.attr "name"
      database.addTable table
      $table.children("column").each () ->
        buildColumn ($ this), table
      database

    build xml
