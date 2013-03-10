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
        $this = if this instanceof jQuery then this else $ this
        if not $this.data()
          $.error "Element cannot store data"
        else
          pluginName = publicFunctions.plugin.info "name"
          extend = () =>
            $this.data pluginName,
              $.extend $this.data(pluginName), arg
          extend arg for arg in arguments
          
          $this.data pluginName
          
      checkContext: (tagName, className) ->
        $this = if this instanceof jQuery then this else $ this
        _tagname = if $this and $this.prop "tagName" then $this.prop "tagName" else null
        _tagname = _tagname.toLowerCase()
        if _tagname isnt tagName or (className and not privateFunctions.svgHasClass.call $this, className)
          wild = "*"
          classes = if $this and $this.attr "class" then $this.attr "class" else ""
          $.error "Function expected a #{tagName}.#{if className then className else wild}, got #{_tagname}.#{classes}"
        $this
      
      createSvgElement: (tagName) ->
        svgns = "http://www.w3.org/2000/svg"
        elem = document.createElementNS svgns, tagName
        $ elem
        
      getData: (property) ->
        $this = if this instanceof jQuery then this else $ this
        if not $this.data()
          $.error "Element has no data"
        else
          data = $this.data publicFunctions.plugin.info "name"
          if data[property] then data[property] else $.error "No data property " + property
          
      redraw: () ->
        $table = privateFunctions.checkContext.call this, "svg", "table-svg"
        settings = privateFunctions.getData.call (privateFunctions.getData.call $table, "root"), "settings"
        tableRect = $table.find "g > rect:first"
        tableName = $table.find "g > text:first"
        columnsSvg = $table.find "g > svg[id$='-columns-svg']"
          
      svgHasClass: (className) ->
        $this = if this instanceof jQuery then this else $ this
        if $this.prop("classList") instanceof DOMTokenList
          $this.prop("classList").contains className
        else #Internet Explorer
          $this.prop("className").baseVal.indexOf(className) isnt -1
    
    publicFunctions =
      addColumn: (column, table = this) ->
        if typeof table is "string" then table = document.getElementById "#{table}-svg"
        $table = privateFunctions.checkContext.call table, "svg", "table-svg"
        if column not instanceof Column or not column.getName() then $.error "A column must be used with addColumn()"
        
        settings = privateFunctions.getData.call (privateFunctions.getData.call $table, "root"), "settings"
        tableObj = privateFunctions.getData.call $table, "table"
        tableObj.addColumn column
        
        columnsGroup = $table.find "g.columns-g:first"
        
        columnSvg = privateFunctions.createSvgElement "svg"
        columnSvg.attr
          class: "column-svg"
          id: "#{tableObj.getName()}-#{column.getName()}-svg"
        privateFunctions.addData.call columnSvg, column: column
        
        columnGroup = privateFunctions.createSvgElement "g"
          class: "column-g"
          id: "#{tableObj.getName()}-#{column.getName()}-g"
          
        columnName = privateFunctions.createSvgElement "text"
        columnName.attr
          class: "column-name"
          id: "#{tableObj.getName()}-#{column.getName()}-name"
        columnName.text column.getName()
        
        columnGroup.append columnName
        columnSvg.append columnGroup
        columnsGroup.append columnSvg
        
        #columnsSvg = null
        #$table.find("svg").each () ->
        #  if privateFunctions.svgHasClass.call this, "columns"
        #    columnsSvg = this
        #    false
        #console.log columnsSvg
        #if not columnsSvg
        #  columnsSvg = privateFunctions.createSvgElement "svg"
        #  columnsSvg.attr
        #    class: "columns"
        #    height: settings.defaultDimensions.column.height
        #    width:  settings.defaultDimensions.column.width
        #    x:      $table.find("text:first").get(0).getBBox().height
        #    y:      0
        #  privateFunctions.addData.call columnsSvg, root: privateFunctions.getData.call $table, "root"
        #  $table.children("g").append columnsSvg
        #  columnsGroup = privateFunctions.createSvgElement "g"
        #  columnsSvg.append columnsGroup
        #else
        #  columnGroup = columnsSvg.children "g"
    
      addTable: (table) ->
        $this = privateFunctions.checkContext.call this, "svg", "canvas"
        if table not instanceof Table or not table.getName() then $.error "A table must be used with addTable()"
        
        database = privateFunctions.getData.call $this, "database"
        database.addTable table
        
        settings = privateFunctions.getData.call $this, "settings"
        
        tableSvg = privateFunctions.createSvgElement "svg"
        tableSvg.attr
          class: "table-svg"
          id:    "#{table.getName()}-svg"
          x:     0
          y:     0
        privateFunctions.addData.call tableSvg, table:table, root: $this
        
        tableGroup = privateFunctions.createSvgElement "g"
        tableGroup.attr
          class: "table-g"
          id:    "#{table.getName()}-g"
        
        tableRect = privateFunctions.createSvgElement "rect"
        tableRect.attr
          class: "table-rect"
          id:    "#{table.getName()}-rect"
          x:     0
          y:     0
          
        tableName = privateFunctions.createSvgElement "text"
        tableName.attr
          class: "table-name"
          id:    "#{table.getName()}-name"
        tableName.text table.getName()
          
        columnsSvg = privateFunctions.createSvgElement "svg"
        columnsSvg.attr
          class: "columns-svg"
          id:    "#{table.getName()}-columns-svg"
          
        columnsGroup = privateFunctions.createSvgElement "g"
        columnsGroup.attr
          class: "columns-g"
          id:    "#{table.getName()}-columns-g"
        
        columnsSvg.append columnsGroup
        tableGroup.append tableRect, tableName, columnsSvg
        tableSvg.append tableGroup
        $this.append tableSvg
        
        privateFunctions.redraw.call tableSvg
        
        #tableSvg = privateFunctions.createSvgElement "svg"
        #tableSvg.attr
        #  class:  "table" # $.addClass doesn't work for SVG
        #  id:     table.getName()
        #  x:      0
        #  y:      0
        #privateFunctions.addData.call tableSvg, table: table, root: $this
        #$this.append tableSvg
        
        #tableGroup = privateFunctions.createSvgElement "g"
        #tableSvg.append tableGroup

        #tableRect = privateFunctions.createSvgElement "rect"
        #tableRect.attr
        #  x:      0
        #  y:      0
        #tableGroup.append tableRect
        
        #tableName = privateFunctions.createSvgElement "text"
        #tableGroup.append tableName
        #tableName.text table.getName()
        #tableName.attr
        #  class: "tablename"
        #tableName.attr
        #  class: "tablename"
        #  x: settings.defaultDimensions.table.width / 2 - tableName.get(0).getBBox().width / 2
        #  y: tableName.get(0).getBBox().height
        
          
      destroy: () ->
        $this = $ this
        $this.removeData publicFunctions.plugin.info "name"
        $this.empty()
        
      init: (options) ->
        $this = if this instanceof jQuery then this else $ this
        if $this.prop("classList") instanceof DOMTokenList
          if not $this.prop("classList").contains "canvas" then $this.prop("classList").add "canvas"
        else # IE
          if this.className.baseVal.lastIndexOf "canvas" is -1 then this.className.baseVal = this.className.baseVal + " canvas"
        pluginName = publicFunctions.plugin.info "name"
        settings =
          defaultDimensions:
            column:
              height: 50
              width:  200
            table:
              height: 300
              padding: 5
              width:  200
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
      