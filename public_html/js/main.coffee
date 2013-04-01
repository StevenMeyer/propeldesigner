###
 *      Author: Steven Meyer <svm9@aber.ac.uk>
 *        File: main.coffee
 * Description: Preforms GUI functions outside of the canvas's scope.
 *
 * DO NOT EDIT THE JAVASCRIPT .js FILE DIRECTLY.
 * THE JAVASCRIPT IS GENERATED FROM COFFEESCRIPT.
###

$ = jQuery
window.PropelDesigner or=
  UI:
    Bootstrap:
      Dropdown: class Dropdown
        @makeDropdown: (items) ->
          $list = $ "<ul>", role: "menu", "aria-labelledby": "dropdownMenu"
          $list.addClass "dropdown-menu"
          makeListItem = (item) ->
            $listItem = $ "<li>"
            $listItem.append () ->
              $a = $ "<a>", tabindex: -1, href: "#"
              if typeof item is "string"
                $a.html item
              else
                theItem = item["item"] ? item
                $item = if theItem instanceof jQuery then theItem else $ theItem
                $a.append $item
              $a
            if item.hasOwnProperty "events"
              for event, action of item.events
                $listItem.on event, action
            $listItem
          $list.append makeListItem item for item in items if items?
          $list

    Build:
      Buttons: class Buttons
        @addButtons: ($parent) ->
          if $parent not instanceof jQuery then $parent = $ $parent

    Button: class Button
      @makeDropdownButton: (buttonText, $dropdown, options) ->
        $container = $ "<div>"
        $container.addClass "btn-group"
        $container.addClass "dropup" if options.dropUp
        $container.append () ->
          $text = $ "<a>", "data-toggle": "dropdown", href: "#"
          $text.addClass "btn dropdown-toggle"
          $text.addClass "btn-#{options.buttonSize}" if options.buttonSize
          $text.html buttonText
          $text.append $ "<span class='caret'>"

          if $dropdown.hasClass "dropdown-menu"
            [$text, $dropdown]
          else
            $text

    Form: class Form
      @addHelpText: ($element, helpTtext, displayType) ->
        displayType = if displayType is "block" then "block" else "inline"
        $help = $ "<span>"
        $help.addClass "help-#{displayType}"
        $help.html helpText
        if $element not instanceof jQuery
          $help
        else
          $element.append $help
          $element

      @makeControlGroup: ($controls, $label) ->
        $group = $ "<div>"
        $group.addClass "control-group"
        $group.append () ->
          $controlsDiv = $ "<div>"
          $controlsDiv.addClass "controls"
          $controlsDiv.append $controls
          if $label then [$label, $controlsDiv] else $controlsDiv

###jQuery(document).ready ($) ->
  addLoadDialogue = () ->
    $container = $ "<div>", id: "loadModal", tabindex: -1, role: "dialog", "aria-labelledby": "loadLabel", "aria-hidden": true
    $container.addClass "modal hide fade"

    $header = $ "<div>"
    $header.addClass "modal-header"
    $header.append () ->
      $close = $ "<button>", type: "button", "data-dismiss": "modal", "aria-hidden": true
      $close.addClass "close"
      $close.text "x"

      $h = $ "<h3>", id: "loadLabel"
      $h.text "Load an XML Schema"

      [$close, $h]

    $body = $ "<div>"
    $body.addClass "modal-body"
    $form = $ "<form>"
    $form.append () ->
      $fieldset = $ "<fieldset>"
      $fieldset.append () ->
        $controlGroup = $ "<div>"
        $controlGroup.addClass "control-group"
        $controlGroup.append () ->
          $label = $ "<label>", for: "xml-input"
          $label.addClass "control-label"
          $label.text "XML schema to load:"
          $controls = $ "<div>"
          $controls.addClass "controls"
          [$label, $controls]
        $controlGroup
      $fieldset
    $body.append $form

    $footer = $ "<div>"
    $footer.addClass "modal-footer"
    $footer.append () ->
      $cancel = $ "<button>", "data-dismiss": "modal", "aria-hidden": true
      $cancel.addClass "btn"
      $cancel.text "Cancel"
      $cancel.on "click", () ->
        $body.children("div.alert").hide()
        $body.find("div.error").removeClass "error"

      $load = $ "<button>", disabled: "disabled"
      $load.addClass "btn btn-primary"
      $load.text "Load"
      $load.on "click", () -> $form.trigger "submit"

      [$cancel, $load]

    $container.append $header, $body, $footer
    $("body").append $container
    $container
  
  addPageButtons = () ->
    $nav = $ "div.nav-collapse"
    $caret = $ "<span>"
    $caret.addClass "caret"
    
    $form = $ "<form>"
    $form.addClass "navbar-form pull-right"
    
    $add = $ "<div>"
    $add.addClass "btn-group"
    $add.append () ->
      $a = $ "<a>", "data-toggle": "dropdown", href: "#"
      $a.addClass "btn dropdown-toggle"
      $a.append () ->
        $icon = $ "<i>"
        $icon.addClass "icon-plus"
        $text = " Add "
        [$icon, $text, $caret.clone()]
      $ul = $ "<ul>", id: "add"
      $ul.addClass "dropdown-menu"
      $ul.append () ->
        $table = $ "<li>"
        $table.append $("<a>", tabindex: -1, href: "#", id: "add-table").text "Table"
        $table.on "click", () -> openTableDialogue()
        [$table]
      [$a,$ul]
      
    $save = $ "<a>", href: "#"
    $save.addClass "btn disabled"
    $save.append () ->
      $icon = $ "<i>"
      $icon.addClass "icon-download"
      $text = " Save "
      [$icon, $text]
    
    $load = $ "<div>"
    $load.addClass "btn-group"
    $load.append () ->
      $a = $ "<a>", "data-toggle": "dropdown", href: "#"
      $a.addClass "btn dropdown-toggle"
      $a.append () ->
        $icon = $ "<i>"
        $icon.addClass "icon-upload"
        $text = " Load "
        [$icon, $text, $caret.clone()]
      $ul = $ "<ul>", id: "load"
      $ul.addClass "dropdown-menu"
      $ul.append () ->
        $file = $ "<li>"
        $file.append $("<a>", tabindex: -1, href: "#", id: "load-file").text "File"
        $file.on "click", () -> openLoadDialogue "file"
        $xml = $ "<li>"
        $xml.append $("<a>", tabindex: -1, href: "#", id: "load-xml").text "XML"
        $xml.on "click", () -> openLoadDialogue "xml"
        append = [$xml]
        if window.File and window.FileReader
          append = [$file].concat append
        append
      [$a, $ul]
    
    $form.append $add, " ", $save, " ", $load
    $nav.append $form
    
  addTableDialogue = () ->
    $container = $ "<div>", id: "tableModal", tabindex: -1, role: "dialog", "aria-labelledby": "tableLabel", "aria-hidden": true
    $container.addClass "modal hide fade"

    $header = $ "<div>"
    $header.addClass "modal-header"
    $header.append () ->
      $close = $ "<button>", type: "button", "data-dismiss": "modal", "aria-hidden": true
      $close.addClass "close"
      $close.text "x"

      $h = $ "<h3>", id: "tableLabel"
      $h.html "<span></span> a Table"

      [$close, $h]

    $body = $ "<div>"
    $body.addClass "modal-body"
    $form = $ "<form>"
    $form.append () ->
      $basic = $ "<fieldset>"
      $basic.append () ->
        $legend = $ "<legend>"
        $legend.text "Basic"
        $nameGroup = $ "<div>"
        $nameGroup.addClass "control-group"
        $nameGroup.append () ->
          $label = $ "<label>", for: "table-name"
          $label.addClass "control-label"
          $label.text "Name"
          $controls = $ "<div>"
          $controls.addClass "controls"
          $controls.append () ->
            $input = $ "<input>", id: "table-name", type: "text", "required": "required"
            $help = $ "<span>"
            $help.addClass "help-inline"
            $help.text "Required. This must be unique."
            [$input, $help]
          [$label, $controls]
        $descriptionGroup = $ "<div>"
        $descriptionGroup.addClass "control-group"
        $descriptionGroup.append () ->
          $label = $ "<label>", for: "table-description"
          $label.addClass "control-label"
          $label.text "Description"
          $controls = $ "<div>"
          $controls.addClass "controls"
          $controls.append () ->
            $input = $ "<input>", id: "table-description", type: "text"
            $help = $ "<span>"
            $help.addClass "help-inline"
            $help.text "A helpful comment."
            [$input, $help]
          [$label, $controls]
        $schemaGroup = $ "<div>"
        $schemaGroup.addClass "control-group"
        $schemaGroup.append () ->
          $label = $ "<label>", for: "table-schema"
          $label.addClass "control-label"
          $label.text "Schema"
          $controls = $ "<div>"
          $controls.addClass "controls"
          $controls.append () ->
            $input = $ "<input>", id: "table-schema", type: "text"
            $inherit = $ "<label>", for: "table-schema-inherit"
            $inherit.addClass "checkbox inline"
            $inherit.append () ->
              $checkbox = $ "<input>", id: "table-schema-inherit", type: "checkbox", value: "inherit"
              [$checkbox, "Inherit"]
            $help = $ "<span>"
            $help.addClass "help-inline"
            [$input, "  or  ", $inherit, $help]
          [$label, $controls]
        [$legend, $nameGroup, $descriptionGroup, $schemaGroup]
      $advanced = $ "<div>", id: "advanced-accordion"
      $advanced.addClass "accordion"
      $advanced.append () ->
        $php = $ "<fieldset>"
        $php.addClass "accordion-group"
        $php.append () ->
          $legend = $ "<legend>"
          $legend.addClass "accordion-heading"
          $legend.append () ->
            $span = $ "<a>", "data-toggle": "collapse", "data-parent": "#advanced-accordion", href: "#php"
            $span.addClass "accordion-toggle"
            $span.text "PHP"
            $span
          $accordionBody = $ "<div>", id: "php"
          $accordionBody.addClass "accordion-body collapse"
          $accordionBody.append () ->
            $accordionInner = $ "<div>"
            $accordionInner.addClass "accordion-inner"
            $accordionInner.append () ->
              $phpNameGroup = $ "<div>"
              $phpNameGroup.addClass "control-group"
              $phpNameGroup.append () ->
                $label = $ "<label>", for: "table-phpName"
                $label.addClass "control-label"
                $label.text "PHP Name"
                $controls = $ "<div>"
                $controls.addClass "controls"
                $controls.append () ->
                  $input = $ "<input>", id: "table-phpName", type: "text"
                  $help = $ "<span>"
                  $help.addClass "help-inline"
                  $help.text "Object model class name."
                  [$input, $help]
                [$label, $controls]
              $packageGroup = $ "<div>"
              $packageGroup.addClass "control-group"
              $packageGroup.append () ->
                $label = $ "<label>", for: "table-package"
                $label.addClass "control-label"
                $label.text "Package"
                $controls = $ "<div>"
                $controls.addClass "controls"
                $controls.append () ->
                  $input = $ "<input>", id: "table-package", type: "text"
                  $inherit = $ "<label>", for: "table-package-inherit"
                  $inherit.addClass "checkbox inline"
                  $inherit.append () ->
                    $checkbox = $ "<input>", id: "table-package-inherit", type: "checkbox", value: "inherit"
                    [$checkbox, "Inherit"]
                  $help = $ "<span>"
                  $help.addClass "help-inline"
                  $help.text "The package in which the model classes will be generated"
                  [$input, "  or  ", $inherit, $help]
                [$label, $controls]
              ["phpname,package,namespace,abstract,phpNamimgMethod,baseClass,basePeer", $phpNameGroup, $packageGroup]
            $accordionInner
          [$legend, $accordionBody] #$php.append()
          
        $propel = $ "<fieldset>"
        $propel.addClass "accordion-group"
        $propel.append () ->
          $legend = $ "<legend>"
          $legend.addClass "accordion-heading"
          $legend.append () ->
            $span = $ "<a>", "data-toggle": "collapse", "data-parent": "#advanced-accordion", href: "#propel"
            $span.addClass "accordion-toggle"
            $span.text "Propel"
            $span
          $accordionBody = $ "<div>", id: "propel"
          $accordionBody.addClass "accordion-body collapse"
          $accordionBody.append () ->
            $accordionInner = $ "<div>"
            $accordionInner.addClass "accordion-inner"
            $accordionInner.append () ->
              "skipSql,isCrossRef,heavyIndexing,readOnly,treeMode,reloadOnInsert,reloadOnUpdate,allowPkInsert"
            $accordionInner
          [$legend, $accordionBody] #$propel.append()
        [$php, $propel]
      [$basic, $advanced]
    $body.append $form

    $footer = $ "<div>"
    $footer.addClass "modal-footer"
    $footer.append () ->
      $cancel = $ "<button>", "data-dismiss": "modal", "aria-hidden": true
      $cancel.addClass "btn"
      $cancel.text "Cancel"
      $cancel.on "click", () ->
        $body.children("div.alert").hide()
        $body.find("div.error").removeClass "error"

      $done = $ "<button>"
      $done.addClass "btn btn-primary"
      $done.text "Done"
      $done.on "click", () -> $form.trigger "submit"

      [$cancel, $done]

    $container.append $header, $body, $footer
    $("body").append $container
    $container
    
  checkFile = (file) ->
    mime = /^text.*$/
    fileSizeWarn = 1048576 #1MiB
    $button = $ "#loadModal > div.modal-footer > button:last"
    $controlGroup = $ "#loadModal form div.control-group"
    $message = $controlGroup.find "span.help-inline"
    if not file
      $button.attr "disabled", "disabled"
    else if not file.type.match mime
      $controlGroup.removeClass "warning"
      $controlGroup.addClass "error"
      $message.text "The file is not a text file."
      $message.show()
      $button.attr "disabled", "disabled"
    else if file.size > fileSizeWarn
      $controlGroup.removeClass "error"
      $controlGroup.addClass "warning"
      $message.text "The file is very large. Are you sure that it's the right one?"
      $message.show()
      $button.removeAttr "disabled"
    else
      $controlGroup.removeClass "error warning"
      $message.hide()
      $button.removeAttr "disabled"
      
  init = () ->
    addPageButtons()
    
  loadXML = (xml) ->
    $modal = $ "#loadModal"
    build = (xml) ->
      database = Builder.buildFromXML xml
      $canvas = $ "svg.propelCanvas"
      $canvas.propelCanvas "destroy"
      $canvas.propelCanvas "init", [{}, database]
    try
      if window.File and window.FileReader and xml instanceof File
        reader = new FileReader()
        reader.onloadend = () ->
          build reader.result
        reader.readAsText xml
      else
        build xml
      $modal.modal "hide"
    catch ex
      message = if ex.message.match /^Invalid XML/i then "Invalid XML" else ex.message
      $alert = $modal.find "div.alert"
      if $alert.length is 0
        $modal.children(".modal-body").prepend () ->
          $alert = $ "<div>"
          $alert.addClass "alert alert-error"
          $alert.append () ->
            $button = $ "<button>", "data-dismiss": "alert", type: "button"
            $button.addClass "close"
            $button.html "&times;"
            $span = $ "<span>"
            [$button, $span]
      $alert.children("span").html "<strong>Error.</strong> #{ex.message}"
      $alert.show()
    
  openLoadDialogue = (source) ->
    $modal = $ "#loadModal"
    $button = $modal.find "div.modal-footer > button.btn-primary"
    if $modal.length is 0 then $modal = addLoadDialogue()
    $controls = $modal.find "div.controls"
    if not $controls.hasClass source # input source toggle
      if source is "file"
        $controls.removeClass "xml"
      else
        source = "xml"
        $controls.removeClass "file"
      $controls.empty()
      $controls.addClass source
      $controls.append () ->
        $input = if source is "file" then $("<input>", type: "file") else $("<textarea>", rows: 6)
        $input.attr "id", "xml-input"
        $input.addClass "input-block-level"
        if source is "file"
          $input.on "change", (event) -> checkFile event.currentTarget.files[0]
          $message = $ "<span>"
          $message.addClass "help-inline"
          $message.hide()
          [$input, $message]
        else
          $input
      $form = $controls.closest "form"
      if source is "file"
        $form.off "submit"
        $form.on "submit", (event) -> loadXML event.currentTarget[1].files[0]
        $button.attr "disabled", "disabled"
      else
        $form.off "submit"
        $form.on "submit", (event) -> loadXML event.currentTarget[1].value
        $button.removeAttr "disabled"
        
    $modal.modal "show"
    
  openTableDialogue = () ->
    $modal = $ "#tableModal"
    if $modal.length is 0 then $modal = addTableDialogue()
    $modal.modal "show"
    
  init()###
    