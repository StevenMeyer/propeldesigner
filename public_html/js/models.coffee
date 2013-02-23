###
 *      Author: Steven Meyer <svm9@aber.ac.uk>
 *        File: models.coffee
 * Description: ER models.
 *
 * DO NOT EDIT THE JAVASCRIPT .js FILE DIRECTLY.
 * THE JAVASCRIPT IS GENERATED FROM COFFEESCRIPT.
###

class LinkedList
  ### Internal class ###
  class LinkedListItem
    constructor: (item) ->
      _item = item
      next = null

      @getItem = () ->
        _item

      @getNext = () ->
        next

      @setNext = (linkedListItem) ->
        next = linkedListItem
  ### End of internal class ###
        
  constructor: () ->
    head = null
    
    @addItem = (item, before) ->
      newItem = new LinkedListItem item
      if not head
        head = newItem
      else if not before
        # add to end of list
        previous = null
        while current = (if current then current.getNext() else head)
          do () -> previous = current
        previous.setNext newItem
      else
        if before is head.getItem
          # new head
          newItem.setNext head
          head = newItem
        else
          # somewhere in the tail
          previous = head
          while current = (if current then current.getNext() else head.getNext())
            do () ->
              if before is current.getItem()
                newItem.setNext current
                previous.setNext newItem
              else
                previous = current
          if not current # reached the end of the list without finding "before"
            previous.setNext newItem
              
    @getItems = () ->
      while item = (if item then item.getNext() else head)
        item.getItem()
        
    @removeItem = (item) ->
      if not head then return false
      else if item is head.getItem()
        head = head.getNext()
        item
      else if not head.getNext() then item
      else
        previous = head
        while current = (if current then current.getNext() else head.getNext())
          do () ->
            if current.getItem() is item then previous.setNext current.getNext()
        item

class Column
  @Inheritance =
    FALSE:   false
    SINGLE:  "single"
    toArray: () ->
      this[type] for type of this when type isnt "toArray"
      
  @PhpNamingMethod =
    NOCHANGE:   "nochange"
    UNDERSCORE: "underscore"
    PHPNAME:    "phpname"
    toArray:    () ->
      this[method] for method of this when method isnt "toArray"
      
  @PropelType = 
    ARRAY:       "ARRAY"
    BLOB:        "BLOB"
    BIGINT:      "BIGINT"
    BOOLEAN:     "BOOLEAN"
    CHAR:        "CHAR"
    CLOB:        "CLOB"
    DATE:        "DATE"
    DECIMAL:     "DECIMAL"
    DOUBLE:      "DOUBLE"
    ENUM:        "ENUM"
    FLOAT:       "FLOAT"
    INTEGER:     "INTEGER"
    LONGVARCHAR: "LONGVARCHAR"
    OBJECT:      "OBJECT"
    REAL:        "REAL"
    SMALLINT:    "SMALLINT"
    TIME:        "TIME"
    TIMESTAMP:   "TIMESTAMP"
    TINYINT:     "TINYINT"
    VARCHAR:     "VARCHAR"
    toArray:     () ->
      this[type] for type of this when type isnt "toArray"
      
  constructor: (columnName) ->
    _autoIncrement = false
    _defaultExpr = null
    _defaultValue = null
    _description = null
    _inheritance = Column.Inheritance.FALSE
    _lazyLoad = false
    _name = null
    _peerName = null
    _phpName = null
    _phpNamingMethod = null
    _phpType = null
    _primaryKey = false
    _primaryString = false
    _required = false
    _scale = null
    _size = null
    _sqlType = null
    _type = Column.PropelType.VARCHAR
    _valueSet = []
    
    if not String::trim
      String::trim = () ->
        this.replace(/^\s+|\s+$/g, '')
    
    @getDefaultExpr = () -> _defaultExpr
      
    @getDefaultValue = () -> _defaultValue
      
    @getDescription = () -> _description
      
    @getInheritanceType = () -> _inheritance
      
    @getName = () -> _name
      
    @getPeerName = () -> _peerName
      
    @getPhpName = () -> _phpName
      
    @getPhpNamingMethod = () -> _phpNamingMethod
      
    @getPhpType = () -> _phpType
      
    @getScale = () -> _scale
      
    @getSize = () -> _size
      
    @getSqlType = () -> _sqlType
      
    @getType = () -> _type
    
    @getValueSet = () -> _valueSet
    
    @isAutoIncrement = () -> _autoIncrement
    
    @isLazyLoad = () -> _lazyLoad
    
    @isPrimaryKey = () -> _primaryKey
    
    @isPrimaryString = () -> _primaryString
    
    @isRequired = () -> _required
    
    @setAutoIncrement = (bool = true) ->
      _autoIncrement = if bool then true else false
    
    @setDefaultExpr = (expr) ->
      _defaultExpr = if expr then expr else null
      
    @setDefaultValue = (value) ->
      _defaultValue = if value then value else null
      
    @setDescription = (description) -> 
      _description = if description then description else null
      
    @setInheritanceType = (type) ->
      _inheritance = if type in Column.Inheritance.toArray() then type else Column.Inheritance.FALSE
    
    @setLazyLoad = (bool = true) ->
      _lazyLoad = if bool then true else false
      
    @setName = (name) ->
      name = name.trim() if typeof name is "string"
      _name = if name then name else throw "Column must have a name"
      
    @setPeerName = (name) ->
      name = name.trim() if typeof name is "string"
      _peerName = if name then name else null
      
    @setPhpName = (name) ->
      name = name.trim() if typeof name is "string"
      _phpName = if name then name else null
      
    @setPhpNamingMethod = (method) ->
      _phpNamingMethod = if method in Column.PhpNamingMethod.toArray() then method else null
      
    @setPhpType = (type) ->
      type = type.trim() if typeof type is "string"
      _phpType = if type then type else null
      
    @setPrimaryKey = (bool = true) ->
      _primaryKey = if bool then true else false
      
    @setPrimaryString = (bool = true) ->
      _primaryString = if bool then true else false
      
    @setRequired = (bool = true) ->
      _required = if bool then true else false
      
    @setScale = (digits) ->
      digits = parseInt digits
      _scale = if not isNan digits then digits else null
      
    @setSize = (size) ->
      size = parseInt size
      _size = if not isNan size then size else null
      
    @setSqlType = (type) ->
      type = type.trim() if typeof type is "string"
      _sqlType = if type then type else null
      
    @setType = (type = @PropelType.VARCHAR) ->
      _type = if type in Column.PropelType.toArray() then type else Column.PropelType.VARCHAR
    
    @setValueSet = (array) ->
      if array
        if array not instanceof Array then array = [ array ]
        _valueSet = array
      else
        _valueSet = []
        
    @setName columnName

class ColumnList
  constructor: () ->
    columns = []
    
    @addColumn = (column) ->
      if column in columns or column not instanceof Column
        false
      else
        columns[@size()] = column
    
    @getColumns = () ->
      columns
      
  size: () ->
    @getColumns().length
    
class Table
    
class Database
  constructor: () ->
    tables = new LinkedList()
    @addTable = (table) ->
      tables.addItem table
      
    @addTableBefore = (table, before) ->
      tables.addItem(table, before)
      
    @getTables = () ->
      tables.getItems()
      
    @removeTable = (table) ->
      tables.removeItem(table)
 