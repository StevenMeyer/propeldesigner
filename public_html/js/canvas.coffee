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
      addData : () ->
        if not this.data()
          $.error "Element cannot store data"
        else
          pluginName = publicFunctions.plugin.info "name"
          #$this.data pluginName,
          #$.extend $this.data(pluginName), settings: settings, database: new Database "myDatabase", Database.IdMethod.NATIVE
          extend = () =>
            this.data pluginName,
              $.extend this.data(pluginName), arg
          extend arg for arg in arguments
          
          this.data pluginName
          
      checkContext: (tagName, className) ->
        $this = $(this) or null
        _tagname = if $this and $this.prop "tagName" then $this.prop "tagName" else null
        _tagname = _tagname.toLowerCase()
        if _tagname isnt tagName or (className and not $this.prop("classList").contains className)
          wild = "*"
          classes = if $this and $this.attr "class" then $this.attr "class" else ""
          $.error "Function expected a #{tagName}.#{if className then className else wild}, got #{_tagname}.#{classes}"
        $this
      
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
      addColumn: (column, table = this) ->
        $this = privateFunctions.checkContext.call table, "svg", "table"
        if column not instanceof Column or not column.getName() then $.error "A column must be used with addColumn()"
    
      addTable: (table) ->
        $this = privateFunctions.checkContext.call this, "svg", "canvas"
        if table not instanceof Table or not table.getName() then $.error "A table must be used with addTable()"
        
        database = privateFunctions.getData.call $this, "database"
        database.addTable table
        
        settings = privateFunctions.getData.call $this, "settings"
        
        svg = privateFunctions.createSvgElement "svg"
        svg.attr
          height: settings.defaultDimensions.table.height
          id:     table.getName()
          width:  settings.defaultDimensions.table.width
          x:      0
          y:      0
        privateFunctions.addData.call svg, table: table
        $this.append svg
        
        g = privateFunctions.createSvgElement "g"
        svg.append g

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
        g.append tableName
        tableName.attr
          x: settings.defaultDimensions.table.width / 2 - tableName.prop("clientWidth") / 2
          y: tableName.prop "clientHeight"
          
      destroy: () ->
        $this = $ this
        $this.removeData publicFunctions.plugin.info "name"
        $this.empty()
        
      init: (options) ->
        $this = $ this
        if not $this.prop("classList").contains "canvas" then $this.prop("classList").add "canvas"
        pluginName = publicFunctions.plugin.info "name"
        settings =
          defaultDimensions:
            table:
              height: 300
              width:  200
          svg: $this
        settings = $.extend settings, options
        privateFunctions.addData.call $this,
          settings: settings
          database: new Database "myDatabase", Database.IdMethod.NATIVE
          
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
        publicFunctions.init.apply this, args
      else
        $.error "No such method " + method + " in propelCanvas"
        null
      