/*
 *      Author: Steven Meyer <svm9@aber.ac.uk>
 *        File: models.coffee
 * Description: ER models.
 *
 * DO NOT EDIT THE JAVASCRIPT .js FILE DIRECTLY.
 * THE JAVASCRIPT IS GENERATED FROM COFFEESCRIPT.
*/

var Column, ColumnList, Database, LinkedList, Table,
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
    _phpNamingMethod = null;
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
      return _inheritance = __indexOf.call(Column.Inheritance.toArray(), type) >= 0 ? type : Column.Inheritance.FALSE;
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
      return _phpNamingMethod = __indexOf.call(Column.PhpNamingMethod.toArray(), method) >= 0 ? method : null;
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
      return _type = __indexOf.call(Column.PropelType.toArray(), type) >= 0 ? type : Column.PropelType.VARCHAR;
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

ColumnList = (function() {

  function ColumnList() {
    var columns;
    columns = [];
    this.addColumn = function(column) {
      if (__indexOf.call(columns, column) >= 0 || !(column instanceof Column)) {
        return false;
      } else {
        return columns[this.size()] = column;
      }
    };
    this.getColumns = function() {
      return columns;
    };
  }

  ColumnList.prototype.size = function() {
    return this.getColumns().length;
  };

  return ColumnList;

})();

Table = (function() {

  function Table() {}

  return Table;

})();

Database = (function() {

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

  function Database(name, defaultIdMethod) {
    var _baseClass, _basePeer, _defaultIdMethod, _defaultPhpNamingMethod, _heavyIndexing, _name, _namespace, _package, _schema, _tablePrefix, _tables;
    _baseClass = null;
    _basePeer = null;
    _defaultIdMethod = null;
    _defaultPhpNamingMethod = Database.PhpNamingMethod.UNDERSCORE;
    _heavyIndexing = null;
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
      return _tables.addItem(table);
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
      return _tables.removeItem(table);
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
    this.setHeavyIndexing = function(indexing) {
      var _heavingIndexing;
      if (indexing) {
        return _heavyIndexing = true;
      } else if (indexing === false) {
        return _heavingIndexing = false;
      } else {
        return _heavyIndexing = null;
      }
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
