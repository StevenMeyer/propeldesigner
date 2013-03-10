/*
 *      Author: Steven Meyer <svm9@aber.ac.uk>
 *        File: canvas.coffee
 * Description: Canvas interaction.
 *
 * DO NOT EDIT THE JAVASCRIPT .js FILE DIRECTLY.
 * THE JAVASCRIPT IS GENERATED FROM COFFEESCRIPT.
*/

var $;

$ = jQuery;

jQuery.fn.extend({
  propelCanvas: function(method) {
    var args, privateFunctions, publicFunctions;
    privateFunctions = {
      addData: function() {
        var $this, arg, extend, pluginName, _i, _len,
          _this = this;
        $this = this instanceof jQuery ? this : $(this);
        if (!$this.data()) {
          return $.error("Element cannot store data");
        } else {
          pluginName = publicFunctions.plugin.info("name");
          extend = function() {
            return $this.data(pluginName, $.extend($this.data(pluginName), arg));
          };
          for (_i = 0, _len = arguments.length; _i < _len; _i++) {
            arg = arguments[_i];
            extend(arg);
          }
          return $this.data(pluginName);
        }
      },
      checkContext: function(tagName, className) {
        var $this, classes, wild, _tagname;
        $this = this instanceof jQuery ? this : $(this);
        _tagname = $this && $this.prop("tagName") ? $this.prop("tagName") : null;
        _tagname = _tagname.toLowerCase();
        if (_tagname !== tagName || (className && !privateFunctions.svgHasClass.call($this, className))) {
          wild = "*";
          classes = $this && $this.attr("class") ? $this.attr("class") : "";
          $.error("Function expected a " + tagName + "." + (className ? className : wild) + ", got " + _tagname + "." + classes);
        }
        return $this;
      },
      createSvgElement: function(tagName) {
        var elem, svgns;
        svgns = "http://www.w3.org/2000/svg";
        elem = document.createElementNS(svgns, tagName);
        return $(elem);
      },
      getData: function(property) {
        var $this, data;
        $this = this instanceof jQuery ? this : $(this);
        if (!$this.data()) {
          return $.error("Element has no data");
        } else {
          data = $this.data(publicFunctions.plugin.info("name"));
          if (data[property]) {
            return data[property];
          } else {
            return $.error("No data property " + property);
          }
        }
      },
      redraw: function() {
        var $table, columnsSvg, settings, tableName, tableRect;
        $table = privateFunctions.checkContext.call(this, "svg", "table-svg");
        settings = privateFunctions.getData.call(privateFunctions.getData.call($table, "root"), "settings");
        tableRect = $table.find("g > rect:first");
        tableName = $table.find("g > text:first");
        return columnsSvg = $table.find("g > svg[id$='-columns-svg']");
      },
      svgHasClass: function(className) {
        var $this;
        $this = this instanceof jQuery ? this : $(this);
        if ($this.prop("classList") instanceof DOMTokenList) {
          return $this.prop("classList").contains(className);
        } else {
          return $this.prop("className").baseVal.indexOf(className) !== -1;
        }
      }
    };
    publicFunctions = {
      addColumn: function(column, table) {
        var $table, columnGroup, columnName, columnSvg, columnsGroup, settings, tableObj;
        if (table == null) {
          table = this;
        }
        if (typeof table === "string") {
          table = document.getElementById("" + table + "-svg");
        }
        $table = privateFunctions.checkContext.call(table, "svg", "table-svg");
        if (!(column instanceof Column) || !column.getName()) {
          $.error("A column must be used with addColumn()");
        }
        settings = privateFunctions.getData.call(privateFunctions.getData.call($table, "root"), "settings");
        tableObj = privateFunctions.getData.call($table, "table");
        tableObj.addColumn(column);
        columnsGroup = $table.find("g.columns-g:first");
        columnSvg = privateFunctions.createSvgElement("svg");
        columnSvg.attr({
          "class": "column-svg",
          id: "" + (tableObj.getName()) + "-" + (column.getName()) + "-svg"
        });
        privateFunctions.addData.call(columnSvg, {
          column: column
        });
        columnGroup = privateFunctions.createSvgElement("g", {
          "class": "column-g",
          id: "" + (tableObj.getName()) + "-" + (column.getName()) + "-g"
        });
        columnName = privateFunctions.createSvgElement("text");
        columnName.attr({
          "class": "column-name",
          id: "" + (tableObj.getName()) + "-" + (column.getName()) + "-name"
        });
        columnName.text(column.getName());
        columnGroup.append(columnName);
        columnSvg.append(columnGroup);
        return columnsGroup.append(columnSvg);
      },
      addTable: function(table) {
        var $this, columnsGroup, columnsSvg, database, settings, tableGroup, tableName, tableRect, tableSvg;
        $this = privateFunctions.checkContext.call(this, "svg", "canvas");
        if (!(table instanceof Table) || !table.getName()) {
          $.error("A table must be used with addTable()");
        }
        database = privateFunctions.getData.call($this, "database");
        database.addTable(table);
        settings = privateFunctions.getData.call($this, "settings");
        tableSvg = privateFunctions.createSvgElement("svg");
        tableSvg.attr({
          "class": "table-svg",
          id: "" + (table.getName()) + "-svg",
          x: 0,
          y: 0
        });
        privateFunctions.addData.call(tableSvg, {
          table: table,
          root: $this
        });
        tableGroup = privateFunctions.createSvgElement("g");
        tableGroup.attr({
          "class": "table-g",
          id: "" + (table.getName()) + "-g"
        });
        tableRect = privateFunctions.createSvgElement("rect");
        tableRect.attr({
          "class": "table-rect",
          id: "" + (table.getName()) + "-rect",
          x: 0,
          y: 0
        });
        tableName = privateFunctions.createSvgElement("text");
        tableName.attr({
          "class": "table-name",
          id: "" + (table.getName()) + "-name"
        });
        tableName.text(table.getName());
        columnsSvg = privateFunctions.createSvgElement("svg");
        columnsSvg.attr({
          "class": "columns-svg",
          id: "" + (table.getName()) + "-columns-svg"
        });
        columnsGroup = privateFunctions.createSvgElement("g");
        columnsGroup.attr({
          "class": "columns-g",
          id: "" + (table.getName()) + "-columns-g"
        });
        columnsSvg.append(columnsGroup);
        tableGroup.append(tableRect, tableName, columnsSvg);
        tableSvg.append(tableGroup);
        $this.append(tableSvg);
        return privateFunctions.redraw.call(tableSvg);
      },
      destroy: function() {
        var $this;
        $this = $(this);
        $this.removeData(publicFunctions.plugin.info("name"));
        return $this.empty();
      },
      init: function(options) {
        var $this, pluginName, settings;
        $this = this instanceof jQuery ? this : $(this);
        if ($this.prop("classList") instanceof DOMTokenList) {
          if (!$this.prop("classList").contains("canvas")) {
            $this.prop("classList").add("canvas");
          }
        } else {
          if (this.className.baseVal.lastIndexOf("canvas" === -1)) {
            this.className.baseVal = this.className.baseVal + " canvas";
          }
        }
        pluginName = publicFunctions.plugin.info("name");
        settings = {
          defaultDimensions: {
            column: {
              height: 50,
              width: 200
            },
            table: {
              height: 300,
              padding: 5,
              width: 200
            }
          }
        };
        settings = $.extend(settings, options);
        return privateFunctions.addData.call($this, {
          settings: settings,
          database: new Database("myDatabase", Database.IdMethod.NATIVE)
        });
      },
      plugin: (function() {
        var vars;
        vars = {
          name: "propelCanvas",
          version: 1
        };
        return {
          info: function(key) {
            return vars[key];
          }
        };
      })()
    };
    args = arguments;
    return this.each(function() {
      if (publicFunctions[method]) {
        return publicFunctions[method].apply(this, Array.prototype.slice.call(args, 1));
      } else if (typeof method === "object" || !method) {
        return publicFunctions.init.apply(this, args);
      } else {
        $.error("No such method " + method + " in propelCanvas");
        return null;
      }
    });
  }
});
