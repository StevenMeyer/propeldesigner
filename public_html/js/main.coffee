###
 *      Author: Steven Meyer <svm9@aber.ac.uk>
 *        File: main.coffee
 * Description: Preforms GUI functions outside of the canvas's scope.
 *
 * DO NOT EDIT THE JAVASCRIPT .js FILE DIRECTLY.
 * THE JAVASCRIPT IS GENERATED FROM COFFEESCRIPT.
###

jQuery(document).ready ($) ->
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
      $cancel.on "click", () -> $body.children("div.alert").hide()

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
    
  init()
    