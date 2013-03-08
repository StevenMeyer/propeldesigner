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
        var arg, extend, pluginName, _i, _len,
          _this = this;
        if (!this.data()) {
          return $.error("Element cannot store data");
        } else {
          pluginName = publicFunctions.plugin.info("name");
          extend = function() {
            return _this.data(pluginName, $.extend(_this.data(pluginName), arg));
          };
          for (_i = 0, _len = arguments.length; _i < _len; _i++) {
            arg = arguments[_i];
            extend(arg);
          }
          return this.data(pluginName);
        }
      },
      checkContext: function(tagName, className) {
        var $this, classes, wild, _tagname;
        $this = $(this) || null;
        _tagname = $this && $this.prop("tagName") ? $this.prop("tagName") : null;
        _tagname = _tagname.toLowerCase();
        if (_tagname !== tagName || (className && !$this.prop("classList").contains(className))) {
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
        var data;
        if (!this.data()) {
          return $.error("Element has no data");
        } else {
          data = this.data(publicFunctions.plugin.info("name"));
          if (data[property]) {
            return data[property];
          } else {
            return $.error("No data property " + property);
          }
        }
      }
    };
    publicFunctions = {
      addColumn: function(column, table) {
        var $this;
        if (table == null) {
          table = this;
        }
        $this = privateFunctions.checkContext.call(table, "svg", "table");
        if (!(column instanceof Column) || !column.getName()) {
          return $.error("A column must be used with addColumn()");
        }
      },
      addTable: function(table) {
        var $this, database, g, rect, settings, svg, tableName;
        $this = privateFunctions.checkContext.call(this, "svg", "canvas");
        if (!(table instanceof Table) || !table.getName()) {
          $.error("A table must be used with addTable()");
        }
        database = privateFunctions.getData.call($this, "database");
        database.addTable(table);
        settings = privateFunctions.getData.call($this, "settings");
        svg = privateFunctions.createSvgElement("svg");
        svg.attr({
          height: settings.defaultDimensions.table.height,
          id: table.getName(),
          width: settings.defaultDimensions.table.width,
          x: 0,
          y: 0
        });
        privateFunctions.addData.call(svg, {
          table: table
        });
        $this.append(svg);
        g = privateFunctions.createSvgElement("g");
        svg.append(g);
        rect = privateFunctions.createSvgElement("rect");
        rect.attr({
          "class": "table",
          height: settings.defaultDimensions.table.height,
          width: settings.defaultDimensions.table.width,
          x: 0,
          y: 0
        });
        g.append(rect);
        tableName = privateFunctions.createSvgElement("text");
        tableName.text(table.getName());
        tableName.attr({
          "class": "tablename"
        });
        g.append(tableName);
        return tableName.attr({
          x: settings.defaultDimensions.table.width / 2 - tableName.prop("clientWidth") / 2,
          y: tableName.prop("clientHeight")
        });
      },
      destroy: function() {
        var $this;
        $this = $(this);
        $this.removeData(publicFunctions.plugin.info("name"));
        return $this.empty();
      },
      init: function(options) {
        var $this, pluginName, settings;
        $this = $(this);
        if (!$this.prop("classList").contains("canvas")) {
          $this.prop("classList").add("canvas");
        }
        pluginName = publicFunctions.plugin.info("name");
        settings = {
          defaultDimensions: {
            table: {
              height: 300,
              width: 200
            }
          },
          svg: $this
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
