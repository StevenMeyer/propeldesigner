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
      _next = null

      @getItem = () ->
        _item

      @getNext = () ->
        _next

      @setNext = (linkedListItem) ->
        _next = linkedListItem
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
    _phpNamingMethod = Column.PhpNamingMethod.UNDERSCORE
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
      if type in Column.Inheritance.toArray() then _inheritance = type else false
    
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
      if method in Column.PhpNamingMethod.toArray() then _phpNamingMethod = method else false
      
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
      if type in Column.PropelType.toArray() then _type = type else false
    
    @setValueSet = (array) ->
      if array
        if array not instanceof Array then array = [ array ]
        _valueSet = array
      else
        _valueSet = []
        
    @setName columnName
    
class Reference
  constructor: (localColumn, foreignColumn) ->
    _local = if localColumn instanceof Column then localColumn else throw "Reference must have a local column"
    _foreign = if foreignColumn instanceof Column then foreignColumn else throw "Reference must have a foreign column"
    
  @getLocalColumn = () -> _local
  @getForeignColumn = () -> _foreign
    
class ForeignKey
  @ReferentialAction =
    CASCADE:  "cascade"
    NONE:     "none"
    RESTRICT: "restrict"
    SETNULL:  "setnull"
    toArray:  () ->
      this[action] for action of this when action isnt "toArray"
      
  @JoinType =
    LEFT_JOIN:  "Criteria::LEFT_JOIN"
    INNER_JOIN: "Criteria::INNER_JOIN"
    toArray:    () ->
      this[type] for type of this when type isnt "toArray"
      
  constructor: (foreignTable) ->
    _defaultJoin = null
    _foreignTable = null
    _foreignSchema = null
    _name = null
    _onDelete = null
    _onUpdate = null
    _phpName = null
    _references = []
    _refPhpName = null
    _skipSql = false
    
    if not String::trim
      String::trim = () ->
        this.replace(/^\s+|\s+$/g, '')
        
    @addReference = (localColumn, foreignColumn) ->
      if localColumn not instanceof Column or foreignColumn not instanceof Column then false
      
      if foreignColumn not in _foreignTable.getColumns() then false
      
      _references.push new Reference localColumn, foreignColumn
    
    @getDefaultJoin = () -> _defaultJoin
    
    @getForeignTable = () -> _foreignTable
    
    @getForeignSchema = () -> _foreignSchema
    
    @getName = () -> _name
    
    @getOnDelete = () -> _onDelete
    
    @getOnUpdate = () -> _onUpdate
    
    @getPhpName = () -> _phpName
    
    @getReferences = () -> _references
    
    @getRefPhpName = () -> _refPhpName
    
    @isSkipSql = () -> _skipSql
    
    @removeRelation = (localColumn, foreignColumn) ->
      removed = false
      for reference, counter in _references
        do (reference, counter) ->
          if reference.getLocalColumn() is localColumn and reference.getForeignColumn() is foreignColumn
            removed = true
            _references.splice counter, 1
        if removed then return true
      removed
    
    @setDefaultJoin = (type) ->
      if type in ForeignKey.JoinType.toArray()
        _defaultJoin = type
      else if not type
        _defaultJoin = null
      else
        false
      
    @setForeignTable = (table) ->
      _foreignTable = if table instanceof Table then table else throw "Foreign key must have a foreign table"
      
    @setForeignSchema = (schema) ->
      schema = schema.trim() if typeof schema is "string"
      _foreignSchema = if schema then schema else null
      
    @setName = (name) ->
      name = name.trim() if typeof name is "string"
      _name = if name then name else null
      
    @setOnDelete = (action) ->
      if action in ForeignKey.ReferentialAction.toArray()
        _onDelete = action
      else if not action
        _onDelete = null
      else
        false
        
    @setOnUpdate = (action) ->
      if action in ForeignKey.ReferentialAction.toArray()
        _onUpdate = action
      else if not action
        _onUpdate = null
      else
        false
        
    @setPhpName = (name) ->
      name = name.trim() if typeof name is "string"
      _phpName = if name then name else null
      
    @setRefPhpName = (name) ->
      name = name.trim() if typeof name is "string"
      _refPhpName = if name then name else null
      
    @setSkipSql = (bool = true) ->
      _skipSql = if bool then true else false
      
    @setForeignTable(foreignTable)
    
class Table
  @IdMethod =
    NATIVE:  "native"
    NONE:    "none"
    toArray: () ->
      this[method] for method of this when method isnt "toArray"
      
  @PhpNamingMethod =
    CLEAN:      "clean"
    NOCHANGE:   "nochange"
    PHPNAME:    "phpname"
    UNDERSCORE: "underscore"
    toArray:    () ->
      this[method] for method of this when method isnt "toArray"
      
  @TreeMode =
    MATERIALIZED_PATH: "materializedPath"
    NESTED_SET:        "nestedSet"
    toArray:           () ->
      this[mode] for mode of this when mode isnt "toArray"
      
  constructor: (name) ->
    _abstract = false
    _allowPkInsert = false
    _baseClass = null
    _basePeer = null
    _columns = new LinkedList()
    _description = null
    _heavyIndexing = false
    _foreignKeys = new LinkedList()
    _idMethod = Table.IdMethod.NONE
    _isCrossRef = false
    _name = null
    _namespace = null
    _package = null
    _phpName = null
    _phpNamingMethod = Table.PhpNamingMethod.UNDERSCORE
    _readOnly = false
    _reloadOnInsert = false
    _reloadOnUpdate = false
    _schema = null
    _skipSql = false
    _treeMode = null
    
    if not String::trim
      String::trim = () ->
        this.replace(/^\s+|\s+$/g, '')
    
    @addColumn = (column) ->
      if column instanceof Column
        _columns.addItem column
      else
        false
        
    @addColumnBefore = (column, before) ->
      if column instanceof Column
        _columns.addItem column, before
      else
        false
        
    @addForeignKey = (foreignKey) -> _foreignKeys.addItem(foreignKey)
    
    @allowPkInsert = () -> _allowPkInsert
    
    @getBaseClass = () -> _baseClass
    
    @getBasePeer = () -> _basePeer
    
    @getDescription = () -> _description
    
    @getIdMethod = () -> _idMethod
    
    @getColumns = () -> _columns.getItems()
    
    @getForeignKeys = () -> _foreignKeys.getItems()
    
    @getName = () -> _name
    
    @getNamespace = () -> _namespace
    
    @getPackage = () -> _package
    
    @getPhpName = () -> _phpName
    
    @getPhpNamingMethod = () -> _phpNamingMethod
    
    @getSchema = () -> _schema
    
    @getTreeMode = () -> _treeMode
    
    @isAbstract = () -> _abstract
    
    @isCrossRef = () -> _isCrossRef
    
    @isHeavyIndexing = () -> _heavyIndexing
    
    @isReadOnly = () -> _readOnly
    
    @isSkipSql = () -> _skipSql
    
    @reloadOnInsert = () -> _reloadOnInsert
    
    @reloadOnUpdate = () -> _reloadOnUpdate
    
    @removeColumn = (column) ->
      if column instanceof Column
        _columns.removeItem(column)
      else false
      
    @setAbstract = (bool = true) ->
      _abstract = if bool then true else false
      
    @setAllowPkInsert = (bool = true) ->
      _allowPkInsert = if bool then true else false
      
    @setBaseClass = (baseClass) ->
      baseClass = baseClass.trim() if typeof baseClass is "string"
      _baseClass = if baseClass then baseClass else null
      
    @setBaseClass = (basePeer) ->
      basePeer = basePeer.trim() if typeof basePeer is "string"
      _basePeer = if basePeer then basePeer else null
      
    @setDescription = (description) ->
      _description = if description then description else null
      
    @setHeavyIndexing = (bool = true) ->
      _heavyIndexing = if bool then true else false
      
    @setIdMethod = (method = Table.IdMethod.NONE) ->
      if method in Table.IdMethod.toArray() then _method =  method else false
      
    @setIsCrossRef = (bool = true) ->
      _isCrossRef = if bool then true else false
    
    @setName = (name) ->
      name = name.trim() if typeof name is "string"
      _name = if name then name else throw "Table must have a name"
      
    @setNamespace = (namespace) ->
      namespace = namespace.trim if typeof namespace is "string"
      _namespace = if namespace then namespace else null
      
    @setPackage = (thepackage) ->
      thepackage = thepackage.trim if typeof thepackage is "string"
      _package = if thepackage then thepackage else null
      
    @setPhpName = (name) ->
      name = name.trim() if typeof name is "string"
      _phpName = if name then name else null
      
    @setPhpNamingMethod = (method = Table.PhpNamingMethod.UNDERSCORE) ->
      if method in Table.PhpNamingMethod.toArray() then _method = method else false
      
    @setReadOnly = (bool = true) ->
      _readOnly = if bool then true else false
      
    @setReloadOnInsert = (bool = true) ->
      _realoadOnInsert = if bool then true else false
      
    @setReloadOnUpdate = (bool = true) ->
      _realoadOnUpdate = if bool then true else false
      
    @setSchema = (schema) ->
      schema = schema.trim if typeof schema is "string"
      _schema = if schema then schema else null
      
    @setSkipSql = (bool = true) ->
      _skipSql = if bool then true else false
      
    @setTreeMode = (treeMode) ->
      _treeMode = if treeMode in Table.TreeMode.toArray() then treeMode else null
      
    @setName name
    
class Database
  @IdMethod =
    NATIVE:  "native"
    NONE:    "none"
    toArray: () ->
      this[method] for method of this when method isnt "toArray"
      
  @PhpNamingMethod =
    CLEAN:      "clean"
    NOCHANGE:   "nochange"
    PHPNAME:    "phpname"
    UNDERSCORE: "underscore"
    toArray:    () ->
      this[method] for method of this when method isnt "toArray"
      
  constructor: (name, defaultIdMethod) ->
    _baseClass = null
    _basePeer = null
    _defaultIdMethod = null
    _defaultPhpNamingMethod = Database.PhpNamingMethod.UNDERSCORE
    _heavyIndexing = false
    _name = null
    _namespace = null
    _package = null
    _schema = null
    _tablePrefix = null
    _tables = new LinkedList()
    
    if not String::trim
      String::trim = () ->
        this.replace(/^\s+|\s+$/g, '')
    
    @addTable = (table) ->
      if table instanceof Table
        _tables.addItem table
      else false
      
    @addTableBefore = (table, before) ->
      _tables.addItem table, before
      
    @getBaseClass = () -> _baseClass
    
    @getBasePeer = () -> _basePeer
      
    @getDefaultIdMethod = () -> _defaultIdMethod
    
    @getDefaultPhpNamingMethod = () -> _defaultPhpNamingMethod
    
    @getHeavyIndexing = () -> _heavyIndexing
      
    @getName = () -> _name
    
    @getNamespace = () -> _namespace
    
    @getPackage = () -> _package
    
    @getSchema = () -> _schema
    
    @getTablePrefix = () -> _prefix
      
    @getTables = () ->
      _tables.getItems()
      
    @removeTable = (table) ->
      if table instanceof Table
        _tables.removeItem(table)
      else
        false
      
    @setBaseClass = (baseClass) ->
      baseClass = baseClass.trim() if typeof baseClass is "string"
      _baseClass = if baseClass then baseClass else null
      
    @setBasePeer = (basePeer) ->
      basePeer = basePeer.trim() if typeof basePeer is "string"
      _basePeer = if basePeer then basePeer else null
      
    @setDefaultIdMethod = (method) ->
      _defaultIdMethod = if method in Database.IdMethod.toArray() then method else throw "Database must have a default ID method"
      
    @setDefaultPhpNamingMethod = (method = Database.PhpNamingMethod.UNDERSCORE) ->
      _defaultPhpNamingMethod = if method in Database.PhpNamingMethod.toArray() then method else Database.PhpNamingMethod.UNDERSCORE
      
    @setHeavyIndexing = (bool = true) ->
      _heavyIndexing = if bool then true else false
      
    @setName = (name) ->
      name = name.trim() if typeof name is "string"
      _name = if name then name else throw "Database must have a name"
      
    @setNamespace = (namespace) ->
      namespace = namespace.trim() if typeof namespace is "string"
      _namespace = if namespace then namespace else null
      
    @setPackage = (thepackage) ->
      thepackage = thepackage.trim() is typeof thepacking is "string"
      _package = if thepackage then thepackage else null
      
    @setSchema = (schema) ->
      schema = schema.trim() if typeof schema is "string"
      _schema = if schema then schema else null
      
    @setTablePrefix = (prefix) ->
      prefix = prefix.trim() if typeof schema is "string"
      _tablePrefix = if prefix then prefix else null
      
    @setDefaultIdMethod defaultIdMethod
    @setName name
 