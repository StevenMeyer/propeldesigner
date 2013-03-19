###
 *      Author: Steven Meyer <svm9@aber.ac.uk>
 *        File: main.coffee
 * Description: Preforms GUI functions outside of the canvas's scope.
 *
 * DO NOT EDIT THE JAVASCRIPT .js FILE DIRECTLY.
 * THE JAVASCRIPT IS GENERATED FROM COFFEESCRIPT.
###

jQuery(document).ready ($) ->
  addFileLoadDialogue = () ->
    $container = $ "<div>", id: "loadFileModal", tabindex: -1, role: "dialog", "aria-labelledby": "modalLabel", "aria-hidden": true
    $container.addClass "modal hide fade"
    
    $header = $ "<div>"
    $header.addClass "modal-header"
    $header.append () ->
      $close = $ "<button>", type: "button", "data-dismiss": "modal", "aria-hidden": true
      $close.addClass "close"
      $close.text "x"
      
      $h = $ "<h3>", id: "modalLabel"
      $h.text "Load an XML Schema File"
      
      [$close, $h]
    
    $body = $ "<div>"
    $body.addClass "modal-body"
    $form = $ "<form>"
    $form.append () ->
      $fieldset = $ "<fieldset>"
      $fieldset.append () ->
        $div = $ "<div>"
        $div.addClass "control-group"
        $div.append () ->
          $label =  $ "<label>", for: "file-load-input"
          $label.addClass "control-label"
          $label.text "Choose a schema to load."
          $controls = $ "<div>"
          $controls.addClass "controls"
          $controls.append () ->
            $file = $ "<input>", id: "file-load-input", type: "file"
            $file.addClass "input-block-level"
            $file.on "change", (event) -> checkFile event.currentTarget.files[0]
            $message = $ "<span>"
            $message.addClass "help-inline"
            $message.hide()
            [$file, $message]
          [$label, $controls]
        $div
      $fieldset
    $form.on "submit", (event) -> loadFile event.currentTarget[1].files[0]
    $body.append $form
    
    $footer = $ "<div>"
    $footer.addClass "modal-footer"
    $footer.append () ->
      $cancel = $ "<button>", "data-dismiss": "modal", "aria-hidden": true
      $cancel.addClass "btn"
      $cancel.text "Cancel"
      
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
        $file.on "click", () -> openFileLoadDialogue()
        $xml = $ "<li>"
        $xml.append $("<a>", tabindex: -1, href: "#", id: "load-xml").text "XML"
        append = [$xml]
        if window.File and window.FileReader
          append = [$file].concat append
        append
      [$a, $ul]
    
    $form.append $add, " ", $save, " ", $load
    $nav.append $form
    
  checkFile = (file) ->
    mime = /^text.*$/
    fileSizeWarn = 1048576 #1MiB
    $button = $ "#loadFileModal > div.modal-footer > button:last"
    $controlGroup = $ "#loadFileModal form div.control-group"
    $message = $controlGroup.find "span.help-inline"
    if not file
      $button.attr "disabled", "disabled"
    else if not file.type.match /^text.*/
      $controlGroup.removeClass "warning"
      $controlGroup.addClass "error"
      $message.text "The file is not a text file."
      $message.show()
      $button.attr "disabled", "disabled"
    else if file.size > fileSizeWarn
      console.log fileSizeWarn
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
    
  loadFile = (file) ->
    reader = new FileReader()
    reader.onloadend = () ->
      loadXML reader.result
    reader.readAsText file
    
  loadXML = (xml) ->
    try
      database = Builder.buildFromXML xml
    catch ex
      $.error ex
    $canvas = $ "svg#canvas"
    $canvas.propelCanvas "addTable", table for table in database.getTables()
    
  openFileLoadDialogue = () ->
    $modal = $ "#loadFileModal"
    if $modal.length is 0 then $modal = addFileLoadDialogue()
    $modal.modal "show"
    
  init()
    