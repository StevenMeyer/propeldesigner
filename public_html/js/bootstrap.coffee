###
 *      Author: Steven Meyer <svm9@aber.ac.uk>
 *        File: bootstrap.coffee
 * Description: Scriptable Twitter Bootstrap widgets and component creation.
 *
 * DO NOT EDIT THE JAVASCRIPT .js FILE DIRECTLY.
 * THE JAVASCRIPT IS GENERATED FROM COFFEESCRIPT.
###

$ = jQuery
$.fn.extend
  disable: (disable = true) ->
    this.each () ->
      $this = $ this
      nodeName = $this.get?(0).nodeName?.toLowerCase()
      if disable
        $this.addClass "disabled"
        $this.attr "disabled", "disabled" if nodeName is "button" or nodeName is "input"
      else
        $this.removeClass "disabled"
        $this.removeAttr "disabled"
        
window.Bootstrap or=
  Base:
    Button: class Button extends jQuery
      constructor: (text = "", deemphasize = false) ->
        if text.get?(0).nodeName?.toLowerCase?() is "a" #TODO replace this and all nodeNames with $.is?
          $button = text
        else
          $button = $ "<button>", type: "button"
          $button.text text
        Button.decorate $button, this
        
      @decorate: ($item, $with = new Button()) ->
        if $item not instanceof Object then $item = $ $item
        $.extend $with, $item
        $with.addClass "btn"
        
      blockLevel: () -> this.addClass "btn btn-block"
        
      danger: () -> this.defaultStyle().addClass "btn-danger"
      
      deEmphasize: (deEmphasize = true) ->
        this.addClass "btn"
        if deEmphasize then this.addClass "btn-link"
        else this.removeClass "btn-link"
        
      defaultSize: () -> this.addClass("btn").removeClass "btn-large btn-small btn-mini"
        
      defaultStyle: () -> this.addClass("btn").removeClass "btn-primary btn-info btn-success btn-warning btn-danger btn-inverse btn-link"
        
      info: () -> this.defaultStyle().addClass "btn-info"
        
      inverse: () -> this.defaultStyle().addClass "btn-inverse"
        
      large: () -> this.defaultSize().addClass "btn-large"
        
      link: () -> this.defaultStyle().addClass "btn-link"
        
      mini: () -> this.defaultSize().addClass "btn-mini"
        
      primary: () -> this.defaultStyle().addClass "btn-primary"
        
      small: () -> this.defaultSize().addClass "btn-small"
        
      success: () -> this.defaultStyle().addClass "btn-success"
        
      warning: () -> this.defaultStyle().addClass "btn-warning"
      
    Form:
      ControlGroup: class ControlGroup extends jQuery
        constructor: ($controls, $label) ->
          ControlGroup.decorate $("<div>"), this
          this.setControls $controls
          this.setLabel $label if $label?
          
        a = (state, message) -> # a better name, perhaps?
          this.validationState state
          setValidationMessage.call this, message
          this
          
        @decorate: ($item, $with = new ControlGroup()) ->
          if $item not instanceof Object then $item = $ $item
          $.extend $with, $item
          $with.error = (message) -> ControlGroup.prototype.error.call this, message
          $with.addClass "control-group"
          
        error: (message) -> a.call this, "error", message
          
        info: (message) -> a.call this, "info", message
          
        success: (message) -> a.call this, "success", message
          
        warning: (message) -> a.call this, "warning", message
          
        setControls: ($controls = []) ->
          $oldControls = this.children(".controls")
          if $oldControls.length is 0
            this.append $("<div>").addClass("controls").append $controls
          else
            $oldControls.empty().append $controls
          this
            
        setHelptext: (message, display = "inline") ->
          $controls = this.children ".controls"
          if $controls.length is 0
            $controls = this.setControls().children "div.controls"
          $message = $controls.children("span.help-inline,span.help-block")
          if $message.length is 0
            display = if display is "block" then "block" else "inline"
            $controls.append $("<span>").addClass("help-#{display}").append message
          else
            $message.first().empty().append message
          this
          
        setLabel: ($label = "") ->
          if typeof $label is "string"
            $label = $("<label>").html $label
          if $label not instanceof jQuery then $label = $ $label
          if $label.get?(0).nodeName?.toLowerCase?() isnt "label"
            $label = $("<label>").append($label)
          $label.addClass "control-label"
          $oldLabel = this.children ".control-label"
          if $oldLabel.length is 0
            this.prepend $label
          else
            $oldLabel.replaceWith $label
          this
          
        setValidationMessage = (message = "") ->
          $helptext = this.children(".controls").children("span.help-inline,span.help-block").first()
          if $helptext.length is 0
            $helptext = this.setHelptext($("<span class='validation-message'>").append(message)).children(".controls").children("span.help-inline").first()
          else
            $validationMessage = $helptext.find(".validation-message").first()
            if $validationMessage.length is 0
              $validationMessage = $("<span class='validation-message'>").appendTo $helptext
            $validationMessage.empty().append message
            this
            
        validationState: (state) ->
          states = ["error", "info", "success", "warning"]
          this.removeClass states.join " "
          if state in states
            this.addClass state
          else
            setValidationMessage.call this
            this
          
  Components:
    Alert: class Alert extends jQuery
      constructor: (text) ->
        Alert.decorate $("<div>"), this
        $button = $ "<button>", type: "button", "data-dismiss": "alert"
        $button.addClass "close"
        $button.text "x"
        this.append $button
        
      alertBlock: (alertBlock = true) ->
        this.addClass "alert"
        if alertBlock
          $this.addClass "alert-block"
        else
          $this.removeClass "alert-block"
          
      setContext: (context = "warning", message) ->
        contexts = ["error", "info", "success", "warning"]
        this.removeClass "alert-#{contexts.join " alert-"}"
        if context not in contexts then context = "warning"
        this.addClass "alert alert-#{context}"
        this.html message if message?
        this
          
      danger: (message) -> this.setContext "error", message
        
      @decorate: ($item, $with = new Alert()) ->
        if $item not instanceof Object then $item = $ $item
        $.extend $with, $item
        $with.error = (message) -> Alert.prototype.error.call this, message
        $with.html = (html) -> Alert.prototype.html.call this, html
        $with.prepend = () -> Alert.prototype.prepend.apply this, arguments
        $with.remove = () -> Alert.prototype.remove.call this
        $with.text = (text) -> Alert.prototype.text.call this, text
        $with.addClass "fade in"
        Alert.prototype.setContext.call $with, "warning"
      
      error: (message) -> this.danger message
      
      html: (html) ->
        $button = this.children(".close").first()
        $button.detach()
        if typeof html is "function" then html = html.call this, 0, this.get(0)
        this.empty().append $button, $ $.parseHTML html
      
      info: (message) -> this.setContext "info", message
      
      prepend: () ->
        item = []
        if arguments.length > 1
          item.push arguments[arg] for arg of arguments
        else if typeof arguments[0] is "function" then item = aguments[0].call this, 0, this.get(0)
        else item = arguments[0]
        $button = this.children(".close").first()
        $siblings = this.detach(".close:first").contents()
        this.empty().append $button, item, $siblings
        
      remove: () ->
        if typeof this.alert is "function"
          this.alert("close") # for bootstrap-alert.js
        else
          this.remove()
      
      success: (message) -> this.setContext "success", message
      
      text: (text) ->
        $button = this.children(".close").first()
        $button.detach()
        if typeof text is "function" then text = text.call this, 0, this.text()
        this.empty().append $button, document.createTextNode text
      
      warning: (message) -> this.setContext "warning", message
      
    ButtonGroup: class ButtonGroup extends jQuery
      constructor: (buttons) ->
        ButtonGroup.decorate $("<div>"), this
        this.append buttons if buttons?
        
      append: (buttons = []) -> #TODO make this match $.append() (function call, multiple args, etc.)
        if typeof buttons is "function" then buttons = buttons.call this, 0, this.get(0)
        if typeof buttons isnt "object" then buttons = [buttons]
        for item of buttons
          $button = buttons[item]
          if typeof $button isnt jQuery then $button = $ $button
          nodeName = $button.get?(0).nodeName?.toLowerCase()
          if nodeName is "button" or (nodeName is "input" and $button.attr?("type") is "button") or $button.hasClass?("btn")
            $.fn.append.call this, $button
            
      @decorate: ($item, $with = new ButtonGroup()) ->
        if $item not instanceof Object then $item = $ $item
        $.extend $with, $item
        $with.append = (buttons) -> ButtonGroup.prototype.append.call this, buttons
        $with.addClass "btn-group"
            
      horizontal: () ->
        this.addClass("btn-group").removeClass "btn-group-vertical"
            
      vertical: () ->
        this.addClass "btn-group btn-group-vertical"
    
    Dropdown: class Dropdown extends jQuery
      constructor: (items) ->
        Dropdown.decorate $("<ul>", role: "menu"), this
        this.append items
        
      append: (items = []) -> #TODO make this match $.append() (function call, multiple args, etc.)
        if typeof items is "function" then items = items.call this, 0, this.get(0)
        $append = $.fn.append
        appendThis = (item) =>
          $item = null
          if typeof item is "string"
            item = $("<a>", tabindex: -1, href: "#").html item
          $item = if item instanceof jQuery then item else $ item
          nodeName = $item.get?(0).nodeName.toLowerCase()
          if nodeName isnt "li" # wrap the item in a <li>
            if nodeName is "a"
              $item.attr "tabindex", -1 if $item.attr("tabindex") isnt -1
              $item.attr "href", "#" if not $item.attr("href")?
            else # wrap the item in an <a>
              $item = $("<a>", tabindex: -1, href: "#").append $item
            $item = $("<li>").append $item
          $append.call this, $item
        if typeof items is "string" then appendThis items
        else if items instanceof jQuery then items.each () -> appendThis this
        else appendThis items[item] for item of items
        this
        
      @decorate: ($item, $with = new DropDown()) ->
        if $item not instanceof Object then $item = $ $item
        $.extend $with, $item
        $with.append = (items) -> Dropdown.prototype.append.call this, items
        $with.addClass "dropdown-menu"
              
      pullLeft: () ->
        this.pullRight false
              
      pullRight: (pullRight = true) ->
        if pullRight
          this.addClass "pull-right"
        else
          this.removeClass "pull-right"
        
  Javascript:
    Dropdown: class Dropdown extends jQuery
      constructor: ($dropdown, $trigger) ->
        Dropdown.decorate $("<div>"), this
        this.setDropdown $dropdown
        this.setTrigger $trigger
        
      @decorate: ($item, $with = new DropDown()) ->
        if $item not instanceof Object then $item = $ $item
        $.extend $with, $item
        $with.addClass "dropdown"
        
      setARIAlabel = () ->
        $trigger = this.children(".dropdown-toggle")
        $dropdown = this.children(".dropdown-menu")
        labelledby = ""
        $trigger.each () ->
          if $trigger.attr("id")?
            labelledby = $trigger.attr "id"
            false
        if labelledby
          $dropdown.attr "aria-labelledby", labelledby
        else
          $dropdown.removeAttr "aria-labelledby"
        this
        
      setDropdown: ($dropdown = "") ->
        if $dropdown not instanceof jQuery
          $dropdown = $ $dropdown
        if $dropdown.length isnt 0
          $dropdown.addClass "dropdown-menu"
          $oldDropdown = this.children(".dropdown-menu")
          if $oldDropdown.length isnt 0 then $oldDropdown.replaceWith $dropdown
          else this.append $dropdown
        setARIAlabel.call this
        
      setTrigger: ($trigger = "", replaceExisting = true) ->
        if $trigger not instanceof jQuery
          $trigger = $ $trigger
        if $trigger.length isnt 0
          $trigger.addClass "dropdown-toggle"
          $trigger.attr "data-toggle", "dropdown"
          if replaceExisting
            this.children(".dropdown-toggle").remove()
          this.prepend $trigger
        setARIAlabel.call this
    
    Modal: class Modal extends jQuery
      constructor: (heading, body, footer) ->
        Modal.decorate $("<div>"), this
        this.setHeader heading
        this.setBody body
        this.setFooter footer
        
      @decorate: ($item, $with = new Modal()) ->
        if $item not instanceof Object then $item = $ $item
        $.extend $with, $item
        $with.addClass "modal hide fade"
        $with.attr
          tabindex: -1
          role: "dialog"
          "aria-hidden": true
        
      @makeDismissButton: (text = "Close") ->
        $button = new Bootstrap.Base.Button text
        $button.attr
          "data-dismiss": "modal"
          "aria-hidden": true
        
      setSection = (section, content) ->
        $section = this.children ".modal-#{section}"
        if $section.length is 0
          $section = $ "<div>"
          $section.addClass "modal-#{section}"
          this.append $section.append content
        else
          $section.empty().append content
        $section
        
      setBody: (body) ->
        setSection.call this, "body", body
        
      setFooter: (footer) ->
        setSection.call this, "footer", footer
        
      setHeader: (header) ->
        $header = setSection.call this, "header", null
        $close = $header.children "button.close[data-dismiss='modal']"
        $heading = $header.children(":not(button.close[data-dismiss='modal'])").first()
        if $close.length is 0
          $close = $ "<button>", type: "button", "data-dismiss": "modal", "aria-hidden": true
          $close.addClass "close"
          $close.text "x"
          $header.append $close
        if $heading.length is 0
          $heading = $ "<h3>"
          $header.append $heading
        if typeof header is "string"
          $heading.html header
        else
          $heading.empty().append header
        this