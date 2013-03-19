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
        _tagname = $this && $this.prop("tagName") ? $this.prop("tagName").toLowerCase() : null;
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
      dragTable: function(mousemoveEvent, previousEvent) {
        var $table, dx, dy;
        if (!(mousemoveEvent instanceof jQuery.Event) || !(previousEvent instanceof jQuery.Event)) {
          $.error("Event must be a jQuery event");
        }
        $table = privateFunctions.checkContext.call(this, "svg", "table-svg");
        dx = mousemoveEvent.pageX - previousEvent.pageX;
        dy = mousemoveEvent.pageY - previousEvent.pageY;
        return $table.attr({
          x: dx + privateFunctions.getNum($table.attr("x")),
          y: dy + privateFunctions.getNum($table.attr("y"))
        });
      },
      getColumnContentWidth: function() {
        var $name, $this;
        $this = privateFunctions.checkContext.call(this, "svg", "column-svg");
        $name = $this.find("g.column-g > text.column-name");
        return privateFunctions.getNum($name.get(0).getBBox().width);
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
            return null;
          }
        }
      },
      getNum: function(value) {
        return parseInt(+value || 0, 10);
      },
      redraw: function() {
        var $this, settings;
        $this = privateFunctions.checkContext.call(this, "svg");
        settings = privateFunctions.getData.call($("svg." + (publicFunctions.plugin.info("name"))), "settings");
        if (privateFunctions.svgHasClass.call(this, "column-svg")) {
          return privateFunctions.redrawColumn.call(this, settings, 0);
        } else if (privateFunctions.svgHasClass.call(this, "columns-svg")) {
          return privateFunctions.redrawColumns.call(this, settings);
        } else if (privateFunctions.svgHasClass.call(this, "table-svg")) {
          return privateFunctions.redrawTable.call(this, settings);
        }
      },
      redrawColumn: function(settings, currentMaxWidth, bubble) {
        var $boundingRect, $name, $rect, $this, boundingRect, contentWidth, margin, name, nameBBox, padding, parent, rect;
        if (bubble == null) {
          bubble = true;
        }
        $this = privateFunctions.checkContext.call(this, "svg", "column-svg");
        $boundingRect = $this.find("g.column-g rect.column-brect");
        $rect = $this.find("g.column-g rect.column-rect");
        $name = $this.find("g.column-g text.column-name");
        nameBBox = $name.get(0).getBBox();
        currentMaxWidth = privateFunctions.getNum(currentMaxWidth);
        margin = privateFunctions.getNum(settings.defaultDimensions.column.margin);
        padding = privateFunctions.getNum(settings.defaultDimensions.column.padding);
        contentWidth = privateFunctions.getColumnContentWidth.call($this);
        if (!currentMaxWidth) {
          currentMaxWidth = privateFunctions.getNum(settings.defaultDimensions.column.width);
          $this.siblings("svg[id$=-column-svg]").each(function() {
            var width;
            width = privateFunctions.getColumnContentWidth.call(this);
            if (currentMaxWidth < width) {
              return currentMaxWidth = width;
            }
          });
        }
        if (currentMaxWidth > contentWidth) {
          contentWidth = currentMaxWidth;
        }
        rect = {
          height: padding * 2 + privateFunctions.getNum(nameBBox.height),
          width: padding * 2 + contentWidth,
          x: margin,
          y: margin
        };
        boundingRect = {
          height: margin * 2 + rect.height,
          width: margin * 2 + rect.width
        };
        name = {
          x: boundingRect.width / 2 - nameBBox.width / 2,
          y: boundingRect.height / 2 + nameBBox.height / 2
        };
        $boundingRect.attr(boundingRect);
        $rect.attr(rect);
        $name.attr(name);
        $this.attr(boundingRect);
        if (contentWidth > currentMaxWidth) {
          $this.siblings("svg[id$=-column-svg]").each(function() {
            return privateFunctions.redrawColumn.call(this, settings, contentWidth, false);
          });
        }
        if (bubble) {
          parent = $this.closest("svg[id$=-columns-svg]");
          privateFunctions.redraw.call(parent);
        }
        return $this;
      },
      redrawColumns: function(settings) {
        var $columns, $columnsSvg, parent, top;
        $columnsSvg = privateFunctions.checkContext.call(this, "svg", "columns-svg");
        $columns = $columnsSvg.find("g.columns-g > svg.column-svg");
        top = 0;
        $columns.each(function() {
          $(this).attr("y", top);
          return top += this.getBBox().height;
        });
        $columnsSvg.attr({
          height: top,
          width: $columns.get(0).getBBox().width
        });
        parent = $columnsSvg.closest("svg[id$=-table-svg]");
        return privateFunctions.redraw.call(parent);
      },
      redrawTable: function(settings) {
        var $children, $name, $rect, $this, maxWidth, nameBBox, padding, rect, top;
        $this = privateFunctions.checkContext.call(this, "svg", "table-svg");
        $rect = $this.find("g.table-g > rect.table-rect");
        $name = $this.find("g.table-g > text.table-name");
        $children = $name.siblings("svg");
        padding = privateFunctions.getNum(settings.defaultDimensions.table.padding);
        nameBBox = $name.get(0).getBBox();
        maxWidth = 0;
        $children.each(function() {
          var width;
          width = this.getBBox().width;
          if (width > maxWidth) {
            return maxWidth = width;
          }
        });
        rect = {
          width: padding * 2 + maxWidth
        };
        $name.attr({
          x: rect.width / 2 - nameBBox.width / 2,
          y: padding + nameBBox.height
        });
        top = padding * 2 + nameBBox.height;
        $children.each(function() {
          var bBox;
          bBox = this.getBBox();
          $(this).attr({
            x: rect.width / 2 - bBox.width / 2,
            y: top
          });
          return top += bBox.height;
        });
        rect.height = top + padding;
        $rect.attr(rect);
        return $this.attr(rect);
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
        var $table, columnBoundingRect, columnGroup, columnName, columnRect, columnSvg, columnsGroup, settings, tableObj;
        if (table == null) {
          table = this;
        }
        if (typeof table === "string") {
          table = document.getElementById("" + table + "-table-svg");
        }
        $table = privateFunctions.checkContext.call(table, "svg", "table-svg");
        if (!(column instanceof Column) || !column.getName()) {
          $.error("A column must be used with addColumn()");
        }
        settings = privateFunctions.getData.call($("svg." + (publicFunctions.plugin.info("name"))), "settings");
        tableObj = privateFunctions.getData.call($table, "table");
        tableObj.addColumn(column);
        columnsGroup = $table.find("g.columns-g:first");
        columnSvg = privateFunctions.createSvgElement("svg");
        columnSvg.attr({
          "class": "column-svg",
          id: "" + (tableObj.getName()) + "-" + (column.getName()) + "-column-svg"
        });
        privateFunctions.addData.call(columnSvg, {
          column: column
        });
        columnGroup = privateFunctions.createSvgElement("g");
        columnGroup.attr({
          "class": "column-g",
          id: "" + (tableObj.getName()) + "-" + (column.getName()) + "-column-g"
        });
        columnBoundingRect = privateFunctions.createSvgElement("rect");
        columnBoundingRect.attr({
          "class": "column-brect brect",
          x: 0,
          y: 0
        });
        columnRect = privateFunctions.createSvgElement("rect");
        columnRect.attr({
          "class": "column-rect",
          id: "" + (tableObj.getName()) + "-" + (column.getName()) + "-column-rect"
        });
        columnName = privateFunctions.createSvgElement("text");
        columnName.attr({
          "class": "column-name",
          id: "" + (tableObj.getName()) + "-" + (column.getName()) + "-column-name"
        });
        columnName.text(column.getName());
        columnGroup.append(columnBoundingRect, columnRect, columnName);
        columnSvg.append(columnGroup);
        columnsGroup.append(columnSvg);
        return privateFunctions.redraw.call(columnSvg);
      },
      addTable: function(table) {
        var $this, column, columnsBoundingRect, columnsGroup, columnsSvg, database, pluginName, settings, tableGroup, tableName, tableRect, tableSvg, _i, _len, _ref;
        $this = privateFunctions.checkContext.call(this, "svg", publicFunctions.plugin.info("name"));
        if (!(table instanceof Table) || !table.getName()) {
          $.error("A table must be used with addTable()");
        }
        database = privateFunctions.getData.call($this, "database");
        database.addTable(table);
        settings = privateFunctions.getData.call($this, "settings");
        tableSvg = privateFunctions.createSvgElement("svg");
        tableSvg.attr({
          "class": "table-svg",
          id: "" + (table.getName()) + "-table-svg",
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
          id: "" + (table.getName()) + "-table-g"
        });
        tableRect = privateFunctions.createSvgElement("rect");
        tableRect.attr({
          "class": "table-rect",
          id: "" + (table.getName()) + "-table-rect",
          x: 0,
          y: 0
        });
        tableName = privateFunctions.createSvgElement("text");
        tableName.attr({
          "class": "table-name",
          id: "" + (table.getName()) + "-table-name"
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
        columnsBoundingRect = privateFunctions.createSvgElement("rect");
        columnsBoundingRect.attr({
          "class": "columns-brect brect",
          x: 0,
          y: 0
        });
        columnsGroup.append(columnsBoundingRect);
        columnsSvg.append(columnsGroup);
        tableGroup.append(tableRect, tableName, columnsSvg);
        tableSvg.append(tableGroup);
        $this.append(tableSvg);
        pluginName = publicFunctions.plugin.info("name");
        tableSvg.on("mousedown." + pluginName, function(mousedownEvent) {
          var $body, previousEvent;
          if (privateFunctions.getData.call($this, "inEvent")) {
            return false;
          } else {
            privateFunctions.addData.call($this, {
              inEvent: true
            });
          }
          $body = $("body");
          previousEvent = mousedownEvent;
          $body.on("mousemove." + pluginName, function(mousemoveEvent) {
            privateFunctions.dragTable.call(tableSvg, mousemoveEvent, previousEvent);
            return previousEvent = mousemoveEvent;
          });
          return $body.one("mouseup." + pluginName, function(mouseupEvent) {
            $body.off("mousemove." + pluginName);
            privateFunctions.addData.call($this, {
              inEvent: false
            });
            return mouseupEvent.stopPropagation();
          });
        });
        _ref = table.getColumns();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          column = _ref[_i];
          publicFunctions.addColumn(column, tableSvg);
        }
        return tableSvg;
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
        pluginName = publicFunctions.plugin.info("name");
        if ($this.prop("classList") instanceof DOMTokenList) {
          if (!$this.prop("classList").contains(pluginName)) {
            $this.prop("classList").add(pluginName);
          }
        } else {
          if (this.className.baseVal.lastIndexOf(pluginName === -1)) {
            this.className.baseVal = this.className.baseVal + (" " + pluginName);
          }
        }
        settings = {
          defaultDimensions: {
            column: {
              height: 50,
              margin: 0,
              padding: 5,
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
