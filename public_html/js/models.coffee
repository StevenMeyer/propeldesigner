###
 *      Author: Steven Meyer <svm9@aber.ac.uk>
 *        File: models.coffee
 * Description: ER models.
 *
 * DO NOT EDIT THE JAVASCRIPT .js FILE DIRECTLY.
 * THE JAVASCRIPT IS GENERATED FROM COFFEESCRIPT.
###

class Column

class ColumnList
  constructor: () ->
    @columns = []
    
  addColumn: (column) ->
    false if not column instanceof Column
    @columns[@size()] = column
    
  getColumns: () ->
    @columns
      
  size: () ->
    @columns.length
 