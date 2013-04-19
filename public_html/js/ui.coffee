###
 *      Author: Steven Meyer <svm9@aber.ac.uk>
 *        File: iu.coffee
 * Description: Methods for building the UI.
 *
 * DO NOT EDIT THE JAVASCRIPT .js FILE DIRECTLY.
 * THE JAVASCRIPT IS GENERATED FROM COFFEESCRIPT.
###

$ = jQuery

class IODialogue extends Bootstrap.Javascript.Modal # abstract?
  constructor: (dialogueId, heading, label, elementId, actionButtonId, actionButtonText) ->
    heading = "#{heading}"
    $body = $ "<form>"
    $body.append $("<fieldset>").append () ->
      $label = $ "<label>", for: elementID
      $label.text "#{label}"
      $controlGroup = new Bootstrap.Base.Form.ControlGroup()
      $controlGroup.setLabel($label).setControls()
    $actionButton = new Bootstrap.Base.Button("#{actionButtonText}").primary().on("click", () -> $body.trigger("submit")).attr "id", "#{actionButtonId}"
    $footer = Bootstrap.Javascript.Modal.makeDismissButton("Cancel").add $actionButton
    $.extend this, super heading, $body, $footer
    this.show = () -> LoadDialogueSingleton.prototype.show.call this
    this.attr "id", "#{dialogueID}"
    #LoadDialogue.decorate() doesn't work with super()
    
    setType = (type) ->

window.PropelUI or= 
  TopMenu: class TopMenu extends jQuery
    constructor: () ->
      items =
        add:
          icon: "plus"
          id: "add-menu"
          text: " Add "
          dropdown: [
            $("<a>").text("Table").on "click", () ->
          ]
        save:
          icon: "download"
          id: "save-menu"
          text: " Save "
          dropdown: [
            $("<a>").text("File").on "click", () ->
            $("<a>").text("XML").on "click", () ->
          ]
        load:
          icon: "upload"
          id: "load-menu"
          text: " Load "
          dropdown: [
            $("<a>").text("File").on "click", () ->
              LoadDialogue.getDialogue().file().show()
            $("<a>").text("XML").on "click", () ->
              LoadDialogue.getDialogue().xml().show()
          ]
      $.extend this, $ "<form>"
      menus = []
      makeMenuButton = (item) ->
        $dropdown = new Bootstrap.Components.Dropdown(item.dropdown).attr "id", item.id
        $link = $("<a>").append "<i class='icon-#{item.icon} icon-white'></i>", item.text, "<span class='caret'>"
        $button = new Bootstrap.Base.Button $link, true 
        Bootstrap.Components.ButtonGroup.decorate new Bootstrap.Javascript.Dropdown $dropdown, $button.deEmphasize()
      menus.push makeMenuButton items[item] for item of items
      this.append menus
      
  Dialogues:
    LoadDialogue: class LoadDialogue
      dialogueID = "loadModal"
      inputID = "xml-input"
      loadButtonID = "load-xml"
      class LoadDialogueSingleton extends Bootstrap.Javascript.Modal
        constructor: () ->
          heading = "Load an XML schema"
          $body = $ "<form>"
          $body.append $("<fieldset>").append () ->
            $label = $ "<label>", for: inputID
            $label.text "XML schema to load"
            $controlGroup = new Bootstrap.Base.Form.ControlGroup()
            $controlGroup.setLabel($label).setControls()
          $loadButton = new Bootstrap.Base.Button("Load").primary().on("click", () -> $body.trigger("submit")).attr "id", loadButtonID
          $footer = Bootstrap.Javascript.Modal.makeDismissButton("Cancel").add $loadButton
          $.extend this, super heading, $body, $footer
          this.show = () -> LoadDialogueSingleton.prototype.show.call this
          this.attr "id", dialogueID
          #LoadDialogue.decorate() doesn't work with super()

        checkFile = (file) ->
          mimeRegex = /^text.*$/
          filesizeWarn = 102400 #100kiB
          $loadButton = this.children("div.modal-footer").children "##{loadButtonID}"
          $controlGroup = Bootstrap.Base.Form.ControlGroup.decorate this.children("div.modal-body").find("div.control-group")
          if not file
            $loadButton.disable()
          else if not file.type.match mimeRegex
            $controlGroup.error "This file must be a text file"
            $loadButton.disable()
          else if file.size > filesizeWarn
            $controlGroup.warning "This file is very large. Are you sure that it is the correct file?"
            $loadButton.disable false
          else
            $controlGroup.validationState()
            $loadButton.disable false
          this

        @decorate: ($item, $with = new LoadDialogueSingleton()) ->
          if $item not instanceof jQuery then $item = $ $item
          $.extend $with, $item
          $with.show = () -> LoadDialogueSingleton.prototype.show.call this
          $with.attr "id", dialogueID

        file: () ->
          this.reset()
          setType.call this, "file"
          
        loadXML = (xml) ->
          build = (xml) ->
            try
              database = Builder.buildFromXML xml
              $canvas = $ "svg.propelCanvas"
              $canvas.propelCanvas "destroy"
              $canvas.propelCanvas "init", [{}, database]
              this.modal "hide"
            catch ex
              message = if ex.message?.match /^Invalid XML/i then "Invalid XML" else if ex.message? then ex.message else ex
              $alert = this.children("div.modal-body").find(".alert").first()
              if $alert.length is 0
                $alert = new Bootstrap.Components.Alert()
              else
                $alert = Bootstrap.Components.Alert.decorate($alert)
              this.children("div.modal-body").prepend $alert
              $alert.error "<strong>Error.</strong> #{message}"
          if window.File and window.FileReader and xml instanceof File
            reader = new FileReader()
            reader.onloadend = () =>
              build.call this, reader.result
            reader.readAsText xml
          else
            build.call this, xml

        setType = (type) ->
          $input = this.children("div.modal-body").find "##{inputID}"
          $loadButton = this.children("div.modal-footer").children("button##{loadButtonID}")
          $form = this.children("div.modal-body").children "form"
          switch type
            when "file"
              if $input.length is 0 or $input.get?(0).nodeName?.toLowerCase() is "textarea"
                $newInput = $ "<input>", type: "file"
                $newInput.on "change", () => checkFile.call this, $newInput.prop("files")[0]
                $loadButton.disable()
                $form.off("submit").on "submit", () => loadXML.call this, $newInput.prop("files")[0]
            when "xml"
              if $input.length is 0 or $input.get?(0).nodeName?.toLowerCase() is "input"
                $newInput = $ "<textarea>", rows: 6, placeholder: "Type or paste the XML schema here."
                $loadButton.disable false
                $form.off("submit").on "submit", () => loadXML.call this, $newInput.val()

          if $newInput?
            if $input.length isnt 0
              $input.replaceWith $newInput
            else
              this.children("div.modal-body").find("div.controls").prepend $newInput
            $input = $newInput.attr "id", inputID
            $input.addClass "input-block-level"

          this
        
        reset: () ->
          $modalBody = this.children "div.modal-body"
          $modalBody.find(".alert").remove()
          $input = $modalBody.find "##{inputID}"
          $loadButton = this.children("div.modal-footer").children("button##{loadButtonID}")
          $controlGroup = Bootstrap.Base.Form.ControlGroup.decorate $modalBody.find(".control-group")
          if $input.length isnt 0
            $input.wrap("<form>").parent("form").get(0).reset()
            $input.unwrap()
          $controlGroup.validationState()

        show: () ->
          $modal = $ "##{dialogueID}"
          if $modal.length is 0
            this.appendTo $ "body"
          this.modal "show"

        xml: () ->
          this.reset()
          setType.call this, "xml"

      @getDialogue: () ->
        $modal = $ "##{dialogueID}"
        if $modal.length is 0 then new LoadDialogueSingleton()
        else LoadDialogueSingleton.decorate $modal.first()