###
 *      Author: Steven Meyer <svm9@aber.ac.uk>
 *        File: canvas.coffee
 * Description: Canvas interaction.
 *
 * DO NOT EDIT THE JAVASCRIPT .js FILE DIRECTLY.
 * THE JAVASCRIPT IS GENERATED FROM COFFEESCRIPT.
###

$ = jQuery
jQuery.fn.extend
  propelCanvas: (method) ->
  
    privateFunctions = 
      createSvgElement: (tagName) ->
        svgns = "http://www.w3.org/2000/svg"
        elem = document.createElementNS svgns, tagName
        $ elem
        
      getData: (property) ->
        if not this.data()
          $.error "Element has no data"
        else
          data = this.data publicFunctions.plugin.info "name"
          if data[property] then data[property] else $.error "No data property " + property
    
    publicFunctions =
      addTable: (table) ->
        $this = $(this) or null
        tagname = if $this and $this.prop "tagName" then $this.prop "tagName" else null
        tagname = tagname.toLowerCase()
        if tagname isnt "svg" then throw "AddTable should be in the context of an SVG"
        if table not instanceof Table or not table.getName() then throw "A table must be used with addTable()"
        
        settings = privateFunctions.getData.call $this, "settings"
        
        svg = privateFunctions.createSvgElement "svg"
        svg.attr
          height: settings.defaultDimensions.table.height
          id:     table.getName()
          width:  settings.defaultDimensions.table.width
          x:      0
          y:      0
        g = privateFunctions.createSvgElement "g"

        rect = privateFunctions.createSvgElement "rect"
        rect.attr
          class:  "table" # $.addClass doesn't work for SVG
          height: settings.defaultDimensions.table.height
          width:  settings.defaultDimensions.table.width
          x:      0
          y:      0
        g.append rect
        
        tableName = privateFunctions.createSvgElement "text"
        tableName.text table.getName()
        tableName.attr
          class: "tablename"
          y: 20
        g.append tableName
        
        svg.append g
        $this.append svg
        
      init: (options) ->
        $this = $ this
        pluginName = publicFunctions.plugin.info "name"
        settings =
          defaultDimensions:
            table:
              height: 300
              width:  200
          svg: $this
        settings = $.extend settings, options
        $this.data pluginName,
          $.extend $this.data(pluginName), settings: settings
          
      plugin: do ->
        vars =
          name: "propelCanvas"
          version: 1
        info: (key) ->
          vars[key]
    
    args = arguments
    return @each () ->
      if publicFunctions[method]
        publicFunctions[method].apply this, Array.prototype.slice.call args, 1
      else if typeof method is "object" or not method
        publicFunctions.init.apply this, arguments
      else
        $.error "No such method " + method + " in propelCanvas"
        null
      