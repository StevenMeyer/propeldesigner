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
        _tagname = if $this and $this.prop "tagName" then $this.prop("tagName").toLowerCase() else null
        if _tagname isnt tagName or (className and not privateFunctions.svgHasClass.call $this, className)
          wild = "*"
          classes = if $this and $this.attr "class" then $this.attr "class" else ""
          $.error "Function expected a #{tagName}.#{if className then className else wild}, got #{_tagname}.#{classes}"
        $this
      
      createSvgElement: (tagName) ->
        svgns = "http://www.w3.org/2000/svg"
        elem = document.createElementNS svgns, tagName
        $ elem
        
      getColumnContentWidth: () ->
        $this = privateFunctions.checkContext.call this, "svg", "column-svg"
        $name = $this.find "g.column-g > text.column-name"
        privateFunctions.getNum $name.get(0).getBBox().width
        
      getData: (property) ->
        $this = if this instanceof jQuery then this else $ this
        if not $this.data()
          $.error "Element has no data"
        else
          data = $this.data publicFunctions.plugin.info "name"
          if data[property] then data[property] else $.error "No data property " + property
          
      getNum: (value) ->
        parseInt +value or 0, 10
          
      redraw: () ->
        $this = privateFunctions.checkContext.call this, "svg"
        settings = privateFunctions.getData.call $("svg.#{publicFunctions.plugin.info "name"}"), "settings"
        if privateFunctions.svgHasClass.call this, "column-svg"
          privateFunctions.redrawColumn.call this, settings, 0
        else if privateFunctions.svgHasClass.call this, "columns-svg"
          privateFunctions.redrawColumns.call this, settings
        else if privateFunctions.svgHasClass.call this, "table-svg"
          privateFunctions.redrawTable.call this, settings
        
      redrawColumn: (settings, currentMaxWidth, bubble = true) ->
        $this = privateFunctions.checkContext.call this, "svg", "column-svg"
        $boundingRect = $this.find "g.column-g rect.column-brect"
        $rect = $this.find "g.column-g rect.column-rect"
        $name = $this.find "g.column-g text.column-name"
        nameBBox = $name.get(0).getBBox()
        currentMaxWidth = privateFunctions.getNum currentMaxWidth
        margin = privateFunctions.getNum settings.defaultDimensions.column.margin
        padding = privateFunctions.getNum settings.defaultDimensions.column.padding
        contentWidth = privateFunctions.getColumnContentWidth.call $this
        
        if not currentMaxWidth
          currentMaxWidth = privateFunctions.getNum settings.defaultDimensions.column.width
          $this.siblings("svg[id$=-column-svg]").each () ->
            width = privateFunctions.getColumnContentWidth.call this
            if currentMaxWidth < width then currentMaxWidth = width
        if currentMaxWidth > contentWidth
          contentWidth = currentMaxWidth
        
        rect =
          height: padding * 2 + privateFunctions.getNum nameBBox.height
          width:  padding * 2 + contentWidth
          x:      margin
          y:      margin
        
        boundingRect =
          height: margin * 2 + rect.height
          width:  margin * 2 + rect.width
          
        name =
          x: boundingRect.width / 2 - nameBBox.width / 2
          y: boundingRect.height / 2 + nameBBox.height / 2
          
        $boundingRect.attr boundingRect
        $rect.attr rect
        $name.attr name
        $this.attr boundingRect
        
        # if this column produces a wider box than its siblings, then its
        # siblings need widening accordingly
        if contentWidth > currentMaxWidth
          $this.siblings("svg[id$=-column-svg]").each () ->
            privateFunctions.redrawColumn.call this, settings, contentWidth, false
            
        if bubble
          parent = $this.closest "svg[id$=-columns-svg]"
          privateFunctions.redraw.call parent
        
        $this
        
      redrawColumns: (settings) ->
        $columnsSvg = privateFunctions.checkContext.call this, "svg", "columns-svg"
        $columns = $columnsSvg.find "g.columns-g > svg.column-svg"
        top = 0
        $columns.each () ->
          $(this).attr "y", top
          top += this.getBBox().height
        $columnsSvg.attr
          height: top
          width: $columns.get(0).getBBox().width
        
        parent = $columnsSvg.closest "svg[id$=-table-svg]"
        privateFunctions.redraw.call parent
        
      redrawTable: (settings) ->
        $this = privateFunctions.checkContext.call this, "svg", "table-svg"
        $rect = $this.find "g.table-g > rect.table-rect"
        $name = $this.find "g.table-g > text.table-name"
        $children = $name.siblings "svg"
        padding = privateFunctions.getNum settings.defaultDimensions.table.padding
        nameBBox = $name.get(0).getBBox()
        maxWidth = 0
        $children.each () ->
          width = this.getBBox().width
          if width > maxWidth then maxWidth = width
        rect = width: padding * 2 + maxWidth
        $name.attr
          x: rect.width / 2 - nameBBox.width / 2
          y: padding + nameBBox.height
        top = padding * 2 + nameBBox.height
        $children.each () ->
          bBox = this.getBBox()
          $(this).attr
            x: rect.width / 2 - bBox.width / 2
            y: top
          top += bBox.height
        rect.height = top + padding
        $rect.attr rect
        $this.attr rect
        
      svgHasClass: (className) ->
        $this = if this instanceof jQuery then this else $ this
        if $this.prop("classList") instanceof DOMTokenList
          $this.prop("classList").contains className
        else #Internet Explorer
          $this.prop("className").baseVal.indexOf(className) isnt -1
    
    publicFunctions =
      addColumn: (column, table = this) ->
        if typeof table is "string" then table = document.getElementById "#{table}-table-svg"
        $table = privateFunctions.checkContext.call table, "svg", "table-svg"
        if column not instanceof Column or not column.getName() then $.error "A column must be used with addColumn()"
        
        settings = privateFunctions.getData.call $("svg.#{publicFunctions.plugin.info "name"}"), "settings"
        tableObj = privateFunctions.getData.call $table, "table"
        tableObj.addColumn column
        
        columnsGroup = $table.find "g.columns-g:first"
        
        columnSvg = privateFunctions.createSvgElement "svg"
        columnSvg.attr
          class: "column-svg"
          id:    "#{tableObj.getName()}-#{column.getName()}-column-svg"
        privateFunctions.addData.call columnSvg, column: column
        
        columnGroup = privateFunctions.createSvgElement "g"
        columnGroup.attr
          class: "column-g"
          id:    "#{tableObj.getName()}-#{column.getName()}-column-g"
          
        columnBoundingRect = privateFunctions.createSvgElement "rect"
        columnBoundingRect.attr
          class: "column-brect brect"
          x:     0
          y:     0
          
        columnRect = privateFunctions.createSvgElement "rect"
        columnRect.attr
          class: "column-rect"
          id:    "#{tableObj.getName()}-#{column.getName()}-column-rect"
          
        columnName = privateFunctions.createSvgElement "text"
        columnName.attr
          class: "column-name"
          id:    "#{tableObj.getName()}-#{column.getName()}-column-name"
        columnName.text column.getName()
        
        columnGroup.append columnBoundingRect, columnRect, columnName
        columnSvg.append columnGroup
        columnsGroup.append columnSvg
        
        privateFunctions.redraw.call columnSvg
    
      addTable: (table) ->
        $this = privateFunctions.checkContext.call this, "svg", publicFunctions.plugin.info "name"
        if table not instanceof Table or not table.getName() then $.error "A table must be used with addTable()"
        
        database = privateFunctions.getData.call $this, "database"
        database.addTable table
        
        settings = privateFunctions.getData.call $this, "settings"
        
        tableSvg = privateFunctions.createSvgElement "svg"
        tableSvg.attr
          class: "table-svg"
          id:    "#{table.getName()}-table-svg"
          x:     0
          y:     0
        privateFunctions.addData.call tableSvg, table: table, root: $this
        
        tableGroup = privateFunctions.createSvgElement "g"
        tableGroup.attr
          class: "table-g"
          id:    "#{table.getName()}-table-g"
        
        tableRect = privateFunctions.createSvgElement "rect"
        tableRect.attr
          class: "table-rect"
          id:    "#{table.getName()}-table-rect"
          x:     0
          y:     0
          
        tableName = privateFunctions.createSvgElement "text"
        tableName.attr
          class: "table-name"
          id:    "#{table.getName()}-table-name"
        tableName.text table.getName()
          
        columnsSvg = privateFunctions.createSvgElement "svg"
        columnsSvg.attr
          class: "columns-svg"
          id:    "#{table.getName()}-columns-svg"
          
        columnsGroup = privateFunctions.createSvgElement "g"
        columnsGroup.attr
          class: "columns-g"
          id:    "#{table.getName()}-columns-g"
          
        columnsBoundingRect = privateFunctions.createSvgElement "rect"
        columnsBoundingRect.attr
          class: "columns-brect brect"
          x:     0
          y:     0
        
        columnsGroup.append columnsBoundingRect
        columnsSvg.append columnsGroup
        tableGroup.append tableRect, tableName, columnsSvg
        tableSvg.append tableGroup
        $this.append tableSvg
        
        #privateFunctions.redraw.call tableSvg
        
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
        pluginName = publicFunctions.plugin.info "name"
        if $this.prop("classList") instanceof DOMTokenList
          if not $this.prop("classList").contains pluginName then $this.prop("classList").add pluginName
        else # IE
          if this.className.baseVal.lastIndexOf pluginName is -1 then this.className.baseVal = this.className.baseVal + " canvas"
        settings =
          defaultDimensions:
            column:
              height: 50
              margin: 0
              padding: 5
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
      