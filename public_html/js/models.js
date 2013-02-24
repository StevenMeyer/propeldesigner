/*
 *      Author: Steven Meyer <svm9@aber.ac.uk>
 *        File: models.coffee
 * Description: ER models.
 *
 * DO NOT EDIT THE JAVASCRIPT .js FILE DIRECTLY.
 * THE JAVASCRIPT IS GENERATED FROM COFFEESCRIPT.
*/

var Column, Database, ForeignKey, LinkedList, Reference, Table,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

LinkedList = (function() {
  /* Internal class
  */

  var LinkedListItem;

  LinkedListItem = (function() {

    function LinkedListItem(item) {
      var _item, _next;
      _item = item;
      _next = null;
      this.getItem = function() {
        return _item;
      };
      this.getNext = function() {
        return _next;
      };
      this.setNext = function(linkedListItem) {
        return _next = linkedListItem;
      };
    }

    return LinkedListItem;

  })();

  /* End of internal class
  */


  function LinkedList() {
    var head;
    head = null;
    this.addItem = function(item, before) {
      var current, newItem, previous;
      newItem = new LinkedListItem(item);
      if (!head) {
        return head = newItem;
      } else if (!before) {
        previous = null;
        while (current = (current ? current.getNext() : head)) {
          (function() {
            return previous = current;
          })();
        }
        return previous.setNext(newItem);
      } else {
        if (before === head.getItem) {
          newItem.setNext(head);
          return head = newItem;
        } else {
          previous = head;
          while (current = (current ? current.getNext() : head.getNext())) {
            (function() {
              if (before === current.getItem()) {
                newItem.setNext(current);
                return previous.setNext(newItem);
              } else {
                return previous = current;
              }
            })();
          }
          if (!current) {
            return previous.setNext(newItem);
          }
        }
      }
    };
    this.getItems = function() {
      var item, _results;
      _results = [];
      while (item = (item ? item.getNext() : head)) {
        _results.push(item.getItem());
      }
      return _results;
    };
    this.removeItem = function(item) {
      var current, previous;
      if (!head) {
        return false;
      } else if (item === head.getItem()) {
        head = head.getNext();
        return item;
      } else if (!head.getNext()) {
        return item;
      } else {
        previous = head;
        while (current = (current ? current.getNext() : head.getNext())) {
          (function() {
            if (current.getItem() === item) {
              return previous.setNext(current.getNext());
            }
          })();
        }
        return item;
      }
    };
  }

  return LinkedList;

})();

Column = (function() {

  Column.Inheritance = {
    FALSE: false,
    SINGLE: "single",
    toArray: function() {
      var type, _results;
      _results = [];
      for (type in this) {
        if (type !== "toArray") {
          _results.push(this[type]);
        }
      }
      return _results;
    }
  };

  Column.PhpNamingMethod = {
    NOCHANGE: "nochange",
    UNDERSCORE: "underscore",
    PHPNAME: "phpname",
    toArray: function() {
      var method, _results;
      _results = [];
      for (method in this) {
        if (method !== "toArray") {
          _results.push(this[method]);
        }
      }
      return _results;
    }
  };

  Column.PropelType = {
    ARRAY: "ARRAY",
    BLOB: "BLOB",
    BIGINT: "BIGINT",
    BOOLEAN: "BOOLEAN",
    CHAR: "CHAR",
    CLOB: "CLOB",
    DATE: "DATE",
    DECIMAL: "DECIMAL",
    DOUBLE: "DOUBLE",
    ENUM: "ENUM",
    FLOAT: "FLOAT",
    INTEGER: "INTEGER",
    LONGVARCHAR: "LONGVARCHAR",
    OBJECT: "OBJECT",
    REAL: "REAL",
    SMALLINT: "SMALLINT",
    TIME: "TIME",
    TIMESTAMP: "TIMESTAMP",
    TINYINT: "TINYINT",
    VARCHAR: "VARCHAR",
    toArray: function() {
      var type, _results;
      _results = [];
      for (type in this) {
        if (type !== "toArray") {
          _results.push(this[type]);
        }
      }
      return _results;
    }
  };

  function Column(columnName) {
    var _autoIncrement, _defaultExpr, _defaultValue, _description, _inheritance, _lazyLoad, _name, _peerName, _phpName, _phpNamingMethod, _phpType, _primaryKey, _primaryString, _required, _scale, _size, _sqlType, _type, _valueSet;
    _autoIncrement = false;
    _defaultExpr = null;
    _defaultValue = null;
    _description = null;
    _inheritance = Column.Inheritance.FALSE;
    _lazyLoad = false;
    _name = null;
    _peerName = null;
    _phpName = null;
    _phpNamingMethod = Column.PhpNamingMethod.UNDERSCORE;
    _phpType = null;
    _primaryKey = false;
    _primaryString = false;
    _required = false;
    _scale = null;
    _size = null;
    _sqlType = null;
    _type = Column.PropelType.VARCHAR;
    _valueSet = [];
    if (!String.prototype.trim) {
      String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
      };
    }
    this.getDefaultExpr = function() {
      return _defaultExpr;
    };
    this.getDefaultValue = function() {
      return _defaultValue;
    };
    this.getDescription = function() {
      return _description;
    };
    this.getInheritanceType = function() {
      return _inheritance;
    };
    this.getName = function() {
      return _name;
    };
    this.getPeerName = function() {
      return _peerName;
    };
    this.getPhpName = function() {
      return _phpName;
    };
    this.getPhpNamingMethod = function() {
      return _phpNamingMethod;
    };
    this.getPhpType = function() {
      return _phpType;
    };
    this.getScale = function() {
      return _scale;
    };
    this.getSize = function() {
      return _size;
    };
    this.getSqlType = function() {
      return _sqlType;
    };
    this.getType = function() {
      return _type;
    };
    this.getValueSet = function() {
      return _valueSet;
    };
    this.isAutoIncrement = function() {
      return _autoIncrement;
    };
    this.isLazyLoad = function() {
      return _lazyLoad;
    };
    this.isPrimaryKey = function() {
      return _primaryKey;
    };
    this.isPrimaryString = function() {
      return _primaryString;
    };
    this.isRequired = function() {
      return _required;
    };
    this.setAutoIncrement = function(bool) {
      if (bool == null) {
        bool = true;
      }
      return _autoIncrement = bool ? true : false;
    };
    this.setDefaultExpr = function(expr) {
      return _defaultExpr = expr ? expr : null;
    };
    this.setDefaultValue = function(value) {
      return _defaultValue = value ? value : null;
    };
    this.setDescription = function(description) {
      return _description = description ? description : null;
    };
    this.setInheritanceType = function(type) {
      if (__indexOf.call(Column.Inheritance.toArray(), type) >= 0) {
        return _inheritance = type;
      } else {
        return false;
      }
    };
    this.setLazyLoad = function(bool) {
      if (bool == null) {
        bool = true;
      }
      return _lazyLoad = bool ? true : false;
    };
    this.setName = function(name) {
      if (typeof name === "string") {
        name = name.trim();
      }
      return _name = (function() {
        if (name) {
          return name;
        } else {
          throw "Column must have a name";
        }
      })();
    };
    this.setPeerName = function(name) {
      if (typeof name === "string") {
        name = name.trim();
      }
      return _peerName = name ? name : null;
    };
    this.setPhpName = function(name) {
      if (typeof name === "string") {
        name = name.trim();
      }
      return _phpName = name ? name : null;
    };
    this.setPhpNamingMethod = function(method) {
      if (__indexOf.call(Column.PhpNamingMethod.toArray(), method) >= 0) {
        return _phpNamingMethod = method;
      } else {
        return false;
      }
    };
    this.setPhpType = function(type) {
      if (typeof type === "string") {
        type = type.trim();
      }
      return _phpType = type ? type : null;
    };
    this.setPrimaryKey = function(bool) {
      if (bool == null) {
        bool = true;
      }
      return _primaryKey = bool ? true : false;
    };
    this.setPrimaryString = function(bool) {
      if (bool == null) {
        bool = true;
      }
      return _primaryString = bool ? true : false;
    };
    this.setRequired = function(bool) {
      if (bool == null) {
        bool = true;
      }
      return _required = bool ? true : false;
    };
    this.setScale = function(digits) {
      digits = parseInt(digits);
      return _scale = !isNan(digits) ? digits : null;
    };
    this.setSize = function(size) {
      size = parseInt(size);
      return _size = !isNan(size) ? size : null;
    };
    this.setSqlType = function(type) {
      if (typeof type === "string") {
        type = type.trim();
      }
      return _sqlType = type ? type : null;
    };
    this.setType = function(type) {
      if (type == null) {
        type = this.PropelType.VARCHAR;
      }
      if (__indexOf.call(Column.PropelType.toArray(), type) >= 0) {
        return _type = type;
      } else {
        return false;
      }
    };
    this.setValueSet = function(array) {
      if (array) {
        if (!(array instanceof Array)) {
          array = [array];
        }
        return _valueSet = array;
      } else {
        return _valueSet = [];
      }
    };
    this.setName(columnName);
  }

  return Column;

})();

Reference = (function() {

  function Reference(localColumn, foreignColumn) {
    var _foreign, _local;
    _local = (function() {
      if (localColumn instanceof Column) {
        return localColumn;
      } else {
        throw "Reference must have a local column";
      }
    })();
    _foreign = (function() {
      if (foreignColumn instanceof Column) {
        return foreignColumn;
      } else {
        throw "Reference must have a foreign column";
      }
    })();
  }

  Reference.getLocalColumn = function() {
    return _local;
  };

  Reference.getForeignColumn = function() {
    return _foreign;
  };

  return Reference;

})();

ForeignKey = (function() {

  ForeignKey.ReferentialAction = {
    CASCADE: "cascade",
    NONE: "none",
    RESTRICT: "restrict",
    SETNULL: "setnull",
    toArray: function() {
      var action, _results;
      _results = [];
      for (action in this) {
        if (action !== "toArray") {
          _results.push(this[action]);
        }
      }
      return _results;
    }
  };

  ForeignKey.JoinType = {
    LEFT_JOIN: "Criteria::LEFT_JOIN",
    INNER_JOIN: "Criteria::INNER_JOIN",
    toArray: function() {
      var type, _results;
      _results = [];
      for (type in this) {
        if (type !== "toArray") {
          _results.push(this[type]);
        }
      }
      return _results;
    }
  };

  function ForeignKey(foreignTable) {
    var _defaultJoin, _foreignSchema, _foreignTable, _name, _onDelete, _onUpdate, _phpName, _refPhpName, _references, _skipSql;
    _defaultJoin = null;
    _foreignTable = null;
    _foreignSchema = null;
    _name = null;
    _onDelete = null;
    _onUpdate = null;
    _phpName = null;
    _references = [];
    _refPhpName = null;
    _skipSql = false;
    if (!String.prototype.trim) {
      String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
      };
    }
    this.addReference = function(localColumn, foreignColumn) {
      if (!(localColumn instanceof Column) || !(foreignColumn instanceof Column)) {
        false;
      }
      if (__indexOf.call(_foreignTable.getColumns(), foreignColumn) < 0) {
        false;
      }
      return _references.push(new Reference(localColumn, foreignColumn));
    };
    this.getDefaultJoin = function() {
      return _defaultJoin;
    };
    this.getForeignTable = function() {
      return _foreignTable;
    };
    this.getForeignSchema = function() {
      return _foreignSchema;
    };
    this.getName = function() {
      return _name;
    };
    this.getOnDelete = function() {
      return _onDelete;
    };
    this.getOnUpdate = function() {
      return _onUpdate;
    };
    this.getPhpName = function() {
      return _phpName;
    };
    this.getReferences = function() {
      return _references;
    };
    this.getRefPhpName = function() {
      return _refPhpName;
    };
    this.isSkipSql = function() {
      return _skipSql;
    };
    this.removeRelation = function(localColumn, foreignColumn) {
      var counter, reference, removed, _fn, _i, _len;
      removed = false;
      _fn = function(reference, counter) {
        if (reference.getLocalColumn() === localColumn && reference.getForeignColumn() === foreignColumn) {
          removed = true;
          return _references.splice(counter, 1);
        }
      };
      for (counter = _i = 0, _len = _references.length; _i < _len; counter = ++_i) {
        reference = _references[counter];
        _fn(reference, counter);
        if (removed) {
          return true;
        }
      }
      return removed;
    };
    this.setDefaultJoin = function(type) {
      if (__indexOf.call(ForeignKey.JoinType.toArray(), type) >= 0) {
        return _defaultJoin = type;
      } else if (!type) {
        return _defaultJoin = null;
      } else {
        return false;
      }
    };
    this.setForeignTable = function(table) {
      return _foreignTable = (function() {
        if (table instanceof Table) {
          return table;
        } else {
          throw "Foreign key must have a foreign table";
        }
      })();
    };
    this.setForeignSchema = function(schema) {
      if (typeof schema === "string") {
        schema = schema.trim();
      }
      return _foreignSchema = schema ? schema : null;
    };
    this.setName = function(name) {
      if (typeof name === "string") {
        name = name.trim();
      }
      return _name = name ? name : null;
    };
    this.setOnDelete = function(action) {
      if (__indexOf.call(ForeignKey.ReferentialAction.toArray(), action) >= 0) {
        return _onDelete = action;
      } else if (!action) {
        return _onDelete = null;
      } else {
        return false;
      }
    };
    this.setOnUpdate = function(action) {
      if (__indexOf.call(ForeignKey.ReferentialAction.toArray(), action) >= 0) {
        return _onUpdate = action;
      } else if (!action) {
        return _onUpdate = null;
      } else {
        return false;
      }
    };
    this.setPhpName = function(name) {
      if (typeof name === "string") {
        name = name.trim();
      }
      return _phpName = name ? name : null;
    };
    this.setRefPhpName = function(name) {
      if (typeof name === "string") {
        name = name.trim();
      }
      return _refPhpName = name ? name : null;
    };
    this.setSkipSql = function(bool) {
      if (bool == null) {
        bool = true;
      }
      return _skipSql = bool ? true : false;
    };
  }

  return ForeignKey;

})();

Table = (function() {

  Table.IdMethod = {
    NATIVE: "native",
    NONE: "none",
    toArray: function() {
      var method, _results;
      _results = [];
      for (method in this) {
        if (method !== "toArray") {
          _results.push(this[method]);
        }
      }
      return _results;
    }
  };

  Table.PhpNamingMethod = {
    CLEAN: "clean",
    NOCHANGE: "nochange",
    PHPNAME: "phpname",
    UNDERSCORE: "underscore",
    toArray: function() {
      var method, _results;
      _results = [];
      for (method in this) {
        if (method !== "toArray") {
          _results.push(this[method]);
        }
      }
      return _results;
    }
  };

  Table.TreeMode = {
    MATERIALIZED_PATH: "materializedPath",
    NESTED_SET: "nestedSet",
    toArray: function() {
      var mode, _results;
      _results = [];
      for (mode in this) {
        if (mode !== "toArray") {
          _results.push(this[mode]);
        }
      }
      return _results;
    }
  };

  function Table(name) {
    var _abstract, _allowPkInsert, _baseClass, _basePeer, _columns, _description, _foreignKeys, _heavyIndexing, _idMethod, _isCrossRef, _name, _namespace, _package, _phpName, _phpNamingMethod, _readOnly, _reloadOnInsert, _reloadOnUpdate, _schema, _skipSql, _treeMode;
    _abstract = false;
    _allowPkInsert = false;
    _baseClass = null;
    _basePeer = null;
    _columns = new LinkedList();
    _description = null;
    _heavyIndexing = false;
    _foreignKeys = new LinkedList();
    _idMethod = Table.IdMethod.NONE;
    _isCrossRef = false;
    _name = null;
    _namespace = null;
    _package = null;
    _phpName = null;
    _phpNamingMethod = Table.PhpNamingMethod.UNDERSCORE;
    _readOnly = false;
    _reloadOnInsert = false;
    _reloadOnUpdate = false;
    _schema = null;
    _skipSql = false;
    _treeMode = null;
    if (!String.prototype.trim) {
      String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
      };
    }
    this.addColumn = function(column) {
      if (column instanceof Column) {
        return _columns.addItem(column);
      } else {
        return false;
      }
    };
    this.addColumnBefore = function(column, before) {
      if (column instanceof Column) {
        return _columns.addItem(column, before);
      } else {
        return false;
      }
    };
    this.addForeignKey = function(foreignKey) {
      return _foreignKeys.addItem(foreignKey);
    };
    this.allowPkInsert = function() {
      return _allowPkInsert;
    };
    this.getBaseClass = function() {
      return _baseClass;
    };
    this.getBasePeer = function() {
      return _basePeer;
    };
    this.getDescription = function() {
      return _description;
    };
    this.getIdMethod = function() {
      return _idMethod;
    };
    this.getColumns = function() {
      return _columns.getItems();
    };
    this.getForeignKeys = function() {
      return _foreignKeys.getItems();
    };
    this.getName = function() {
      return _name;
    };
    this.getNamespace = function() {
      return _namespace;
    };
    this.getPackage = function() {
      return _package;
    };
    this.getPhpName = function() {
      return _phpName;
    };
    this.getPhpNamingMethod = function() {
      return _phpNamingMethod;
    };
    this.getSchema = function() {
      return _schema;
    };
    this.getTreeMode = function() {
      return _treeMode;
    };
    this.isAbstract = function() {
      return _abstract;
    };
    this.isCrossRef = function() {
      return _isCrossRef;
    };
    this.isHeavyIndexing = function() {
      return _heavyIndexing;
    };
    this.isReadOnly = function() {
      return _readOnly;
    };
    this.isSkipSql = function() {
      return _skipSql;
    };
    this.reloadOnInsert = function() {
      return _reloadOnInsert;
    };
    this.reloadOnUpdate = function() {
      return _reloadOnUpdate;
    };
    this.removeColumn = function(column) {
      if (column instanceof Column) {
        return _columns.removeItem(column);
      } else {
        return false;
      }
    };
    this.setAbstract = function(bool) {
      if (bool == null) {
        bool = true;
      }
      return _abstract = bool ? true : false;
    };
    this.setAllowPkInsert = function(bool) {
      if (bool == null) {
        bool = true;
      }
      return _allowPkInsert = bool ? true : false;
    };
    this.setBaseClass = function(baseClass) {
      if (typeof baseClass === "string") {
        baseClass = baseClass.trim();
      }
      return _baseClass = baseClass ? baseClass : null;
    };
    this.setBaseClass = function(basePeer) {
      if (typeof basePeer === "string") {
        basePeer = basePeer.trim();
      }
      return _basePeer = basePeer ? basePeer : null;
    };
    this.setDescription = function(description) {
      return _description = description ? description : null;
    };
    this.setHeavyIndexing = function(bool) {
      if (bool == null) {
        bool = true;
      }
      return _heavyIndexing = bool ? true : false;
    };
    this.setIdMethod = function(method) {
      var _method;
      if (method == null) {
        method = Table.IdMethod.NONE;
      }
      if (__indexOf.call(Table.IdMethod.toArray(), method) >= 0) {
        return _method = method;
      } else {
        return false;
      }
    };
    this.setIsCrossRef = function(bool) {
      if (bool == null) {
        bool = true;
      }
      return _isCrossRef = bool ? true : false;
    };
    this.setName = function(name) {
      if (typeof name === "string") {
        name = name.trim();
      }
      return _name = (function() {
        if (name) {
          return name;
        } else {
          throw "Table must have a name";
        }
      })();
    };
    this.setNamespace = function(namespace) {
      if (typeof namespace === "string") {
        namespace = namespace.trim;
      }
      return _namespace = namespace ? namespace : null;
    };
    this.setPackage = function(thepackage) {
      if (typeof thepackage === "string") {
        thepackage = thepackage.trim;
      }
      return _package = thepackage ? thepackage : null;
    };
    this.setPhpName = function(name) {
      if (typeof name === "string") {
        name = name.trim();
      }
      return _phpName = name ? name : null;
    };
    this.setPhpNamingMethod = function(method) {
      var _method;
      if (method == null) {
        method = Table.PhpNamingMethod.UNDERSCORE;
      }
      if (__indexOf.call(Table.PhpNamingMethod.toArray(), method) >= 0) {
        return _method = method;
      } else {
        return false;
      }
    };
    this.setReadOnly = function(bool) {
      if (bool == null) {
        bool = true;
      }
      return _readOnly = bool ? true : false;
    };
    this.setReloadOnInsert = function(bool) {
      var _realoadOnInsert;
      if (bool == null) {
        bool = true;
      }
      return _realoadOnInsert = bool ? true : false;
    };
    this.setReloadOnUpdate = function(bool) {
      var _realoadOnUpdate;
      if (bool == null) {
        bool = true;
      }
      return _realoadOnUpdate = bool ? true : false;
    };
    this.setSchema = function(schema) {
      if (typeof schema === "string") {
        schema = schema.trim;
      }
      return _schema = schema ? schema : null;
    };
    this.setSkipSql = function(bool) {
      if (bool == null) {
        bool = true;
      }
      return _skipSql = bool ? true : false;
    };
    this.setTreeMode = function(treeMode) {
      return _treeMode = __indexOf.call(Table.TreeMode.toArray(), treeMode) >= 0 ? treeMode : null;
    };
    this.setName(name);
  }

  return Table;

})();

Database = (function() {

  Database.IdMethod = {
    NATIVE: "native",
    NONE: "none",
    toArray: function() {
      var method, _results;
      _results = [];
      for (method in this) {
        if (method !== "toArray") {
          _results.push(this[method]);
        }
      }
      return _results;
    }
  };

  Database.PhpNamingMethod = {
    CLEAN: "clean",
    NOCHANGE: "nochange",
    PHPNAME: "phpname",
    UNDERSCORE: "underscore",
    toArray: function() {
      var method, _results;
      _results = [];
      for (method in this) {
        if (method !== "toArray") {
          _results.push(this[method]);
        }
      }
      return _results;
    }
  };

  function Database(name, defaultIdMethod) {
    var _baseClass, _basePeer, _defaultIdMethod, _defaultPhpNamingMethod, _heavyIndexing, _name, _namespace, _package, _schema, _tablePrefix, _tables;
    _baseClass = null;
    _basePeer = null;
    _defaultIdMethod = null;
    _defaultPhpNamingMethod = Database.PhpNamingMethod.UNDERSCORE;
    _heavyIndexing = false;
    _name = null;
    _namespace = null;
    _package = null;
    _schema = null;
    _tablePrefix = null;
    _tables = new LinkedList();
    if (!String.prototype.trim) {
      String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
      };
    }
    this.addTable = function(table) {
      if (table instanceof Table) {
        return _tables.addItem(table);
      } else {
        return false;
      }
    };
    this.addTableBefore = function(table, before) {
      return _tables.addItem(table, before);
    };
    this.getBaseClass = function() {
      return _baseClass;
    };
    this.getBasePeer = function() {
      return _basePeer;
    };
    this.getDefaultIdMethod = function() {
      return _defaultIdMethod;
    };
    this.getDefaultPhpNamingMethod = function() {
      return _defaultPhpNamingMethod;
    };
    this.getHeavyIndexing = function() {
      return _heavyIndexing;
    };
    this.getName = function() {
      return _name;
    };
    this.getNamespace = function() {
      return _namespace;
    };
    this.getPackage = function() {
      return _package;
    };
    this.getSchema = function() {
      return _schema;
    };
    this.getTablePrefix = function() {
      return _prefix;
    };
    this.getTables = function() {
      return _tables.getItems();
    };
    this.removeTable = function(table) {
      if (table instanceof Table) {
        return _tables.removeItem(table);
      } else {
        return false;
      }
    };
    this.setBaseClass = function(baseClass) {
      if (typeof baseClass === "string") {
        baseClass = baseClass.trim();
      }
      return _baseClass = baseClass ? baseClass : null;
    };
    this.setBasePeer = function(basePeer) {
      if (typeof basePeer === "string") {
        basePeer = basePeer.trim();
      }
      return _basePeer = basePeer ? basePeer : null;
    };
    this.setDefaultIdMethod = function(method) {
      return _defaultIdMethod = (function() {
        if (__indexOf.call(Database.IdMethod.toArray(), method) >= 0) {
          return method;
        } else {
          throw "Database must have a default ID method";
        }
      })();
    };
    this.setDefaultPhpNamingMethod = function(method) {
      if (method == null) {
        method = Database.PhpNamingMethod.UNDERSCORE;
      }
      return _defaultPhpNamingMethod = __indexOf.call(Database.PhpNamingMethod.toArray(), method) >= 0 ? method : Database.PhpNamingMethod.UNDERSCORE;
    };
    this.setHeavyIndexing = function(bool) {
      if (bool == null) {
        bool = true;
      }
      return _heavyIndexing = bool ? true : false;
    };
    this.setName = function(name) {
      if (typeof name === "string") {
        name = name.trim();
      }
      return _name = (function() {
        if (name) {
          return name;
        } else {
          throw "Database must have a name";
        }
      })();
    };
    this.setNamespace = function(namespace) {
      if (typeof namespace === "string") {
        namespace = namespace.trim();
      }
      return _namespace = namespace ? namespace : null;
    };
    this.setPackage = function(thepackage) {
      var _ref;
      thepackage = (thepackage.trim() === (_ref = typeof thepacking) && _ref === "string");
      return _package = thepackage ? thepackage : null;
    };
    this.setSchema = function(schema) {
      if (typeof schema === "string") {
        schema = schema.trim();
      }
      return _schema = schema ? schema : null;
    };
    this.setTablePrefix = function(prefix) {
      if (typeof schema === "string") {
        prefix = prefix.trim();
      }
      return _tablePrefix = prefix ? prefix : null;
    };
    this.setDefaultIdMethod(defaultIdMethod);
    this.setName(name);
  }

  return Database;

})();
