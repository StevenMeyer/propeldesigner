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
      addTable: function(table) {
        var $this, g, rect, settings, svg, tableName, tagname;
        $this = $(this) || null;
        tagname = $this && $this.prop("tagName") ? $this.prop("tagName") : null;
        tagname = tagname.toLowerCase();
        if (tagname !== "svg") {
          throw "AddTable should be in the context of an SVG";
        }
        if (!(table instanceof Table) || !table.getName()) {
          throw "A table must be used with addTable()";
        }
        settings = privateFunctions.getData.call($this, "settings");
        svg = privateFunctions.createSvgElement("svg");
        svg.attr({
          height: settings.defaultDimensions.table.height,
          id: table.getName(),
          width: settings.defaultDimensions.table.width,
          x: 0,
          y: 0
        });
        g = privateFunctions.createSvgElement("g");
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
          "class": "tablename",
          y: 20
        });
        g.append(tableName);
        svg.append(g);
        return $this.append(svg);
      },
      init: function(options) {
        var $this, pluginName, settings;
        $this = $(this);
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
        return $this.data(pluginName, $.extend($this.data(pluginName), {
          settings: settings
        }));
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
        return publicFunctions.init.apply(this, arguments);
      } else {
        $.error("No such method " + method + " in propelCanvas");
        return null;
      }
    });
  }
});
